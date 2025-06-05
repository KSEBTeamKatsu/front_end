import React, { useState } from "react";
import "./register.css";

function Register() {
  const [id, setID] = useState("");
  const [pw, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!id || !pw || !passwordConfirm) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (pw !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 회원가입 API 요청
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
        credentials: "include", // 서버 세션 유지용
      });
      
      if (!response.ok) {
        const errorMsg = await response.text();
        setError(errorMsg); // 서버에서 보낸 에러 메시지
      } else {
        // 회원가입 성공 시
        setError("");
        alert("회원가입 성공!");

        // 부모 창에 메시지 보내기 (필요 시)
        if (window.opener) {
          window.opener.postMessage("registerSuccess", "*");
        }

        // 팝업 창 닫기
        window.close();
      }
      
    } catch (err) {
      setError("회원가입 중 문제가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>회원가입</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="id"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Register;
