import React, { useState, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import { Container, Button } from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic_S.svg';
import styled from 'styled-components';
import ShareImgBtn from '../common/shareSNS/ShareImgBtn';
import Toast from '../common/Toast';
import DeliveryModal from '../modal/ActionConfirmModal';
import LoadingModal from '../modal/WaitWritingModal';

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

import textdata from '../../dummyData/textdata.json';
import stickerdata from '../../dummyData/stickerdata.json';

type StickerType = {
  image: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
};

const DeliverPaperPage: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const [stickers, setStickers] = useState<StickerType[]>([]);
  const [texts, setTexts] = useState<Konva.Text[]>([]);
  const [toastState, setToastState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 여부
  const [modalState, setModalState] = useState(true); //이미지 저장 성공 모달 : true, 방 나가기 모달 : false
  const [loading, setLoading] = useState(true); //Loading 창 띄울지 여부

  //textdata를 기반으로 텍스트 객체 생성
  const createTexts = async () => {
    const newTexts: Konva.Text[] = await Promise.all(
      textdata.map(async textProperties => {
        await window.document.fonts.load(`12px "${textProperties.fontFamily}"`);
        const text: Konva.Text = new Konva.Text({
          x: textProperties.x,
          y: textProperties.y,
          rotation: textProperties.rotation,
          width: textProperties.width,
          height: textProperties.height,
          scaleX: textProperties.scaleX,
          scaleY: textProperties.scaleY,
          text: textProperties.text,
          fontFamily: textProperties.fontFamily,
          fontSize: 12,
        });
        return text;
      }),
    );
    setTexts(newTexts);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      //2초 지난 후에 사라지도록
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    if (loading === false) {
      createTexts();
    }
  }, [loading]);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 390,
      height: 912,
    });

    const layer = layerRef.current;

    if (layer && loading === false) {
      stage.add(layer);

      //기존에 추가된 텍스트 객체 제거
      layer.children.forEach((child: { destroy: () => void }) => {
        if (child instanceof Konva.Text) {
          child.destroy();
        }
      });

      //textdata를 기반으로 생성된 텍스트 객체 추가
      texts.forEach(text => {
        layer.add(text);
      });
      layer.batchDraw(); //레이어 다시 그리기

      //스티커 이름 매핑
      const imageMapping: Record<string, string> = {
        sticker1: sticker1,
        sticker2: sticker2,
        sticker3: sticker3,
        sticker4: sticker4,
        sticker5: sticker5,
        sticker6: sticker6,
        sticker7: sticker7,
        sticker8: sticker8,
        sticker9: sticker9,
        sticker10: sticker10,
        sticker11: sticker11,
        sticker12: sticker12,
        sticker13: sticker13,
        sticker14: sticker14,
        sticker15: sticker15,
        sticker16: sticker16,
        sticker17: sticker17,
        sticker18: sticker18,
        sticker19: sticker19,
        sticker20: sticker20,
        sticker21: sticker21,
        sticker22: sticker22,
        sticker23: sticker23,
      };

      //기존에 있던 스티커 출력
      stickerdata.forEach(stickerProperties => {
        const newImage = new window.Image();
        newImage.src = imageMapping[stickerProperties.image];
        newImage.onload = function () {
          const img = new Konva.Image({
            image: newImage,
            x: stickerProperties.x,
            y: stickerProperties.y,
          });

          layer.add(img);
        };
      });
    }

    return () => {
      stage.destroy();
    };
  }, [texts, loading]);

  return (
    <Container $paddingtop={16}>
      <Logo />
      <TextSpace id="image">
        <NameSpace>
          <span style={{ float: 'left' }}>To.</span>
          <span>오늘의 글쓴이</span>
          <hr />
        </NameSpace>
        <div id="container">
          <Stage width={390} height={912} ref={stageRef}>
            <Layer ref={layerRef}>
              {stickers.map((sticker, index) => (
                <Image
                  key={index}
                  image={sticker.image}
                  x={sticker.x}
                  y={sticker.y}
                  draggable
                  onDragEnd={e => {
                    const updatedStickers = stickers.slice();
                    updatedStickers[index] = {
                      ...updatedStickers[index],
                      x: e.target.x(),
                      y: e.target.y(),
                    };
                    setStickers(updatedStickers);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </TextSpace>
      <FixedDiv>
        <ShareImgBtn
          setToastState={setToastState}
          setModalState={setModalState}
          setIsModalOpen={setIsModalOpen}
        />
        <Button
          $margintop={8}
          onClick={() => {
            setModalState(false);
            setIsModalOpen(true);
          }}
        >
          롤링페이퍼 방 나가기
        </Button>
      </FixedDiv>
      {toastState ? (
        <Toast
          setToastState={setToastState}
          text="저장을 실패했습니다 다시 시도해 주세요."
        />
      ) : null}
      <DeliveryModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        modalState={modalState}
      />
      {loading ? <LoadingModal /> : null}
    </Container>
  );
};

export default DeliverPaperPage;

const TextSpace = styled.div`
  width: 390px;
  height: 912px;
  background-color: var(--Bg_color);
`;

const NameSpace = styled.div`
  margin-top: 18px;
  width: 316px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  span {
    color: var(--contents-content);
    font: var(--Bold-XL-font);
  }

  hr {
    border: 1px solid var(--sub_color);
  }
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 78px;
  width: 310px;
`;
