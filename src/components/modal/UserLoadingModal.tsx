import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PersonFill } from '../../images/PersonFill.svg';
import { ReactComponent as Person } from '../../images/Person.svg';
import { ModalBlackOut } from '../../App.style';

const UserLoadingModal: React.FC = () => {
  const [user, setUser] = useState('host'); //host, guest
  const [person, setPerson] = useState(15); //함께 할 사람 수
  const [personFill, setPersonFill] = useState(3); //들어와 있는 사람 수
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      //2초 지난 후에 들어온 사람 수가 7명이 채워지도록
      setUser('host');
      setPerson(7);
      setPersonFill(7);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const startRollHandler = () => {
    if (person === personFill) {
      navigate('/room/1/1');
    }
  };

  return (
    <ModalBlackOut>
      <ModalDiv>
        <Count>
          {personFill}/{person}
        </Count>
        <ImageDiv>
          {Array.from({ length: personFill }, (_, index) => (
            <PersonFill key={index} />
          ))}
          {Array.from({ length: person - personFill }, (_, index) => (
            <Person key={index} />
          ))}
        </ImageDiv>
        {user === 'host' ? (
          <Text>
            설정한 시작 시간까지
            <br />
            입장한 유저만 함께할 수 있어요!
          </Text>
        ) : (
          <Text>
            7명 모두 모인후 방 입장이 가능합니다!
            <br />
            조금만 기다려주세요...
          </Text>
        )}
        {user === 'host' ? (
          <Button onClick={startRollHandler}>롤링페이퍼 바로 시작하기</Button>
        ) : null}
      </ModalDiv>
    </ModalBlackOut>
  );
};

export default UserLoadingModal;

const ModalDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 312px;
  border-radius: 14px;
  background: var(--Secondary);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Count = styled.p`
  margin-top: 18px;
  color: var(--contents-content);
  font: var(--Bold-Large-font);
`;

const ImageDiv = styled.div`
  margin-top: 17px;
  margin-bottom: 17px;
  padding: 0 30px;

  svg {
    margin: 7px 7px;
  }
`;

const Text = styled.p`
  color: var(--contents-content);
  font: var(--paragraph-Medium-font);
  margin-bottom: 18px;
`;

const Button = styled.button`
  padding: 11px 25px;
  gap: 8px;
  border-radius: 10px;
  background: var(--modal-button);
  color: var(--contents-content);
  font: var(--Bold-Medium-font);
  border: none;
  margin-top: 12px;
  margin-bottom: 12px;
`;
