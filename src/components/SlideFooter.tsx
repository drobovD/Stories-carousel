import styled from "styled-components";
import { SlideFooterProps } from "../interfaces";

export default function SlideFooter({
  soundImg,
  soundWidth,
  soundHeight,
}: SlideFooterProps) {
  const SlideFooterContainer = styled.div`
    display: none;
    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 46px;
      bottom: 0;
      z-index: 20;
      position: absolute;
    }
  `;

  const ButtonStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border: none;
    cursor: pointer;
    position: relative;
  `;

  return (
    <SlideFooterContainer>
      <ButtonStyle>
        <img
          src={soundImg}
          alt={"Sound"}
          width={soundWidth}
          height={soundHeight}
        />
      </ButtonStyle>
      <ButtonStyle>
        <img
          src={soundImg}
          alt={"Sound"}
          width={soundWidth}
          height={soundHeight}
        />
      </ButtonStyle>
    </SlideFooterContainer>
  );
}
