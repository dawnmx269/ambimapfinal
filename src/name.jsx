import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Name() {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setShowError(false);
      navigate('/home', { state: { name } });
    } else {
      setShowError(true);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #00326A 0%, #8E3CEC 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 600
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <label htmlFor="name" style={{ fontSize: '1.5rem', fontWeight: 600 }}>이름을 입력해주세요</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (showError) setShowError(false);
          }}
          placeholder="이름을 입력해주세요"
          style={{
            padding: '12px 24px',
            borderRadius: '20px',
            border: showError ? '2px solid #ff6b6b' : 'none',
            fontSize: '1.2rem',
            width: '220px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(5px)',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        {showError && (
          <div style={{
            color: '#ff6b6b',
            fontSize: '0.9rem',
            marginTop: '-10px'
          }}>
            이름을 입력해주세요
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#00BD9D',
            border: 'none',
            borderRadius: '20px',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginTop: '10px',
            ':hover': {
              backgroundColor: '#00a589',
              transform: 'scale(1.05)'
            }
          }}
        >
          밤하늘로 이동
        </button>
      </form>
    </div>
  );
}

export default Name; 