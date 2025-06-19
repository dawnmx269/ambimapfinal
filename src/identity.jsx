import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Name from './name';

function Identity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const name = location.state?.name || '손님';
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const buttons = [
    { id: 1, text: "혼란스러움" },
    { id: 2, text: "소외감" },
    { id: 3, text: "불완전함" },
    { id: 4, text: "부담감" },
    { id: 5, text: "강박적임" },
    { id: 6, text: "무지함" },
    { id: 7, text: "막막함" },
    { id: 8, text: "두려움" },
    { id: 9, text: "방황함" },
    { id: 10, text: "과한 의존" },
    { id: 11, text: "위축됨" },
    { id: 12, text: "허탈감" },
    { id: 13, text: "나약함" },
    { id: 14, text: "모순" },
    { id: 15, text: "단절" },
    { id: 16, text: "피로감" },
    { id: 17, text: "거리감" },
    { id: 18, text: "긴장감" },
    { id: 19, text: "수치심" },
    { id: 20, text: "열등감" },
    { id: 21, text: "박탈감" },
    { id: 22, text: "괴리감" },
    { id: 23, text: "초조함" },
    { id: 24, text: "불안감" },
    { id: 25, text: "답답함" },
    { id: 26, text: "무시당함" },
    { id: 27, text: "불확실함" },
    { id: 28, text: "방향상실" },
    { id: 29, text: "공포감" },
    { id: 30, text: "회피하고 싶음" }
  ];

  const identityPages = [
    { id: 1, title: "나의 애매한 정체성에 대해서 어떤 감정을 느끼시나요?", subtitle: "정체성에 대한 안내문입니다.", description: "20대는 특히나 자신의 정체성에 대해서 깊이 탐색하고 고민하는 시기입니다.<br />정체성의 혼란이 올 수도, 정체성을 찾아가는 과정이 힘들게 느껴질 수도 있어요. <br />현재 " + name + "님의 정체성 탐색 과정에서 느끼는 감정들은 무엇인가요?", ending: "결" },
    { id: 2, title: "나의 애매한 재능에 대해서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 자신의 재능을 꽃피우는 시기입니다. <br />하지만 동시에 자신의 한계를 맞닥드리는 시기이도 하죠.<br />세상이 넓어지고 자신의 재능의 한계를 느끼며 좌절하신적이 있나요?<br />현재 " + name + "님의 애매한 재능을 마주했을 때 느끼는 감정들은 무엇인가요?", ending: "능" },
    { id: 3, title: "나의 애매한 진로 방향성에 대해서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 자신의 진로를 정하고 나아가는 시기입니다. <br />하지만 20대가 다 가도록 자신이 어떤 길을 가야하는지 명확하게 정하지 못할 수도 있어요.<br />" + name + "님이 진로를 찾아 방황하면서 느꼈던 감정은 무엇인가요?", ending: "향" },
    { id: 4, title: "나의 애매한 경제 상황에 대해서 어떤 감정을 느끼시나요??", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 보호자의 곁을 떠나 독립을 준비하는 시기입니다. <br />하지만 최근에는 많은 사회문화적 상황 때문에 많은 사람들이 20대임에도 경제적으로 독립하지 못하는 경우가 많아요. <br />" + name + "님은 이렇게 도움받기도, 완전히 독립할 수도 없는 경제 상황에서 어떤 감정을 느끼셨나요?", ending: "원" },
    { id: 5, title: "나의 애매한 이상과 현실간의 괴리에서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "기다리고 꿈꾸던 나의 20대는, 현실과는 다를지도 모릅니다. <br />현실 속의 나는 완벽하지도, 멋지지도 않다고 느낄 수도 있어요.<br />" + name + "님의 이상적인 나와 애매한 현실속의 나의 괴리감 속에서 어떤 감정을 느끼시나요?", ending: "차" },
    { id: 6, title: "나의 애매한 인간관계 속에서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 학교에서 벗어나 나의 인간관계가 확장되는 시기입니다.<br />이 과정에서 힘든 인간관계를 경험 할 수도, 성숙하고 의미있는 관계를 맺을 수도 있어요.<br />현재 " + name + "님이 인간관계를 경험하면서 느끼는 감정들은 무엇인가요?", ending: "인" },
    { id: 7, title: "애매한 사회적 압박 속에서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 어떤 나이대보다 자유롭지만, 동시에 엄청난 사회적 압박을 받는 나이대이기도 합니다.<br />분명 나는 어리고 기획도 많은데, 어딘지 모르게 초조하고 압박감을 느껴 본적이 있으신가요?<br /> " + name + "님은 애매한 사회적 압박 속에서 어떤 감정을 느끼시나요?", ending: "압" },
    { id: 8, title: "애매한 나와 타인과의 경쟁에서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대에는 세상이 넓어지면서 더 대단하고 멋진 사람들을 보게됩니다.<br />이런 사람들과 비교하면 자신은 아주 애매한 사람에 불과하다고 느낄 수도 있어요.<br />" + name + "님이 남들과 자신을 바교하면서 느끼는 감정은 무엇인가요?", ending: "등" },
    { id: 9, title: "애매한 나에 대한 시간적 압박 속에서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 찬란하고 아릅답지만, 그만큼 빨리 바래진다고 사람들은 말합니다.<br />다들 20대는 아릅답고 좋을시기라고 하는데, 나의 20대가 찬란하지만은 않습니다.<br /> " + name + "님은 그럼에도 빠르게 다가오는 20대의 끝이 두려우신 적이 있으신가요?", ending: "시" },
    { id: 10, title: "애매한 세대간의 갈등에 대해서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "20대는 대표적인 청년세대로서, 많은 기성세대들과의 갈등을 겪습니다.<br />기성세대들의 고루한 방식이 마음에 들지 않으면서도, 자신을 향한 곱지않은 시선이 불편할 수도 있습니다.<br />" + name + "님은 이런 애매한 세대 갈등 속에서 어떤 감정을 느끼시나요?", ending: "단" },
    { id: 11, title: "나의 애매한 미래 계획에 대해서 어떤 감정을 느끼시나요?", subtitle: "이 주제에 대한 안내문입니다.", description: "다른 사람들은 체계적이고 부지런하게 미래 계획을 세우고 앞으로 나아가는데,<br />자신은 그렇지 못하고 있다고 생각한 적 있으신가요?<br />" + name + "님은 불확실한 미래에 대해서 어떤 감정을 느끼시나요?", ending: "상" },
  ];
  const pageData = identityPages.find(p => String(p.id) === id);

  const mainButtonText = location.state?.mainButtonText || '';

  const handleButtonClick = (buttonId) => {
    setSelectedButtons(prev => {
      if (prev.includes(buttonId)) {
        return prev.filter(id => id !== buttonId);
      } else {
        return [...prev, buttonId];
      }
    });
  };

  const handleCreateEmotion = () => {
    setShowModal(true);
  };

  const handleNext = () => {
    setShowModal(false);
    const selectedEmotions = selectedButtons
      .map(id => buttons.find(btn => btn.id === id)?.text)
      .filter(Boolean);
    const myEmotionWord = selectedEmotions.map(emotion => emotion[0]).join('') + pageData.ending;
    localStorage.setItem('myEmotionWord_' + id, myEmotionWord);
    navigate('/home', { state: { name, myEmotionWord, id } });
  };

  const selectedEmotions = selectedButtons
    .map(id => buttons.find(btn => btn.id === id)?.text)
    .filter(Boolean);

  const homeButtons = [
    { id: 1, text: "애매한 정체성" },
    { id: 2, text: "애매한 재능" },
    { id: 3, text: "애매한 진로방향성" },
    { id: 4, text: "애매한 경제 상황" },
    { id: 5, text: "애매한 이상과 현실간의 괴리" },
    { id: 6, text: "애매한 인간관계" },
    { id: 7, text: "애매한 사회적 압박" },
    { id: 8, text: "애매한 나와 타인과의 경쟁" },
    { id: 9, text: "애매한 나에 대한 시간적 압박" },
    { id: 10, text: "애매한 세대간의 갈등" },
    { id: 11, text: "애매한 미래 계획" }
  ];
  const mainText = homeButtons.find(btn => String(btn.id) === id)?.text || '';

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #00326A 0%, #8E3CEC 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "20px"
      }}
    >
      <div style={{
        position: "relative",
        top: "20px",
        left: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        fontSize: "2rem",
        fontWeight: "800",
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        gap: "10px"
      }}>
        <div>{pageData.title}</div>
        <div style={{ fontSize: "1.5rem" }}>
          <span style={{ color: "#00BD9D" }}>{mainText}</span>의 합성 어미: <span style={{ color: "#00BD9D" }}>{pageData.ending}</span>
        </div>
      </div>

      <div style={{
        position: "relative",
        top: "50px",
        left: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "400",
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
      }}>
        <span dangerouslySetInnerHTML={{__html: pageData.description}} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "15px",
        padding: "80px 20px 20px 20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            style={{
              aspectRatio: "1",
              backgroundColor: selectedButtons.includes(button.id) 
                ? "rgba(255, 255, 255, 0.3)" 
                : "rgba(255, 255, 255, 0.1)",
              border: selectedButtons.includes(button.id)
                ? "2px solid white"
                : "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)",
              padding: "10px",
              textAlign: "center",
              wordBreak: "keep-all",
              lineHeight: "1.2"
            }}
            onMouseEnter={(e) => {
              if (!selectedButtons.includes(button.id)) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!selectedButtons.includes(button.id)) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "scale(1)";
              }
            }}
          >
            {button.text}
          </button>
        ))}
      </div>

      <div style={{
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px"
      }}>
        <button
          onClick={handleCreateEmotion}
          style={{
            padding: "15px 30px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "2px solid white",
            borderRadius: "30px",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(5px)",
            fontWeight: "600"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
        >
          나만의 감정 합성어 만들기
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(5px)"
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "40px",
              borderRadius: "20px",
              maxWidth: "600px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                padding: "8px 20px",
                backgroundColor: "rgba(142, 60, 236, 0.1)",
                color: "#8E3CEC",
                border: "1px solid #8E3CEC",
                borderRadius: "20px",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "600"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(142, 60, 236, 0.2)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(142, 60, 236, 0.1)";
                e.target.style.transform = "scale(1)";
              }}
            >
              다시하기
            </button>

            <h2 style={{
              color: "#00326A",
              marginBottom: "20px",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginTop: "20px"
            }}>
              {selectedEmotions.length > 0 ? `${mainText} 감정 합성어` : "알림"}
            </h2>
            
            {selectedEmotions.length > 0 ? (
              <>
                <div style={{
                  fontSize: "1.4rem",
                  color: "#8E3CEC",
                  marginBottom: "30px",
                  fontWeight: "600",
                  lineHeight: "1.6"
                }}>
                  {selectedEmotions.map(emotion => emotion[0]).join('')}
                  <span style={{ color: "#00BD9D" }}>{pageData.ending}</span>
                </div>
                <p style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  marginBottom: "30px",
                  lineHeight: "1.6"
                }}>
                  {name}님의 '{mainText}'에서 느끼는 감정을 표현하는 감정 합성어가 만들어졌어요.<br />
                  이 감정들을 시작으로 탐색을 시작해보세요.
                </p>
              </>
            ) : (
              <p style={{
                color: "#666",
                fontSize: "1.1rem",
                marginBottom: "30px",
                lineHeight: "1.6"
              }}>
                감정을 하나 이상 선택해주세요.
              </p>
            )}
            
            <button
              onClick={handleNext}
              style={{
                padding: "12px 30px",
                backgroundColor: "#8E3CEC",
                color: "white",
                border: "none",
                borderRadius: "25px",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "600"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#7B2CD9";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#8E3CEC";
                e.target.style.transform = "scale(1)";
              }}
            >
              {selectedEmotions.length > 0 ? "다음 감정 합성어 만들러가기" : "확인"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Identity; 