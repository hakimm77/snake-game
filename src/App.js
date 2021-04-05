import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SnakeBoard from "./screens/SnakeBoard.js";
import BeginScreen from "./screens/BeginScreen";
import MultiplayerSnakeBoard from "./screens/MultiplayerSnakeBoard";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SwitchGameMode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5f939a;
  padding: 15px;
  border-radius: 4px;
  font-family: sans-serif;
  color: white;
  cursor: pointer;
  margin: 5px;
`;

function App() {
  const [multiplayerMode, setMultiplayerMode] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userNameUser")) {
      const userNameUser = prompt("Please enter your username: ");
      localStorage.setItem("userNameUser", userNameUser);
      window.location.reload();
    }
  }, []);
  return (
    <MainContainer>
      <BeginScreen
        Children={multiplayerMode ? MultiplayerSnakeBoard : SnakeBoard}
      />
      <SwitchGameMode
        onClick={() => {
          setMultiplayerMode((previousState) => (previousState ? false : true));
        }}
      >
        {multiplayerMode ? "play singleplayer" : "play multiplayer"}
      </SwitchGameMode>
    </MainContainer>
  );
}

export default App;
