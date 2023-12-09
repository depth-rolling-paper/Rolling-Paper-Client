import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Kakao } from '../../../images/Kakao.svg';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

type LinkType = {
  link: string;
  setCopyClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShareKakao: React.FC<LinkType> = ({ link, setCopyClick }) => {
  const url = link;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  const ShareKakao = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '롤링페이퍼',
          description:
            '종이와 펜 없이 온라인에서 간편하게\n롤링페이퍼를 주고 받아 보세요!',
          imageUrl: 'https://i.ibb.co/wLKgLMD/logo.png',
          link: {
            mobileWebUrl: 'https://rollingpaper.netlify.app',
            webUrl: 'https://rollingpaper.netlify.app',
          },
        },
        buttons: [
          {
            title: '친구가 기다리고 있어요',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
      setCopyClick(true);
    }
  };

  return (
    <ShareBtn id="kakao-link-btn" onClick={ShareKakao}>
      <Kakao />
    </ShareBtn>
  );
};

export default ShareKakao;

const ShareBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
  padding: 0;
  padding-left: 4px;
  cursor: pointer;
`;
