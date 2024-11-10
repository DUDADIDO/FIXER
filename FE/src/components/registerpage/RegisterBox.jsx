import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // 생성한 api.js 파일에서 api 가져오기

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vh;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 17px;
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  margin: 0;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
    cursor: not-allowed;
  `}
`;

const CheckButton = styled.button`
  margin-left: 8px;
  font-size: 20px;
  height: 50px;
  padding: 0 16px;
  border: none;
  background-color: #03c75a;
  color: white;
  cursor: pointer;
  box-sizing: border-box;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
    cursor: not-allowed;
  `}
`;

const Button = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 55px;
  display: block;
  width: 100%;
  height: 55px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

const BackButton = styled.button`
  font-size: 20px;
  margin-bottom: 16px;
  padding: 10px 20px;
  background-color: #03c75a;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function RegisterBox() {
  const [userId, setId] = useState("");
  const [userPw, setPassword] = useState("");
  const [userPw_check, setPasswordCheck] = useState("");
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") setId(value);
    else if (name === "userPw") setPassword(value);
    else if (name === "userPw_check") setPasswordCheck(value);
    else if (name === "userName") setName(value);
    else if (name === "userEmail") setEmail(value);
  };

  const handleIdCheck = async () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!idRegex.test(userId)) {
      alert("아이디는 최소 8자리의 영어와 숫자로 이루어져야 합니다.");
      return;
    }
  
    try {
      const response = await api.post("/api/users/register/checkid", { userId });
      const isValid = response.data === true; // 서버 응답이 true 인지 확인
      if (isValid) {
        alert("사용 가능한 아이디입니다.");
        setIsIdAvailable(true);
        setIsIdChecked(true); // 중복 확인 완료 상태 업데이트
      } else {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdAvailable(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateForm = () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isIdAvailable) {
      alert("아이디 중복 확인을 해주세요.");
      return false;
    }
    if (!idRegex.test(userId)) {
      alert("아이디는 최소 8자리로 이루어져야 합니다.");
      return false;
    }
    if (!emailRegex.test(userEmail)) {
      alert("유효한 이메일 주소를 입력해 주세요.");
      return false;
    }
    if (userPw.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
      return false;
    }
    if (userPw !== userPw_check) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const onClick = async () => {
    if (!validateForm()) {
      return;
    }
    const textbox = {
      userId,
      userPw,
      userEmail,
      userName,
    };
    try {
      const response = await api.post("/api/users/register", textbox);
      if (response.status === 200) {
        alert("회원가입 성공.");
        navigate("/");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert("회원가입 실패");
      console.error("Error:", error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="flex overflow-hidden justify-center items-center flex-col">
      <Container>
        <BackButton onClick={handleBackClick}>이전 페이지</BackButton>
        <FormWrapper>
          <InputWrapper>
            <Input
              id="userId"
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              disabled={isIdChecked} // 중복 확인 후 비활성화
            />
            <CheckButton onClick={handleIdCheck} disabled={isIdChecked}>
              중복 확인
            </CheckButton>
          </InputWrapper>
          <InputWrapper>
            <Input
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="userPw"
              name="userPw"
              type="password"
              value={userPw}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="userPw_check"
              name="userPw_check"
              type="password"
              value={userPw_check}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </InputWrapper>
          <Button onClick={onClick}>회원가입</Button>
        </FormWrapper>
      </Container>
    </div>
  );
}
