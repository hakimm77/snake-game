import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Food from "../components/Food.js";
import Snake from "../components/Snake.js";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlankBlock = styled.div`
  background-color: #435560;
  width: 30px;
  height: 30px;
`;

const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
`;

const PlayerScore = styled.p`
  font-size: 20px;
  font-family: sans-serif;
  color: #435560;
  padding: 10px;
`;

const width = 18;
const height = 18;

const MultiplayerSnakeBoard = () => {
  let initialRows = [];
  for (let i = 0; i < height; i++) {
    initialRows.push([]);
    for (let k = 0; k < width; k++) {
      initialRows[i].push("blank");
    }
  }

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    return position;
  };

  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ]);
  const [snake2, setSnake2] = useState([
    { x: 1, y: 16 },
    { x: 2, y: 16 },
  ]);
  const [direction1, setDirection1] = useState();
  const [direction2, setDirection2] = useState();
  const [food, setFood] = useState(randomPosition);
  // const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("userNameUser")
  );

  useEffect(() => {
    //check collision with walls
    if (
      snake[0].x > width - 1 ||
      snake[0].y > height - 1 ||
      snake[0].x < 0 ||
      snake[0].y < 0
    ) {
      alert(`white player: ${snake.length}  ;  red player: ${snake2.length}`);
      window.location.reload();
    }

    //check collision with walls
    if (
      snake2[0].x > width - 1 ||
      snake2[0].y > height - 1 ||
      snake2[0].x < 0 ||
      snake2[0].y < 0
    ) {
      alert(`white player: ${snake.length}  ;  red player: ${snake2.length}`);
      window.location.reload();
    }
    //check collision with its self
    let filterSnake = snake.filter(
      (cell) => snake[0].x === cell.x && snake[0].y === cell.y
    );

    if (filterSnake.length === 2) {
      alert(`white player: ${snake.length}  ;  red player: ${snake2.length}`);
      window.location.reload();
    }
    //check collision with its self
    let filterSnake2 = snake2.filter(
      (cell) => snake2[0].x === cell.x && snake2[0].y === cell.y
    );

    if (filterSnake2.length === 2) {
      alert(`white player: ${snake.length}  ;  red player: ${snake2.length}`);
      window.location.reload();
    }
  }, [snake]);

  onkeydown = (e) => {
    switch (e.keyCode) {
      //player one keybinds

      case 37:
        if (
          direction1 !== "right" &&
          (direction1 !== "top" || direction1 !== "bottom")
        ) {
          setDirection1("left");
        }
        break;
      case 38:
        if (
          direction1 !== "bottom" &&
          (direction1 !== "right" || direction1 !== "left")
        ) {
          setDirection1("top");
        }
        break;
      case 39:
        if (
          direction1 !== "left" &&
          (direction1 !== "top" || direction1 !== "bottom")
        ) {
          setDirection1("right");
        }
        break;
      case 40:
        if (
          direction1 !== "top" &&
          (direction1 !== "right" || direction1 !== "left")
        ) {
          setDirection1("bottom");
        }
        break;
      //player 2 one keybinds

      case 65:
        if (direction2 !== "right") {
          setDirection2("left");
        }
        break;
      case 87:
        if (direction2 !== "bottom") {
          setDirection2("top");
        }
        break;
      case 68:
        if (direction2 !== "left") {
          setDirection2("right");
        }
        break;
      case 83:
        if (direction2 !== "top") {
          setDirection2("bottom");
        }
        break;
    }
  };

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake";
    });

    snake2.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake2";
    });

    newRows[food.x][food.y] = "food";
    setRows(newRows);
  };

  const moveSnake = () => {
    displaySnake();
    if (direction1) {
      const newSnake = [];
      switch (direction1) {
        case "right":
          newSnake.push({ x: snake[0].x, y: snake[0].y + 1 });
          break;
        case "left":
          newSnake.push({ x: snake[0].x, y: snake[0].y - 1 });
          break;
        case "top":
          newSnake.push({ x: snake[0].x - 1, y: snake[0].y });
          break;
        case "bottom":
          newSnake.push({ x: snake[0].x + 1, y: snake[0].y });
      }
      snake.forEach((cell) => {
        newSnake.push(cell);
      });

      if (snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition);
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    }
  };

  const moveSnake2 = () => {
    displaySnake();
    if (direction2) {
      const newSnake = [];
      switch (direction2) {
        case "right":
          newSnake.push({ x: snake2[0].x, y: snake2[0].y + 1 });
          break;
        case "left":
          newSnake.push({ x: snake2[0].x, y: snake2[0].y - 1 });
          break;
        case "top":
          newSnake.push({ x: snake2[0].x - 1, y: snake2[0].y });
          break;
        case "bottom":
          newSnake.push({ x: snake2[0].x + 1, y: snake2[0].y });
      }
      snake2.forEach((cell) => {
        newSnake.push(cell);
      });

      if (snake2[0].x === food.x && snake2[0].y === food.y) {
        setFood(randomPosition);
      } else {
        newSnake.pop();
      }
      setSnake2(newSnake);
    }
  };
  useInterval(moveSnake, 150);
  useInterval(moveSnake2, 150);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div>
      <MainContainer>
        <ScoresContainer>
          <PlayerScore>{`white player score :${snake.length}`}</PlayerScore>
          <PlayerScore>{`red player score :${snake2.length}`}</PlayerScore>
          <div style={{ backgroundColor: "gray" }}>
            <h2>press the buttons to controll players, so they can appear</h2>
            <h3>press arrows for white player</h3>
            <h3>press w a s d for red player</h3>
          </div>
        </ScoresContainer>

        <GameContainer>
          {rows.map((row) => (
            <div style={{ display: "flex", backgroundColor: "#435560" }}>
              {row.map((e) => {
                switch (e) {
                  case "blank":
                    return <BlankBlock />;
                  case "snake":
                    return <Snake color="#c8c6a7" />;
                  case "food":
                    return <Food />;
                  case "snake2":
                    return <Snake color="red" />;
                }
              })}
            </div>
          ))}
        </GameContainer>
      </MainContainer>
    </div>
  );
};

export default MultiplayerSnakeBoard;
