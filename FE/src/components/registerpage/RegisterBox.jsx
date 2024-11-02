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
  margin-top: 100px;
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    } else if (name === "studentId") {
      setStudentId(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleIdCheck = () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;

    if (!idRegex.test(id)) {
      alert("아이디는 최소 8자리의 영어와 숫자로 이루어져야 합니다.");
      return;
    }

    const textbox = { id };

    fetch("http://localhost:8080/checkId", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textbox),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          alert("사용 가능한 아이디입니다.");
          setIsIdAvailable(true);
          setIsIdChecked(true); // ID 확인 후 상태 업데이트
        } else {
          alert("이미 사용 중인 아이디입니다.");
          setIsIdAvailable(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const validateForm = () => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    const studentIdRegex = /^\d{7}$/;
    if (!isIdAvailable) {
      alert("아이디 중복 확인을 해주세요.");
      return false;
    }
    if (!idRegex.test(id)) {
      alert("아이디는 최소 8자리로 이루어져야 합니다.");
      return false;
    }
    if (password.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
      return false;
    }
    if (!studentIdRegex.test(studentId)) {
      alert("학번은 숫자로 이루어진 7자리여야 합니다.");
      return false;
    }
    if (password !== passwordCheck) {
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
      id,
      password,
      studentId,
      name,
    };
    fetch("http://localhost:8080/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textbox),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          alert("회원가입 성공.");
          navigate("/");
        } else {
          alert("이미 가입된 학번입니다.");
        }
      })
      .catch((error) => {
        alert("실패");
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
              id="id"
              name="id"
              value={id}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              disabled={isIdChecked} // 아이디 중복 확인 후 비활성화
            />
            <CheckButton onClick={handleIdCheck} disabled={isIdChecked}>
              중복 확인
            </CheckButton>
          </InputWrapper>
          <InputWrapper>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={handleChange}
              placeholder="학번을 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              value={passwordCheck}
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
