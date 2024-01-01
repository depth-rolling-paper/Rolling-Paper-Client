import React from 'react';
import html2canvas from 'html2canvas';
import { Button } from '../../../App.style';

const ShareImgBtn = ({ setToastState, setModalState, setIsModalOpen }) => {
  const onCapture = () => {
    html2canvas(document.getElementById('image'), {
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#F9F5EB',
    })
      .then(canvas => {
        onSaveAs(canvas.toDataURL('image/png'), 'image-download.png');
        setModalState(true);
        setIsModalOpen(true);
      })
      .catch(() => {
        setToastState(true);
      });
  };

  const onSaveAs = (url, filename) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = url;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      $margintop={9}
      style={{
        backgroundColor: 'var(--contents-content)',
        color: 'var(--Bg_color)',
      }}
      onClick={onCapture}
    >
      이미지 저장하기
    </Button>
  );
};
export default ShareImgBtn;
