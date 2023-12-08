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
};

const ShareKakao: React.FC<LinkType> = ({ link }) => {
  const url = link;

  useEffect(() => {
    ShareKakao();
  }, []);

  const ShareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
      kakao.Share.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '롤링페이퍼',
          description: '너도 들어와',
          imageUrl: '',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
        buttons: [
          {
            title: '나도 롤링페이퍼 방 만들기',
            link: {
              webUrl: url,
            },
          },
        ],
      });
    }
  };

  return (
    <ShareBtn id="kakao-link-btn">
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
