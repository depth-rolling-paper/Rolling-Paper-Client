import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  DetailContainer,
  Button,
  Text,
  TextInput,
  Error,
} from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic.svg';

const MainPage: React.FC = () => {
  const [link, setLink] = useState(''); //입력한 값 저장
  const [checkLink, setCheckLink] = useState(false); //입력한 링크에 대한 에러 메시지 출력 여부
  const navigate = useNavigate();

  const checkLinkHandler = () => {
    if (link === '안녕') {
      setCheckLink(false);
      navigate('/room/1');
    } else {
      setCheckLink(true);
    }
  };

  return (
    <Container $paddingtop={98}>
      <Logo />
      <DetailContainer $margintop={70}>
        <Text>
          소중한 사람들과 소중한 마음을 주고 받고 싶으신가요?
          <br />
          롤링페이퍼 방을 만들어 보세요!
        </Text>
        <Button $margintop={0} onClick={() => navigate('/create-room')}>
          롤링페이퍼 방 만들기
        </Button>
      </DetailContainer>
      <DetailContainer $margintop={31}>
        <Text>
          롤링페이퍼 방에 초대 받으셨나요?
          <br />
          초대받은 링크를 입력해 주세요!
        </Text>
        <TextInput
          $color={checkLink ? '--error' : '--contents-content'}
          $border={checkLink ? '--error' : '--border-base'}
          $placeholdercolor={checkLink ? '--error' : '--border-base'}
          type="text"
          placeholder="초대받은 링크를 입력해주세요"
          onChange={event => {
            setLink(event.target.value);
            setCheckLink(false);
            if (event.target.value === '') {
              setCheckLink(false);
            }
          }}
        />
        <Error $visibility={checkLink ? 'visible' : 'hidden'}>
          초대 링크를 다시 확인해 주세요
        </Error>
        <Button
          $margintop={0}
          onClick={checkLinkHandler}
          disabled={link === '' ? true : false}
        >
          방 입장하기
        </Button>
      </DetailContainer>
    </Container>
  );
};

export default MainPage;
