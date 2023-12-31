import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PersonFill } from '../../images/PersonFill.svg';
import { ReactComponent as Person } from '../../images/Person.svg';
import { ModalBlackOut } from '../../App.style';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

type UserLoadingModalProps = {
  url: string;
  userId: number;
  name: string;
  type: string;
  person: number;
  personFill: number;
};

const UserLoadingModal: React.FC<UserLoadingModalProps> = ({
  url,
  userId,
  name,
  type,
  person,
  personFill,
}) => {
  const navigate = useNavigate();
  const [personCount, setPersonCount] = useState(personFill);
  const [persons, setPersons] = useState(false);

  let stompClient: CompatClient | null = null;

  const connectSocket = () => {
    const socket = new SockJS('https://www.rollingpaper.p-e.kr:8080/ws');

    socket.onclose = () => {
      setTimeout(connectSocket, 3000);
    };

    stompClient = Stomp.over(() => socket);

    stompClient.connect(
      {},
      () => {
        stompClient?.subscribe(`/topic/${url}`, message => {
          if (message.body === url) {
            NextPages();
          } else if (message.body === 'true') {
            setPersons(true);
          } else {
            setPersonCount(Number(message.body));
          }
        });
      },
      (error: string) => {
        console.log('STOMP Error: ' + error);
        setTimeout(connectSocket, 3000);
      },
    );
  };

  useEffect(() => {
    connectSocket();

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  const startRollHandler = async () => {
    if (person === personCount || persons) {
      try {
        await axios.post(`https://www.rollingpaper.p-e.kr:8080/rooms/${url}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const NextPages = async () => {
    try {
      const getResponse = await axios.get(
        `https://www.rollingpaper.p-e.kr:8080/users/exclusion/${userId}/${url}`,
      );
      navigate(`/room/${url}/write`, {
        state: {
          userData: getResponse.data.users,
          url: url,
          userId: userId,
          name: name,
          roomName: getResponse.data.roomName,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalBlackOut>
      <ModalDiv>
        {persons ? (
          <>
            <Count>
              {personCount}/{personCount}
            </Count>
            <ImageDiv>
              {Array.from({ length: personCount }, (_, index) => (
                <PersonFill key={index} />
              ))}
              {Array.from({ length: personCount - personCount }, (_, index) => (
                <Person key={index} />
              ))}
            </ImageDiv>
          </>
        ) : (
          <>
            <Count>
              {personCount}/{person}
            </Count>
            <ImageDiv>
              {Array.from({ length: personCount }, (_, index) => (
                <PersonFill key={index} />
              ))}
              {Array.from({ length: person - personCount }, (_, index) => (
                <Person key={index} />
              ))}
            </ImageDiv>
          </>
        )}
        {type === 'MANAGER' ? (
          <Text>
            설정한 시작 시간까지
            <br />
            입장한 유저만 함께할 수 있어요!
          </Text>
        ) : persons ? (
          <Text>
            {personCount}명 모두 모인후 방 입장이 가능합니다!
            <br />
            조금만 기다려주세요...
          </Text>
        ) : (
          <Text>
            {person}명 모두 모인후 방 입장이 가능합니다!
            <br />
            조금만 기다려주세요...
          </Text>
        )}
        {type === 'MANAGER' ? (
          persons ? (
            <Button onClick={startRollHandler}>롤링페이퍼 바로 시작하기</Button>
          ) : (
            <Button
              onClick={startRollHandler}
              disabled={!(person === personCount)}
            >
              롤링페이퍼 바로 시작하기
            </Button>
          )
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

  &:disabled {
    opacity: 0.3;
  }
`;
