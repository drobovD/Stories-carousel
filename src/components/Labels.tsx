import { Label } from "../interfaces";
import styled from "styled-components";

const LabelsContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 17px;
  color: white;
`;

export default function Labels({ name, x, y, link }: Label) {
  return (
    <LabelsContainer
      style={{
        top: `${y}px`,
        left: `${x}px`,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ minWidth: "0" }}>
        <a
          style={{
            display: "block",
            textDecoration: "none",
            color: "white",
            width: "min-content",
          }}
          href={link}
        >
          {name}
        </a>
      </div>
    </LabelsContainer>
  );
}
