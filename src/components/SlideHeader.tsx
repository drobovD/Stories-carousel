import { SlideHeaderProps } from "../interfaces";
import styled from "styled-components";

const SlideHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 24px;
  gap: 18px;
  z-index: 10;
`;

const PresentationContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  position: relative;
`;

const AvatarContainer = styled.img`
  max-width: 85.33px;
  height: 32px;
`;

const ButtonStyle = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 15;
    background-color: transparent;
  }
`;

export default function SlideHeader({
  avatar,
  name,
  closeImg,
  closeSize,
}: SlideHeaderProps) {
  return (
    <SlideHeaderContainer>
      <PresentationContainer>
        <AvatarContainer src={avatar} alt="Avatar" />
        <span>{name}</span>
      </PresentationContainer>
      <ButtonStyle>
        <img src={closeImg} alt="Sound" width={closeSize} height={closeSize} />
      </ButtonStyle>
    </SlideHeaderContainer>
  );
}
