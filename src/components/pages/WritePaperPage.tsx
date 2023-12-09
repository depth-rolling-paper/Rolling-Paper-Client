import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import { Container, Button } from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic_S.svg';
import styled from 'styled-components';
import Sticker from '../common/Sticker';
import WriteModal from '../modal/WriteLetterModal';

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

type StickerInfoType = {
  image: string;
  x: number;
  y: number;
};

type TextInfoType = {
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  text: string;
  fontFamily: string;
};

const WritePage: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const navigate = useNavigate();
  const [stickers, setStickers] = useState<StickerType[]>([]);
  const [allStickersInfo, setAllStickersInfo] = useState<StickerInfoType[]>([]); //붙인 모든 스티커에 대한 정보 값
  const [texts, setTexts] = useState<Konva.Text[]>([]);
  const [textInfo, setTextInfo] = useState<TextInfoType[]>([]); //텍스트에 대한 정보 값

  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 오픈 여부
  const [textValue, setTextValue] = useState(''); //작성한 텍스트
  const [fontFamily, setFontFamily] = useState(''); //설정한 폰트
  const [changeButton, setChangeButton] = useState(1); //1 : 작성하기, 2 : 수정, 넘어가기, 3 : 보러가기

  const [person, setPerson] = useState(6); //해당 방의 전체 유저 수에서 자신을 제외한 수
  const [personFill, setPersonFill] = useState(1); //현재 유저가 작성한 롤링페이퍼 수

  const handleRegister = (data: {
    newText: string;
    font: string;
    changeButton: number;
  }) => {
    const { newText, font, changeButton } = data;
    setTextValue(newText);
    setFontFamily(font);
    setChangeButton(changeButton);
  };

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
    createTexts();
  }, []);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 390,
      height: 912,
    });

    const layer = layerRef.current;
    if (layer) {
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

      //텍스트 값이 채워졌을 때 텍스트 띄우기
      if (textValue !== '') {
        const group = new Konva.Group({
          x: 100,
          y: 100,
          draggable: true,
        });
        layer.add(group);

        const rolltext = new Konva.Text({
          text: textValue,
          fontSize: 12,
          fontFamily: fontFamily,
        });
        group.add(rolltext);

        const tr = new Konva.Transformer();
        layer.add(tr);
        tr.nodes([group]);

        group.on('dragmove', () => {
          updateText();
        });

        group.on('transform', () => {
          updateText();
        });

        const updateText = () => {
          const infos = [
            {
              x: group.x(),
              y: group.y(),
              rotation: group.rotation(),
              width: rolltext.width(),
              height: rolltext.height(),
              scaleX: group.scaleX(),
              scaleY: group.scaleY(),
              text: textValue,
              fontFamily: fontFamily,
            },
          ];
          setTextInfo(infos);
          layer.batchDraw();
        };
      }
    }

    return () => {
      stage.destroy();
    };
  }, [textValue, fontFamily, texts]);

  const handleImageClick = (stickerSrc: string) => {
    const imageNames = {
      [sticker1]: 'sticker1',
      [sticker2]: 'sticker2',
      [sticker3]: 'sticker3',
      [sticker4]: 'sticker4',
      [sticker5]: 'sticker5',
      [sticker6]: 'sticker6',
      [sticker7]: 'sticker7',
      [sticker8]: 'sticker8',
      [sticker9]: 'sticker9',
      [sticker10]: 'sticker10',
      [sticker11]: 'sticker11',
      [sticker12]: 'sticker12',
      [sticker13]: 'sticker13',
      [sticker14]: 'sticker14',
      [sticker15]: 'sticker15',
      [sticker16]: 'sticker16',
      [sticker17]: 'sticker17',
      [sticker18]: 'sticker18',
      [sticker19]: 'sticker19',
      [sticker20]: 'sticker20',
      [sticker21]: 'sticker21',
      [sticker22]: 'sticker22',
      [sticker23]: 'sticker23',
    };

    const newImage = new window.Image();
    newImage.src = stickerSrc;
    newImage.onload = () => {
      addNewSticker({
        image: newImage,
        imageName: imageNames[stickerSrc],
        x: 10,
        y: 10,
      });
    };

    const addNewSticker = (newSticker: StickerType) => {
      const updatedStickers = [...stickers, newSticker];
      setStickers(updatedStickers);

      const updatedAllStickersInfo = updatedStickers.map(sticker => {
        return {
          image: sticker.imageName,
          x: sticker.x,
          y: sticker.y,
        };
      });
      setAllStickersInfo(updatedAllStickersInfo);
    };
  };

  const saveInfoHandler = () => {
    setTextInfo(textInfo);
    setAllStickersInfo(allStickersInfo);
    if (personFill < person) {
      //넘어가기 기능
      setPersonFill(personFill + 1);
      setPerson(6);
      navigate(`/room/1/${personFill + 1}`);
      setChangeButton(1);
    } else {
      //마지막 페이지일 때
      navigate('/room/1/deliver');
    }
  };

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
                    const updatedAllStickersInfo = updatedStickers.map(
                      sticker => {
                        return {
                          image: sticker.imageName,
                          x: sticker.x,
                          y: sticker.y,
                        };
                      },
                    );
                    setAllStickersInfo(updatedAllStickersInfo);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </TextSpace>
      <FixedDiv>
        {changeButton !== 1 ? <Sticker onClick={handleImageClick} /> : null}
        {changeButton === 1 ? (
          <Button
            $margintop={17.94}
            style={{
              width: 310,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            작성하기
          </Button>
        ) : changeButton === 2 ? (
          <NextDiv>
            <button onClick={() => setIsModalOpen(true)}>수정하기</button>
            <button onClick={saveInfoHandler}>
              넘어가기 ({personFill}/{person})
            </button>
          </NextDiv>
        ) : (
          <NextDiv>
            <button onClick={() => setIsModalOpen(true)}>수정하기</button>
            <button onClick={saveInfoHandler}>보러가기</button>
          </NextDiv>
        )}
      </FixedDiv>
      <WriteModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onRegister={handleRegister}
        person={person}
        personFill={personFill}
      />
    </Container>
  );
};

export default WritePage;

const TextSpace = styled.div`
  width: 390px;
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
  bottom: 10px;
`;

const NextDiv = styled.div`
  margin-top: 17.94px;

  button {
    padding: 19px 5px;
    margin: 0 3px 10px;
    min-width: 152px;
    border-radius: 8px;
    border: none;
    background: var(--main_color);
    color: var(--contents-content);
    font: var(--EXBold-XL-font);
  }
`;
