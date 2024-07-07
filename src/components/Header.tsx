import styled from "styled-components";
import { HeaderProps } from "../interfaces";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 24px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ButtonStyle = styled.button`
  width: 46px;
  height: 46px;
  background-color: #202124;
  border: none;
  cursor: pointer;
`;

export default function Header({
  soundImg,
  closeImg,
  soundWidth,
  soundHeight,
  closeSize,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <ButtonStyle>
        <img
          src={soundImg}
          alt="Sound"
          width={soundWidth}
          height={soundHeight}
        />
      </ButtonStyle>
      <ButtonStyle>
        <img src={closeImg} alt="Close" width={closeSize} height={closeSize} />
      </ButtonStyle>
    </HeaderContainer>
  );
}
