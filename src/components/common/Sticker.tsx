import React from 'react';
import styled from 'styled-components';
import sticker1 from '../../images/sticker/sticker1.png';
import sticker2 from '../../images/sticker/sticker2.png';
import sticker3 from '../../images/sticker/sticker3.png';
import sticker4 from '../../images/sticker/sticker4.png';
import sticker5 from '../../images/sticker/sticker5.png';
import sticker6 from '../../images/sticker/sticker6.png';
import sticker7 from '../../images/sticker/sticker7.png';
import sticker8 from '../../images/sticker/sticker8.png';
import sticker9 from '../../images/sticker/sticker9.png';
import sticker10 from '../../images/sticker/sticker10.png';
import sticker11 from '../../images/sticker/sticker11.png';
import sticker12 from '../../images/sticker/sticker12.png';
import sticker13 from '../../images/sticker/sticker13.png';
import sticker14 from '../../images/sticker/sticker14.png';
import sticker15 from '../../images/sticker/sticker15.png';
import sticker16 from '../../images/sticker/sticker16.png';
import sticker17 from '../../images/sticker/sticker17.png';
import sticker18 from '../../images/sticker/sticker18.png';
import sticker19 from '../../images/sticker/sticker19.png';
import sticker20 from '../../images/sticker/sticker20.png';
import sticker21 from '../../images/sticker/sticker21.png';
import sticker22 from '../../images/sticker/sticker22.png';
import sticker23 from '../../images/sticker/sticker23.png';

type StickerProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: (sticker: string) => void;
};

const Sticker: React.FC<StickerProps> = ({ onClick }) => {
  const stickers = [
    sticker1,
    sticker2,
    sticker3,
    sticker4,
    sticker5,
    sticker6,
    sticker7,
    sticker8,
    sticker9,
    sticker10,
    sticker11,
    sticker12,
    sticker13,
    sticker14,
    sticker15,
    sticker16,
    sticker17,
    sticker18,
    sticker19,
    sticker20,
    sticker21,
    sticker22,
    sticker23,
  ];

  return (
    <StickerDiv>
      <div>
        {stickers.map((sticker, index: number) => {
          return (
            <img
              key={index}
              src={sticker}
              alt={`Sticker${index}`}
              onClick={() => {
                onClick(sticker);
              }}
            />
          );
        })}
      </div>
    </StickerDiv>
  );
};

export default Sticker;

const StickerDiv = styled.div`
  display: flex;
  width: 340px;
  height: 60.06px;
  gap: 11px;
  border-radius: 10px;
  background: var(--Secondary);
  box-shadow:
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);

  div {
    overflow-x: auto;
    white-space: nowrap;
    padding: 9px 14px 0px 25px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  img {
    margin-right: 11px;
    width: 38.776px;
    height: 39.807px;
    cursor: pointer;
  }
`;
