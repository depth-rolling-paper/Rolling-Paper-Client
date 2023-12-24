import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import { Container, Button } from '../../App.style';
import { ReactComponent as Logo } from '../../images/Rolling_Paper_Classic_S.svg';
import styled from 'styled-components';
import Sticker from '../common/Sticker';
import WriteModal from '../modal/WriteLetterModal';
import axios from 'axios';

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

type StickerType = {
  image: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
};

type StickerInfoType = {
  rollingPaperType: string;
  imageName: string;
  sizeX: number;
  sizeY: number;
};

type TextInfoType = {
  location_x: number;
  location_y: number;
  rotation: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  text: string;
  fontFamily: string;
  rollingPaperType: string;
};

type TextInfoTypes = {
  fontFamily: string;
  location_x: number;
  location_y: number;
  rotation: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  text: string;
};

type ImageRollingPapersType = {
  id: number;
  rollingPaperType: string;
  imageName: string;
  sizeX: number;
  sizeY: number;
};

const WritePage: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stickers, setStickers] = useState<StickerType[]>([]);
  const [allStickersInfo, setAllStickersInfo] = useState<StickerInfoType[]>([]); //붙인 모든 스티커에 대한 정보 값
  const [texts, setTexts] = useState<Konva.Text[]>([]);
  const [textInfo, setTextInfo] = useState<TextInfoType>(); //텍스트에 대한 정보 값

  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 오픈 여부
  const [textValue, setTextValue] = useState(''); //작성한 텍스트
  const [fontFamily, setFontFamily] = useState(''); //설정한 폰트
  const [changeButton, setChangeButton] = useState(1); //1 : 작성하기, 2 : 수정, 넘어가기, 3 : 보러가기

  const person = state.userData.length; //해당 방의 전체 유저 수에서 자신을 제외한 수
  const [personFill, setPersonFill] = useState(0); //현재 유저가 작성한 롤링페이퍼 수

  const [imageRollingPapers, setImageRollingPapers] = useState<
    ImageRollingPapersType[]
  >([]);

  const [reset, setReset] = useState(false);

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
  const createTexts = async (rollingPapers: TextInfoTypes[]) => {
    const newTexts: Konva.Text[] = await Promise.all(
      rollingPapers.map(async (textProperties: TextInfoTypes) => {
        await window.document.fonts.load(`12px "${textProperties.fontFamily}"`);
        const text: Konva.Text = new Konva.Text({
          x: textProperties.location_x,
          y: textProperties.location_y,
          rotation: textProperties.rotation,
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
    axios
      .get(
        `https://www.rollingpaper.p-e.kr:8080/rolling-papers/${state.userData[personFill].id}`,
      )
      .then(async res => {
        setImageRollingPapers(res.data.imageRollingPapers);

        await createTexts(res.data.rollingPapers);
      })
      .catch(error => {
        console.error(error);
      });
    setReset(false);
  }, [reset]);

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
      imageRollingPapers.forEach(stickerProperties => {
        const newImage = new window.Image();
        newImage.src = imageMapping[stickerProperties.imageName];
        newImage.onload = function () {
          const img = new Konva.Image({
            image: newImage,
            x: stickerProperties.sizeX,
            y: stickerProperties.sizeY,
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

        const updateText = () => {
          const infos = {
            location_x: group.x(),
            location_y: group.y(),
            rotation: group.rotation(),
            width: rolltext.width(),
            height: rolltext.height(),
            scaleX: group.scaleX(),
            scaleY: group.scaleY(),
            text: textValue,
            fontFamily: fontFamily,
            rollingPaperType: 'ROLLING_PAPER',
          };

          setTextInfo(infos);
          layer.batchDraw();
        };

        updateText();

        const events = [
          'mousedown',
          'mouseup',
          'mouseover',
          'mouseout',
          'mousemove',
          'click',
          'dblclick',
          'touchstart',
          'touchend',
          'touchmove',
          'dragstart',
          'dragmove',
          'dragend',
          'transform',
          'transformstart',
          'transformend',
          'contextmenu',
          'wheel',
        ];

        events.forEach(event => {
          group.on(event, () => {
            updateText();
          });
        });
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
          imageName: sticker.imageName,
          sizeX: sticker.x,
          sizeY: sticker.y,
          rollingPaperType: 'IMAGE',
        };
      });
      setAllStickersInfo(updatedAllStickersInfo);
    };
  };

  const saveInfoHandler = () => {
    const ImageList = allStickersInfo.map(sticker => ({
      rollingPaperType: 'IMAGE',
      imageName: sticker.imageName,
      sizeX: sticker.sizeX,
      sizeY: sticker.sizeY,
    }));

    const data = {
      rollingPaperList: [
        {
          location_x: textInfo?.location_x,
          location_y: textInfo?.location_y,
          rotation: textInfo?.rotation,
          width: textInfo?.width,
          height: textInfo?.height,
          scaleX: textInfo?.scaleX,
          scaleY: textInfo?.scaleY,
          text: textInfo?.text,
          fontFamily: textInfo?.fontFamily,
          rollingPaperType: textInfo?.rollingPaperType,
        },
        ...ImageList,
      ],
    };

    axios
      .post(
        `https://www.rollingpaper.p-e.kr:8080/rolling-papers/${state.userData[personFill].id}`,
        data,
      )
      .then(() => {
        if (personFill + 1 < person) {
          //넘어가기 기능
          setPersonFill(personFill + 1);
          setTextInfo({
            location_x: 100,
            location_y: 100,
            rotation: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            text: '',
            fontFamily: 'Nanum Gothic',
            rollingPaperType: 'ROLLING_PAPER',
          });
          setAllStickersInfo([]);
          setTextValue('');
          setFontFamily('');
          setReset(true);
          setChangeButton(1);
        } else {
          //마지막 페이지일 때
          axios
            .delete(
              `https://www.rollingpaper.p-e.kr:8080/users/${state.userId}/${state.url}`,
            )
            .then(res => {
              navigate(`/room/${state.url}/deliver`, {
                state: {
                  userId: state.userId,
                  userName: state.name,
                  url: state.url,
                  emptyRoom: res.data.emptyRoom,
                },
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch();
  };

  return (
    <Container $paddingtop={16}>
      <Logo />
      <TextSpace id="image">
        <NameSpace>
          <p>{state.roomName}</p>
          <span style={{ float: 'left' }}>To.</span>
          <span>{state.userData[personFill].userName}</span>
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
                          imageName: sticker.imageName,
                          sizeX: sticker.x,
                          sizeY: sticker.y,
                          rollingPaperType: 'IMAGE',
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
              넘어가기 ({personFill + 1}/{person})
            </button>
          </NextDiv>
        ) : (
          <NextDiv>
            <button onClick={() => setIsModalOpen(true)}>수정하기</button>
            <button onClick={saveInfoHandler}>작성 완료하기</button>
          </NextDiv>
        )}
      </FixedDiv>
      <WriteModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onRegister={handleRegister}
        person={person}
        personFill={personFill + 1}
        reset={reset}
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
  margin-top: 24px;
  width: 195px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  p {
    color: #000;
    opacity: 0.5;
    font: var(--Bold-Small-font);
    margin-bottom: 9px;
  }

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
