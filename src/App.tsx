import Header from "./components/Header";
import Slider from "./components/Slider";
import { size } from "./constants";
import styled from "styled-components";
import "./App.css";
import sound from "../src/assets/Sound.svg";
import close from "../src/assets/Close.svg";

const Carousel = styled.div`
  background-color: #202124;
  max-width: 100%;
  height: 100%;
  @media only screen and (${size.desktop}) {
    display: grid;
    grid-template-rows: 0.1fr 1fr 0.1fr;
  }
  @media only screen and (${size.laptop}) {
    display: grid;
    grid-template-rows: 0.1fr 2fr 0.1fr;
  }
`;

export default function App() {
  return (
    <Carousel>
      <Header
        soundImg={sound}
        closeImg={close}
        soundWidth={`${12.26}px`}
        soundHeight={`${20}px`}
        closeSize={`${18}px`}
      />
      <Slider />
    </Carousel>
  );
}
