import React from "react";
import styled from "styled-components";
import SnakeBoard from "./screens/SnakeBoard.js";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <MainContainer>
      <SnakeBoard />
    </MainContainer>
  );
}

export default App;
