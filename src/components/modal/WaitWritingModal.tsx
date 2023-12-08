import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DocText } from '../../images/DocText.svg';
import { ReactComponent as Pencil } from '../../images/Pencil.svg';
import { ReactComponent as Loading } from '../../images/Loading.svg';
import { ModalBlackOut } from '../../App.style';

const WaitWritingModal: React.FC = () => {
  return (
    <ModalBlackOut>
      <ModalDiv>
        <ImageDiv>
          <Pencil />
          <Loading />
          <DocText />
        </ImageDiv>
        <Text>
          소중한 사람들이 나의 롤링페이퍼를 작성중이에요
          <br />
          조금만 기다려 주세요
        </Text>
      </ModalDiv>
    </ModalBlackOut>
  );
};

export default WaitWritingModal;

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

const ImageDiv = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;

  svg {
    margin: 0 3.5px;
  }
`;

const Text = styled.p`
  color: var(--contents-content);
  font: var(--paragraph-Medium-font);
  margin-bottom: 18px;
`;
