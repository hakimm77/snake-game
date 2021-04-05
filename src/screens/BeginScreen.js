import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BeginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const BeginButton = styled.div`
  display: flex;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background-color: black;
  font-size: 20px;
  font-family: sans-serif;
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BeginScreen = ({ Children }) => {
  const [startGame, setStartGame] = useState(false);
  return (
    <div>
      {startGame ? (
        <Children />
      ) : (
        <BeginContainer>
          <BeginButton
            onClick={() => {
              setStartGame(true);
            }}
          >
            Start
          </BeginButton>
        </BeginContainer>
      )}
    </div>
  );
};

export default BeginScreen;
