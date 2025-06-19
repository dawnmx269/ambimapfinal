import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || '손님';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { state: { name } });
    }, 2000); // 2초 후에 Home 페이지로 이동

    return () => clearTimeout(timer);
  }, [navigate, name]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif",
      textAlign: "center",
    }}>
      <h1>환영합니다, {name}님!</h1>
    </div>
  );
}

export default Welcome; 