import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 390px;
  min-height: 100vh;
  background-color: var(--Bg_color);
`;

export const Container = styled.div<{ $paddingtop: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: ${props => props.$paddingtop}px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const DetailContainer = styled.div<{
  $margintop: number;
  $marginBottom: number;
}>`
  margin-top: ${props => props.$margintop}px;
  margin-bottom: ${props => props.$marginBottom}px;
  padding: 14px 10px 0px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--Bg_color);
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.15));

  span {
    float: right;
    color: var(--border-base);
    font: var(--Regular-small-font);
    margin-top: 5px;
  }
`;

export const Text = styled.p`
  color: var(--focused_color);
  font: var(--paragraph-Medium-font);
  margin-bottom: 14px;
`;

export const TextInput = styled.input<{
  $color: string;
  $border: string;
  $placeholdercolor: string;
}>`
  width: 100%;
  height: 39px;
  padding: 4px 15px;
  border: 1px solid var(${props => props.$border});
  background-color: transparent;
  border-radius: 4px;
  color: var(${props => props.$color});
  font: var(--Bold-Medium-font);
  text-align: center;

  &:focus {
    outline: 2px solid var(--focused_color);
  }

  &::placeholder {
    color: var(${props => props.$placeholdercolor});
    font: var(--Regular-Medium-font);
  }
`;

export const Button = styled.button<{
  $margintop: number;
}>`
  padding: 19px 64.5px;
  margin-top: ${props => props.$margintop}px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 8px;
  border: none;
  background: var(--main_color);
  color: var(--contents-content);
  font: var(--EXBold-XL-font);

  &:disabled {
    opacity: 0.55;
  }
`;

export const Error = styled.p<{ $visibility: string }>`
  visibility: ${props => props.$visibility};
  color: var(--error);
  font: var(--Regular-small-font);
  margin-top: 5px;
  margin-bottom: 7px;
`;

export const ModalBlackOut = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: var(--blind);
`;
