import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import 별0 from './assets/별0.png';
import 별1 from './assets/별1.png';
import html2canvas from 'html2canvas';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const nameRef = useRef(location.state?.name || '손님');
  const [name, setName] = useState(nameRef.current);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [buttonPositions, setButtonPositions] = useState([]);
  const [isIdentityCompleted, setIsIdentityCompleted] = useState(false);
  const [myEmotionWord, setMyEmotionWord] = useState(() => localStorage.getItem('myEmotionWord') || '');
  const [showConstellation, setShowConstellation] = useState(false);
  const [drawLineCount, setDrawLineCount] = useState(0);
  const [lineProgress, setLineProgress] = useState([]); // 각 선의 진행률(0~1)
  const lineProgressRef = useRef([]);
  const constellationRef = useRef(null);
  const [isSavingPNG, setIsSavingPNG] = useState(false);

  useEffect(() => {
    if (location.state?.name) {
      nameRef.current = location.state.name;
      setName(location.state.name);
    }
    if (location.state?.isIdentityCompleted) {
      setIsIdentityCompleted(true);
    }
    if (location.state?.myEmotionWord) {
      setMyEmotionWord(location.state.myEmotionWord);
      localStorage.setItem('myEmotionWord', location.state.myEmotionWord);
    }
  }, [location.state]);

  const buttons = [
    { id: 1, text: "애매한 정체성", description: "나의 정체성이 애매하다고 느끼나요?" },
    { id: 2, text: "애매한 재능", description: "나는 애매한 재능을 가지고 있는 것 같나요?" },
    { id: 3, text: "애매한 진로방향성", description: "어떤 진로를 선택해야하는지 불확실한가요?" },
    { id: 4, text: "애매한 경제 상황", description: "완전히 독립하지도, 마음 편히 기댈 수도 없는 경제 상황인가요?" },
    { id: 5, text: "애매한 이상과 현실간의 괴리", description: "나의 이상과 실제 현실과의 괴리감을 느끼나요?" },
    { id: 6, text: "애매한 인간관계", description: "넓어지는 인간관게를 감당하기 힘든가요?" },
    { id: 7, text: "애매한 사회적 압박", description: "나에 대한 사회적 압박감을 느끼나요?" },
    { id: 8, text: "애매한 나와 타인과의 경쟁", description: "남들과 비교했을 때 나는 부족하고 애매하다고 생각하나요?" },
    { id: 9, text: "애매한 나에 대한 시간적 압박", description: "점점 다가오는 30대에 대한 압박을 느끼나요?" },
    { id: 10, text: "애매한 세대간의 갈등", description: "기성세대와의 갈등을 느끼나요?" },
    { id: 11, text: "애매한 미래 계획", description: "나의 미래가 잘 그려지지 않고 계획을 세워야한다고 느끼나요?" }
  ];

  useEffect(() => {
    const storageKey = 'buttonPositions';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setButtonPositions(JSON.parse(saved));
      return;
    }
    const minDistance = 15; // 최소 거리 (vw, vh 기준)
    const maxAttempts = 100;
    const positions = [];

    for (let i = 0; i < buttons.length; i++) {
      let attempts = 0;
      let pos;
      let isValid = false;
      while (!isValid && attempts < maxAttempts) {
        pos = {
          top: Math.random() * 70 + 15,
          left: Math.random() * 70 + 15,
        };
        isValid = true;
        for (let j = 0; j < positions.length; j++) {
          const dx = pos.left - positions[j].left;
          const dy = pos.top - positions[j].top;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            isValid = false;
            break;
          }
        }
        attempts++;
      }
      positions.push(pos);
    }
    setButtonPositions(positions);
    localStorage.setItem(storageKey, JSON.stringify(positions));
  }, []);

  const getEmotionWord = (id) => localStorage.getItem('myEmotionWord_' + id) || '';

  const completedCount = Array.from({ length: 11 }, (_, i) => getEmotionWord(i + 1)).filter(Boolean).length;
  const showConstellationButton = completedCount >= 2;

  // 별자리 모드에서 사용할 별1 버튼들의 위치와 id
  const completedButtons = Array.from({ length: 11 }, (_, i) => i + 1)
    .map(id => ({
      id,
      pos: buttonPositions[id - 1],
      hasWord: !!getEmotionWord(id)
    }))
    .filter(btn => btn.hasWord && btn.pos);

  const handleButtonClick = (buttonId) => {
    if (!isIdentityCompleted || buttonId !== 1) {
      navigate(`/identity/${buttonId}`, { state: { name } });
    }
  };

  // 별자리 애니메이션 효과 (한 선씩 점점 길어지게)
  useEffect(() => {
    if (showConstellation) {
      setDrawLineCount(0);
      const total = completedButtons.length - 1;
      if (total > 0) {
        setLineProgress(Array(total).fill(0));
        lineProgressRef.current = Array(total).fill(0);
        let current = 0;
        let raf;
        const animateLine = () => {
          lineProgressRef.current[current] = Math.min(1, (lineProgressRef.current[current] || 0) + 0.02);
          setLineProgress([...lineProgressRef.current]);
          if (lineProgressRef.current[current] < 1) {
            raf = requestAnimationFrame(animateLine);
          } else if (current < total - 1) {
            current++;
            raf = requestAnimationFrame(animateLine);
          }
        };
        raf = requestAnimationFrame(animateLine);
        return () => raf && cancelAnimationFrame(raf);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConstellation, completedButtons.length]);

  // 모든 선이 다 그려졌는지 체크
  const isConstellationComplete =
    showConstellation &&
    completedButtons.length > 1 &&
    lineProgress.length === completedButtons.length - 1 &&
    lineProgress.every(v => v === 1);

  // 모든 감정 합성어 합치기 (띄어쓰기 없이, 각 ending 색 다르게)
  const endingColor = "#00BD9D";
  const allEmotionWordsArr = Array.from({ length: 11 }, (_, i) => getEmotionWord(i + 1)).filter(Boolean);
  const allEmotionWordsJSX = allEmotionWordsArr.map((word, idx) => {
    if (!word) return null;
    const base = word.slice(0, -1);
    const ending = word.slice(-1);
    return (
      <span key={idx} style={{ fontWeight: 900 }}>
        {base}
        <span style={{ color: endingColor }}>{ending}</span>
      </span>
    );
  });

  // PNG 저장 함수
  const handleSavePNG = async () => {
    setIsSavingPNG(true);
    await new Promise(r => setTimeout(r, 50)); // 렌더링 대기
    if (!constellationRef.current) return;
    const canvas = await html2canvas(constellationRef.current, {
      backgroundColor: null,
      useCORS: true
    });
    const link = document.createElement('a');
    link.download = `${name}_별자리.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsSavingPNG(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #00326A 0%, #8E3CEC 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "500",
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
      }}>
        {name}님의 밤하늘
      </div>

      {buttons.map((button, index) => (
        <div 
          key={button.id} 
          style={{
            position: "absolute",
            top: `${buttonPositions[index]?.top || 50}%`,
            left: `${buttonPositions[index]?.left || 50}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={() => setHoveredButton(button.id)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {getEmotionWord(button.id) && (
            <div style={{
              color: "#00BD9D",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: "2px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
            }}>{getEmotionWord(button.id)}</div>
          )}
          <button
            onClick={() => handleButtonClick(button.id)}
            style={{
              padding: 0,
              width: "40px",
              height: "40px",
              backgroundColor: "transparent",
              border: "none",
              cursor: button.id === 1 && isIdentityCompleted ? "default" : "pointer",
              transition: "transform 0.3s ease",
              transform: hoveredButton === button.id ? "scale(1.2)" : "scale(1)",
            }}
          >
            <img 
              src={hoveredButton === button.id ? 별1 : (getEmotionWord(button.id) ? 별1 : 별0)}
              alt={button.text} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "all 0.3s ease"
              }}
            />
          </button>
          <div style={{
            color: "white",
            opacity: hoveredButton === button.id ? 1 : 0,
            transition: "opacity 0.3s ease",
            position: "absolute",
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "12px 15px",
            borderRadius: "8px",
            pointerEvents: "none",
            fontSize: "0.9rem",
            width: "250px",
            textAlign: "left",
            lineHeight: "1.4"
          }}>
            <div style={{ 
              fontWeight: "bold", 
              marginBottom: "8px",
              fontSize: "1rem"
            }}>
              {button.text}
            </div>
            <div style={{ 
              fontSize: "0.85rem", 
              opacity: 0.9,
              wordBreak: "keep-all",
              whiteSpace: "normal"
            }}>
              {button.description}
            </div>
          </div>
        </div>
      ))}
      {showConstellationButton && !showConstellation && (
        <div style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          justifyContent: "center"
        }}>
          <button
            style={{
              padding: "18px 40px",
              background: "linear-gradient(90deg, #00BD9D 0%, #8E3CEC 100%)",
              color: "white",
              fontSize: "1.3rem",
              fontWeight: 700,
              border: "none",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.3s"
            }}
            onClick={() => setShowConstellation(true)}
            onMouseEnter={e => {
              e.target.style.background = "linear-gradient(90deg, #8E3CEC 0%, #00BD9D 100%)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "linear-gradient(90deg, #00BD9D 0%, #8E3CEC 100%)";
              e.target.style.transform = "scale(1)";
            }}
          >
            나의 애매함 별자리 만들기
          </button>
        </div>
      )}
      {showConstellation && (
        // 별자리 모드 전체를 ref로 감싼다 (설명문만 PNG 저장 시 숨김)
        <div
          ref={constellationRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 100,
            background: 'linear-gradient(to bottom, #00326A 0%, #8E3CEC 100%)',
            overflow: 'hidden',
          }}
        >
          {/* SVG 별자리 선 (정확한 버튼 중심, 블러, glow) */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              pointerEvents: "none",
              zIndex: 0
            }}
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* 각 별을 정확한 중심 좌표로 연결 (선만, 자연스러운 애니메이션) */}
            {completedButtons.length > 1 && completedButtons.map((btn, idx) => {
              if (idx === 0) return null;
              const prev = completedButtons[idx - 1];
              const x1 = (prev.pos.left / 100) * window.innerWidth;
              const y1 = (prev.pos.top / 100) * window.innerHeight;
              const x2 = (btn.pos.left / 100) * window.innerWidth;
              const y2 = (btn.pos.top / 100) * window.innerHeight;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const length = Math.sqrt(dx * dx + dy * dy);
              const progress = lineProgress[idx - 1] || 0;
              return (
                <line
                  key={btn.id}
                  x1={x1}
                  y1={y1}
                  x2={x1 + dx * progress}
                  y2={y1 + dy * progress}
                  stroke="yellow"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity="0.85"
                  filter="url(#glow)"
                />
              );
            })}
          </svg>
          {/* 모든 별(버튼) 위치 렌더링: 합성어가 있으면 별1, 없으면 별0 */}
          {buttons.map((button, idx) => {
            const isCompleted = !!getEmotionWord(button.id);
            // 별자리 선이 그려진 후에만 이름 표시 (별자리 순서에 따라)
            let showName = false;
            if (isCompleted) {
              const completedIdx = completedButtons.findIndex(b => b.id === button.id);
              if (completedIdx !== -1) {
                // 첫 별은 항상 표시, 그 외는 해당 선(lineProgress[completedIdx-1])이 1일 때 표시
                if (completedIdx === 0 || lineProgress[completedIdx - 1] === 1) {
                  showName = true;
                }
              }
            }
            return (
              <div
                key={button.id}
                style={{
                  position: 'absolute',
                  top: `${buttonPositions[idx]?.top || 50}%`,
                  left: `${buttonPositions[idx]?.left || 50}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                {/* 별 이름 (별자리 선이 닿았을 때만) */}
                {showName && (
                  <div style={{
                    marginBottom: 4,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    textShadow: '0 2px 8px #00326A, 0 0 2px #8E3CEC',
                    background: 'rgba(0,0,0,0.35)',
                    borderRadius: '12px',
                    padding: '2px 12px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}>
                    {button.text}
                  </div>
                )}
                <img
                  src={isCompleted ? 별1 : 별0}
                  alt="별"
                  style={{ width: 40, height: 40, objectFit: 'contain', filter: isCompleted ? 'drop-shadow(0 0 8px #FFD600)' : 'none' }}
                />
                {/* 합성어 */}
                {isCompleted && (
                  <div style={{
                    color: '#00BD9D',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    marginTop: 2,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>{getEmotionWord(button.id)}</div>
                )}
              </div>
            );
          })}
          {/* 합성어 결과 */}
          {isConstellationComplete && !!allEmotionWordsArr.length && (
            <>
              <div style={{
                position: "fixed",
                top: "120px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 300,
                color: "#FFD600",
                fontSize: "2.5rem",
                fontWeight: 900,
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
                borderRadius: "24px",
                padding: 0,
                textAlign: "center",
                maxWidth: "90vw",
                background: "none"
              }}>
                {allEmotionWordsJSX}
              </div>
              {/* 별자리 설명 (PNG 저장 중에는 숨김) */}
              {!isSavingPNG && (
                <div style={{
                  position: "fixed",
                  top: "200px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 301,
                  color: "#fafafa",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  textAlign: "center",
                  maxWidth: "90vw",
                  background: "rgba(51, 51, 51, 0.4)",
                  borderRadius: "18px",
                  padding: "24px 32px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.10)"
                }}>
                  {name}님만의 애매함의 별자리가 완성되었습니다.<br />
                  {name}님의 찬란한 밤하늘에서, 지금 겪고있는 애매한 감정들은 사실 당신의 밤하늘을 더욱 밝게 만들어주기 위함입니다.<br />
                  지금 만들어진 {name}님의 애매함 합성어를 {name}님이 만들 더 많은 별자리들의 시작으로 삼고 앞으로 나아가세요!
                </div>
              )}
            </>
          )}
        </div>
      )}
      {/* PNG 저장 버튼 (별자리 모드에서만, 별자리 전체 ref div 바깥에 고정) */}
      {showConstellation && isConstellationComplete && !!allEmotionWordsArr.length && (
        <div style={{
          position: "fixed",
          top: "40px",
          right: "40px",
          zIndex: 400,
          pointerEvents: 'auto'
        }}>
          <button
            style={{
              padding: "12px 28px",
              background: "#00BD9D",
              color: "white",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              cursor: "pointer"
            }}
            onClick={handleSavePNG}
          >
            PNG로 저장
          </button>
        </div>
      )}
    </div>
  );
}

export default Home; 