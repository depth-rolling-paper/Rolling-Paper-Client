import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

type ToastProps = {
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
};

const Toast: React.FC<ToastProps> = ({ setToastState, text }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false); //2초 뒤, toastState가 false가 되면서 알림창 사라짐
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastAlert>
      <p>{text}</p>
    </ToastAlert>
  );
};

export default Toast;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastAlert = styled.div`
  position: fixed;
  bottom: 28px;
  padding: 8px 40px;
  border-radius: 4px;
  background: var(--border-base-02);
  animation: ${fadeIn} 1s forwards;

  p {
    color: var(--Secondary);
    font: var(--Bold-Small-font);
    text-align: center;
  }
`;
