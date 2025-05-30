import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  // 로그인 팝업 창을 여는 함수
  const openLoginPopup = () => {
    // 팝업 창의 너비와 높이 설정
    const width = 500;
    const height = 400;
    // 화면 중앙에 팝업 창이 열리도록 위치 계산
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // 로그인 팝업 창 열기
    window.open(
      "/login-popup", // 팝업 창에서 열릴 페이지 경로
      "LoginPopup", // 팝업 창의 이름
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no` // 팝업 창의 속성 설정
    );
  };

  // 회원가입 팝업 창을 여는 함수
  const openRegisterPopup = () => {
    // 팝업 창의 너비와 높이 설정
    const width = 500;
    const height = 400;
    // 화면 중앙에 팝업 창이 열리도록 위치 계산
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // 회원가입 팝업 창 열기
    window.open(
      "/register-popup", // 팝업 창에서 열릴 페이지 경로
      "RegisterPopup", // 팝업 창의 이름
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no` // 팝업 창의 속성 설정
    );
  };

  // 로그인 상태를 관리하는 상태 변수
  // localStorage에서 'authToken'이 존재하면 로그인된 상태로 판단
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  // 컴포넌트가 마운트될 때 실행되는 효과
  useEffect(() => {
    // storage 이벤트를 처리하는 함수
    const handleStorageChange = (event) => {
      // 변경된 키가 'authToken'인 경우
      if (event.key === "authToken") {
        // 'authToken'의 존재 여부에 따라 로그인 상태 업데이트
        setIsLoggedIn(!!event.newValue);
      }
    };

    const handleMessage = (event) => {
      if (event.data === "loginSuccess") {
        setIsLoggedIn(true); // 로그인 상태 업데이트
        // 열린 팝업창이 있으면 닫기 시도
        const popup = window.open("", "LoginPopup");
        if (popup && !popup.closed) {
          popup.close();
        }
      }
    };

    // storage 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("message", handleMessage); // 여기 추가

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("message", handleMessage); // 클린업
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // 저장된 토큰 제거
    setIsLoggedIn(false); // 로그인 상태 업데이트
  };

  // 현재 로그인 상태를 콘솔에 출력 (디버깅용)
  console.log("isLoggedIn", isLoggedIn);

  return (
    <header className="nav-container">
      {/* 왼쪽 영역: 로고 및 주요 메뉴 */}
      <div className="nav-left">
        <Link className="nav-logo" to="/">
          AI 분류
        </Link>
        <nav className="nav-links-left">
          <Link className="nav-link" to="/board">
            게시판
          </Link>
          <Link className="nav-link" to="/gallery">
            갤러리
          </Link>
        </nav>
      </div>

      {/* 오른쪽 영역: 로그인/회원가입 또는 환영 메시지 */}
      <nav className="nav-links-right">
        {!isLoggedIn && (
          <>
            {/* 로그인 상태가 아닐 때: 로그인 및 가입하기 버튼 표시 */}
            <Link className="nav-link" onClick={openLoginPopup}>
              로그인
            </Link>
            <Link className="nav-link register" onClick={openRegisterPopup}>
              가입하기
            </Link>
          </>
        )}
        {isLoggedIn && (
          // 로그인 상태일 때: 환영 메시지 표시
          <Link className="nav-link register" onClick={handleLogout}>
            로그아웃
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Nav;
