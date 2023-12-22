import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  DetailContainer,
  TextInput,
  Error,
  Button,
} from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic_S.svg';
import UserLoadingModal from '../modal/UserLoadingModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EnterRoomPage: React.FC = () => {
  const [name, setName] = useState(''); //입력한 이름
  const [loading, setLoading] = useState(false); //Loading 창 띄울지 여부
  const [errorMsg, setErrorMsg] = useState('');
  const MAX_LENGTH = 6; //이름 글자수 제한
  const location = useLocation();
  const { state } = useLocation();
  const url = location.pathname.replace('/room/', '');
  const [userId, setUserId] = useState(0);
  const [type, setType] = useState(''); //MANAGER or NORMAL
  const [person, setPerson] = useState(0); //함께 할 사람 수
  const [personFill, setPersonFill] = useState(0); //들어와 있는 사람 수

  useEffect(() => {
    if (state) {
      setType(state);
    } else {
      setType('NORMAL');
    }
  }, []);

  //이름 글자수 계산 & 내용 저장
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    const target = event.target.value;
    setName(target);
    setErrorMsg('');
  };

  //롤링페이퍼 쓰러 가기 버튼
  const rollingPaperHandler = () => {
    axios
      .get(`https://www.rollingpaper.p-e.kr:8080/users/${name}/${url}`)
      .then(res => {
        if (res.data.canUse) {
          userCreate();
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch(error => {
        setErrorMsg(error.response.data.message);
      });
  };

  const userCreate = () => {
    axios
      .post('https://www.rollingpaper.p-e.kr:8080/users', {
        userName: name,
        userType: type,
        waitingRoomUrl: url,
      })
      .then(res => {
        setUserId(res.data.id);
        setPerson(res.data.limitUserCount);
        setPersonFill(res.data.currentUserCount);
        setLoading(true);
      })
      .catch(error => {
        setErrorMsg(error.response.data.message);
      });
  };

  return (
    <Container $paddingtop={16}>
      <Logo />
      <DetailContainer $margintop={185} $marginBottom={0}>
        <Text>
          롤링페이퍼 방에서 사용할 이름을 설정해 주세요
          <br />
          소중한 사람들에게 나를 표현하는 이름을 작성해 주세요!
        </Text>
        <TextInput
          $color={errorMsg !== '' ? '--error' : '--contents-content'}
          $border={errorMsg !== '' ? '--error' : '--border-base'}
          $placeholdercolor={errorMsg !== '' ? '--error' : '--border-base'}
          type="text"
          placeholder="이름을 지어주세요"
          minLength={2}
          maxLength={MAX_LENGTH}
          value={name}
          spellCheck={false}
          onChange={onInputHandler}
        />
        {errorMsg === '' ? (
          <Helper>한/영 2~6자</Helper>
        ) : (
          <Error $visibility="visible">{errorMsg}</Error>
        )}
      </DetailContainer>
      <Button
        $margintop={259}
        onClick={rollingPaperHandler}
        style={{ marginBottom: 83 }}
        disabled={name.length >= 2 && name.length <= 6 ? false : true}
      >
        롤링페이퍼 쓰러 가기
      </Button>
      {loading ? (
        <UserLoadingModal
          url={url}
          userId={userId}
          name={name}
          type={type}
          person={person}
          personFill={personFill}
        />
      ) : null}
    </Container>
  );
};

export default EnterRoomPage;

const Text = styled.p`
  color: var(--contents-content);
  font: var(--paragraph-Medium-font);
  margin-top: 6px;
  margin-bottom: 18px;
`;

const Helper = styled.p`
  visibility: visible;
  color: var(--border-base);
  font: var(--Regular-small-font);
  margin-top: 5px;
  margin-bottom: 7px;
  float: right;
`;
