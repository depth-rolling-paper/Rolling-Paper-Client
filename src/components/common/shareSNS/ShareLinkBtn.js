import React from 'react';
import styled from 'styled-components';

const ShareLinkBtn = ({ link, setToastState, setCopyClick, setCopyMsg }) => {
  const ClipBoard = () => {
    const url = link;

    navigator.clipboard.writeText(url).then(() => {
      setToastState(true);
      setCopyClick(true);
      setCopyMsg(1);
    });
  };

  return <ShareBtn onClick={ClipBoard}>복사하기</ShareBtn>;
};
export default ShareLinkBtn;

const ShareBtn = styled.button`
  height: 29px;
  width: 62px;
  gap: 6px;
  border: none;
  border-radius: 4px;
  background: var(--sub_color);
  color: var(--Secondary);
  font: var(--Bold-Small-font);
  cursor: pointer;
`;
