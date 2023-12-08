import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ModalBlackOut } from '../../App.style';

type ActionConfirmModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  modalState: boolean;
};

const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  isOpen,
  closeModal,
  modalState,
}) => {
  const navigate = useNavigate();

  return (
    <ModalBlackOut style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalDiv>
        {modalState ? (
          <Text $font="--Bold-Large-font">
            롤링페이퍼 이미지가
            <br />
            성공적으로 저장되었어요!
          </Text>
        ) : (
          <Text $font="--Bold-Medium-font">
            롤링페이퍼를 이미지로 저장하셨나요?
            <br />
            나가시면 롤링페이퍼를 다시 볼 수 없어요.
            <br />
            방을 나가시겠어요?
          </Text>
        )}
        {modalState ? (
          <div>
            <Button
              $background="--modal-button"
              $color="--contents-content"
              onClick={() => navigate('/')}
            >
              방 나가기
            </Button>
            <Button
              $background="--contents-content"
              $color="--Bg_color"
              onClick={() => navigate('/create-room')}
            >
              새 방 만들기
            </Button>
          </div>
        ) : (
          <div>
            <Button
              $background="--modal-button"
              $color="--contents-content"
              onClick={() => navigate('/')}
            >
              방 나가기
            </Button>
            <Button
              $background="--contents-content"
              $color="--Bg_color"
              onClick={() => closeModal()}
            >
              돌아가기
            </Button>
          </div>
        )}
      </ModalDiv>
    </ModalBlackOut>
  );
};

export default ActionConfirmModal;

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

const Text = styled.p<{ $font: string }>`
  color: var(--contents-content);
  font: var(${props => props.$font});
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Button = styled.button<{ $background: string; $color: string }>`
  width: 120px;
  height: 40px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: var(${props => props.$background});
  color: var(${props => props.$color});
  font: var(--Bold-Medium-font);
  margin: 12px 9px;
`;
