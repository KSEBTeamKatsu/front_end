// LoginForm.jsx
import React, { useState } from "react";
import "./login.css";

function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id || !pw) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
        credentials: "include", // 세션 쿠키를 포함시켜야 서버 세션 유지 가능
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();

      const token = data.token;
      console.log("token: ", data.token);

      // ✅ 토큰을 localStorage나 sessionStorage에 저장
      sessionStorage.setItem("authToken", token);
      console.log("session: ", sessionStorage.getItem("authToken"));

      alert("로그인 성공!");
      setError("");
      //   navigate("/home");
      // 필요 시 페이지 이동 or 상태 업데이트
    } catch (err) {
      setError("로그인 중 문제가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>로그인</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;
