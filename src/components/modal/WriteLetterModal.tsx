import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ModalBlackOut, Button } from '../../App.style';
import { ReactComponent as Close } from '../../images/Close.svg';

type WriteType = {
  isOpen: boolean;
  closeModal: () => void;
  // eslint-disable-next-line no-unused-vars
  onRegister: (data: {
    newText: string;
    font: string;
    changeButton: number;
  }) => void;
  person: number;
  personFill: number;
};

const WriteLetterModal: React.FC<WriteType> = ({
  isOpen,
  closeModal,
  onRegister,
  person,
  personFill,
}) => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Nanum Gothic'); //기본 폰트
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LENGTH = 100; //글자수 제한

  const handleFontClick = (selectedFont: React.SetStateAction<string>) => {
    setFont(selectedFont);
  };

  //글자 수 계산 & 내용 저장 & 크기 조절
  const onTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    const target = event.target.value;
    setText(target);
  };

  const addText = () => {
    if (textareaRef.current) {
      const newText = textareaRef.current.value;
      closeModal();
      if (personFill === person) {
        onRegister({ newText, font, changeButton: 3 });
      } else {
        onRegister({ newText, font, changeButton: 2 });
      }
    }
  };

  return (
    <ModalBlackOut style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalDiv>
        <CloseBtn onClick={() => closeModal()}>
          <Close />
        </CloseBtn>
        <TextModal>
          <TextDiv>
            <textarea
              ref={textareaRef}
              rows={1}
              minLength={1}
              maxLength={MAX_LENGTH}
              onInput={onTextareaHandler}
              value={text}
              spellCheck={false}
              style={{ fontFamily: font }}
            />
          </TextDiv>
          <p>{text.length}/100</p>
          <FontDiv>
            <button
              onClick={() => handleFontClick('Nanum Gothic')}
              style={{ fontFamily: 'Nanum Gothic', fontSize: 15 }}
            >
              Aa
            </button>
            <button
              onClick={() => handleFontClick('omyu_pretty')}
              style={{ fontFamily: 'omyu_pretty', fontSize: 17 }}
            >
              Aa
            </button>
            <button
              onClick={() => handleFontClick('SSVeryBadHandwriting')}
              style={{
                fontFamily: 'SSVeryBadHandwriting',
                fontSize: 15,
                paddingTop: 3,
              }}
            >
              Aa
            </button>
            <button
              onClick={() => handleFontClick('KNPSKkomi-Regular00')}
              style={{
                fontFamily: 'KNPSKkomi-Regular00',
                fontSize: 16,
                paddingTop: '2%',
              }}
            >
              Aa
            </button>
            <button
              onClick={() => handleFontClick('HakgyoansimGgooreogiR')}
              style={{ fontFamily: 'HakgyoansimGgooreogiR', fontSize: 16 }}
            >
              Aa
            </button>
            <button
              onClick={() => handleFontClick('Nanum Pen Script')}
              style={{
                fontFamily: 'Nanum Pen Script',
                fontSize: 19,
                paddingTop: 3,
              }}
            >
              Aa
            </button>
          </FontDiv>
        </TextModal>
        <Button
          $margintop={30}
          onClick={addText}
          disabled={text === ''}
          style={{ opacity: 1 }}
        >
          등록하기
        </Button>
      </ModalDiv>
    </ModalBlackOut>
  );
};

export default WriteLetterModal;

const ModalDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TextModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 464px;
  border-radius: 5px;
  background: var(--Secondary);

  p {
    text-align: right;
    margin-right: 24px;
    color: var(--border-base-02);
    font: var(--Bold-Small-font);
  }
`;

const TextDiv = styled.div`
  width: 310px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    width: 100%;
    border: none;
    resize: none;
    outline: none;
    text-align: center;
    max-height: 380px;
    overflow-y: auto;
    font-size: 20px;
    padding: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -6.5%;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background: var(--Secondary);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const FontDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;

  button {
    width: 39.231px;
    height: 39.231px;
    background-color: var(--border-base-02);
    border: none;
    border-radius: 100px;
    color: var(--Secondary);
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
