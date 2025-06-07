import { useEffect } from 'react';

const SessionChecker = () => {
  const checkSession = async () => {
    try {
      const response = await fetch('/api/session-check', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.text();
        console.log('세션 확인:', data);
      } else if (response.status === 401) {
        console.log('세션 없음');
      } else {
        console.log('기타 오류');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  useEffect(() => {
    checkSession();
    
    const interval = setInterval(() => {
      checkSession();
    }, 60000); // 1분마다 체크

    return () => clearInterval(interval);
  }, []);

  return null; // 렌더링할 건 없어서 null 반환
};

export default SessionChecker;
