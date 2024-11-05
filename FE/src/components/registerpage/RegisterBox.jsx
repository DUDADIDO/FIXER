import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

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
  const [user_id, setId] = useState("");
  const [user_pw, setPassword] = useState("");
  const [user_pw_check, setPasswordCheck] = useState("");
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") setId(value);
    else if (name === "user_pw") setPassword(value);
    else if (name === "user_pw_check") setPasswordCheck(value);
    else if (name === "user_name") setName(value);
    else if (name === "user_email") setEmail(value);
  };

  const handleIdCheck = () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!idRegex.test(user_id)) {
      alert("아이디는 최소 8자리의 영어와 숫자로 이루어져야 합니다.");
      return;
    }
  
    fetch("http://localhost:8080/api/users/register/checkid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    })
      .then((res) => res.text()) // 응답을 텍스트로 변환
      .then((text) => {
        const isValid = text === "true"; // 텍스트가 "true"인지 확인
        if (isValid) {
          alert("사용 가능한 아이디입니다.");
          setIsIdAvailable(true);
          setIsIdChecked(true); // 중복 확인 완료 상태 업데이트
        } else {
          alert("이미 사용 중인 아이디입니다.");
          setIsIdAvailable(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const validateForm = () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isIdAvailable) {
      alert("아이디 중복 확인을 해주세요.");
      return false;
    }
    if (!idRegex.test(user_id)) {
      alert("아이디는 최소 8자리로 이루어져야 합니다.");
      return false;
    }
    if (!emailRegex.test(user_email)) {
      alert("유효한 이메일 주소를 입력해 주세요.");
      return false;
    }
    if (user_pw.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
      return false;
    }
    if (user_pw !== user_pw_check) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const onClick = () => {
    if (!validateForm()) {
      return;
    }
    const textbox = {
      user_id,
      user_pw,
      user_email,
      user_name,
    };
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textbox),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("회원가입 성공.");
          navigate("/");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      })
      .catch((error) => {
        alert("회원가입 실패");
        console.error("Error:", error);
      });
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
              id="user_id"
              name="user_id"
              value={user_id}
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
              id="user_name"
              name="user_name"
              value={user_name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="user_email"
              name="user_email"
              value={user_email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="user_pw"
              name="user_pw"
              type="password"
              value={user_pw}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="user_pw_check"
              name="user_pw_check"
              type="password"
              value={user_pw_check}
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
