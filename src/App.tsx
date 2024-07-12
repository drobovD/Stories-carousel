import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import "./App.css";
import sound from "../src/assets/Sound.svg";
import close from "../src/assets/Close.svg";

export default function App() {
  return (
    <div className="carousel">
      <Header
        soundImg={sound}
        closeImg={close}
        soundWidth={`${12.26}px`}
        soundHeight={`${20}px`}
        closeSize={`${18}px`}
      />
      <Slider />
    </div>
  );
}
