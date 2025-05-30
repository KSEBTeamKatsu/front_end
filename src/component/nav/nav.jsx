import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  const openLoginPopup = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      "/login-popup",
      "LoginPopup",
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
    );
  };
  const openRegisterPopup = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      "/register-popup",
      "RegisterPopup",
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
    );
  };
  return (
    <header className="nav-container">
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

      <nav className="nav-links-right">
        <Link className="nav-link" onClick={openLoginPopup}>
          로그인
        </Link>

        <Link className="nav-link register" onClick={openRegisterPopup}>
          가입하기
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
