import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  DetailContainer,
  TextInput,
  Button,
  Error,
} from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic_S.svg';
import { ReactComponent as Plus } from '../../images/Plus.svg';
import { ReactComponent as Minus } from '../../images/Minus.svg';
import ShareKakaoBtn from '../common/shareSNS/ShareKakaoBtn';
import ShareLinkBtn from '../common/shareSNS/ShareLinkBtn';
import Toast from '../common/Toast';

const CreateRoomPage: React.FC = () => {
  const [roomName, setRoomName] = useState(''); //방 이름
  const [nameMsg, setNameMsg] = useState(false); //방 이름 에러 메시지 표시 여부
  const [show, setShow] = useState(false); //보일 때 true, 안보일 때 false
  const [count, setCount] = useState(2); //사람 수, 최소 2 최대 15
  const [time, setTime] = useState(''); //입장 가능 시간
  const [timeMsg, setTimeMsg] = useState(false); //입장 에러 메시지 표시 여부
  const [link, setLink] = useState(''); //생성된 링크
  const [toastState, setToastState] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [copyClick, setCopyClick] = useState(false);
  const [copyMsg, setCopyMsg] = useState(0); //0 초기, 1 성공, 2 에러
  const navigate = useNavigate();
  const MAX_LENGTH = 10; //방 이름 글자수 제한

  //방 이름 글자수 계산 & 내용 저장
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    const target = event.target.value;
    setRoomName(target);

    if (event.target.value !== '') {
      setNameMsg(false);
      setShow(true);
    } else {
      setNameMsg(true);
      setShow(false);
    }
  };

  //롤링페이퍼 방 만들기를 눌렀을 때
  const createRoomHandler = () => {
    if (roomName === '') {
      setNameMsg(true);
    } else {
      setNameMsg(false);
    }
    if (show) {
      if (time === '') {
        setTimeMsg(true);
      } else {
        setTimeMsg(false);
      }
    }

    if (show) {
      if (time !== '' && roomName !== '') {
        setLink('https://github.com/depth-rolling-paper');
        setCreateRoom(true);
      }
    }
  };

  //롤링페이퍼 방 입장하기 버튼을 눌렀을 때
  const clickRoomHandler = () => {
    if (copyClick) {
      setCopyMsg(1);
      navigate('/room/1');
    } else {
      setCopyMsg(2);
    }
  };

  return (
    <Container $paddingtop={16}>
      <Logo />
      <DetailContainer $margintop={35}>
        <Question $margintop={0} $opacity={1}>
          어떤 사람들과의 롤링페이퍼인가요?
        </Question>
        <TextInput
          $color={nameMsg ? '--error' : '--contents-content'}
          $border={nameMsg ? '--error' : '--border-base'}
          $placeholdercolor={nameMsg ? '--error' : '--border-base'}
          disabled={createRoom}
          type="text"
          placeholder="방 이름을 지어주세요"
          minLength={1}
          maxLength={MAX_LENGTH}
          value={roomName}
          spellCheck={false}
          onChange={onInputHandler}
        />
        <span>{roomName.length}/10</span>
        <Question $margintop={54} $opacity={show ? 1 : 0.3}>
          몇명과 함께 하실건가요?
        </Question>
        <CountDiv $opacity={show ? 1 : 0.3}>
          <button
            disabled={!show || createRoom}
            onClick={() => {
              count > 2 ? setCount(count - 1) : setCount(count);
            }}
          >
            <Minus />
          </button>
          <p>{count}</p>
          <button
            disabled={!show || createRoom}
            onClick={() => {
              count < 15 ? setCount(count + 1) : setCount(count);
            }}
          >
            <Plus />
          </button>
        </CountDiv>
        <Question $margintop={54} $opacity={show ? 1 : 0.3}>
          롤링페이퍼 시작 시간을 정해주세요!
        </Question>
        <Select
          $color={timeMsg ? '--error' : '--contents-content'}
          $font={time === '' ? '--Regular-Medium-font' : '--Bold-Medium-font'}
          name="time"
          value={time}
          onChange={event => {
            setTime(event.target.value);
            setTimeMsg(false);
          }}
          disabled={!show || createRoom}
          style={{
            opacity: createRoom ? 1 : '',
          }}
          required
        >
          <option value="" disabled>
            방 만들기 후 입장 가능 시간
          </option>
          <option value="5">5분 후</option>
          <option value="10">10분 후</option>
          <option value="30">30분 후</option>
          <option value="60">1시간 후</option>
        </Select>
        <Error $visibility={timeMsg ? 'visible' : 'hidden'}>
          입장 가능 시간을 설정해주세요
        </Error>
        <Button $margintop={28} onClick={createRoomHandler}>
          롤링페이퍼 방 만들기
        </Button>
        <LinkCopy $visibility={createRoom ? 'visible' : 'hidden'}>
          <p>{link}</p>
          <ShareLinkBtn
            link={link}
            setToastState={setToastState}
            setCopyClick={setCopyClick}
            setCopyMsg={setCopyMsg}
          />
          <ShareKakaoBtn link={link} />
        </LinkCopy>
        <div
          style={{
            float: 'left',
            marginTop: '-3px',
            marginLeft: '8px',
            marginBottom: '30px',
          }}
        >
          <Error
            $visibility={createRoom && copyMsg === 2 ? 'visible' : 'hidden'}
          >
            초대 링크를 공유해야 방이 완성돼요!
          </Error>
        </div>
      </DetailContainer>
      <Button
        $margintop={31}
        onClick={clickRoomHandler}
        style={{ opacity: copyClick ? 1 : 0.5 }}
      >
        방 입장하기
      </Button>
      {toastState ? (
        <Toast setToastState={setToastState} text="링크가 복사되었습니다." />
      ) : null}
    </Container>
  );
};

export default CreateRoomPage;

const Question = styled.p<{ $margintop: number; $opacity: number }>`
  margin-top: ${props => props.$margintop}px;
  margin-bottom: 7px;
  color: var(--contents-content);
  font: var(--Bold-Medium-font);
  opacity: ${props => props.$opacity};
`;

const CountDiv = styled.div<{ $opacity: number }>`
  width: 100%;
  height: 39px;
  padding: 4px 73px;
  border: 1px solid var(--border-base);
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${props => props.$opacity};

  button {
    position: relative;
    width: 25px;
    height: 25px;
    flex-shrink: 0;
    border-radius: 4px;
    background-color: var(--border-base-02);
    border: none;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    color: var(--contents-content);
    font: var(--Bold-XL-font);
  }
`;

const Select = styled.select<{ $color: string; $font: string }>`
  width: 100%;
  height: 39px;
  padding: 4px 15px;
  border: 1px solid var(--border-base);
  background-color: transparent;
  border-radius: 4px;
  color: var(${props => props.$color});
  font: var(${props => props.$font});
  text-align: center;
  appearance: none;

  option {
    background: var(--Bg_color, #f9f5eb);
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(75px);
    color: var(--contents-content);
    font: var(--Bold-Medium-font);
  }

  &:focus {
    outline: 2px solid var(--focused_color);
  }

  &::-ms-expand {
    display: none;
  }

  &:disabled {
    opacity: 0.3;
  }
`;

const LinkCopy = styled.div<{ $visibility: string }>`
  display: flex;
  visibility: ${props => props.$visibility};

  p {
    width: 212px;
    height: 29px;
    padding: 5px;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 4px;
    border: 1px solid var(--border-base);
    margin-right: 4px;
    color: var(--contents-content);
    font: var(--Regular-small-font);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
