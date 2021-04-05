import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Food from "../components/Food.js";
import Snake from "../components/Snake.js";
import firebase from "../firebase/firebaseConfig";
import { submitScores } from "../helpers/scores";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeaderBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
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

const PlayerInformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 8px;
  border: 1px solid gray;
`;

const PlayerName = styled.h1`
  font-size: 20px;
  font-family: sans-serif;
  padding-right: 5px;
`;

const PlayerHighScore = styled.p`
  font-size: 18px;
  font-family: sans-serif;
`;

const width = 18;
const height = 18;

const SnakeBoard = () => {
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
  const [direction, setDirection] = useState();
  const [food, setFood] = useState(randomPosition);
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("userNameUser")
  );

  useEffect(() => {
    snake.forEach((cell) => {
      //check collision with walls
      if (
        snake[0].x > width - 1 ||
        snake[0].y > height - 1 ||
        snake[0].x < 0 ||
        snake[0].y < 0
      ) {
        setSnake([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]);

        setDirection();
      }
      //check collision with its self
    });

    let arr = snake.filter(
      (cell) => snake[0].x === cell.x && snake[0].y === cell.y
    );

    if (arr.length === 2) {
      setSnake([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]);

      setDirection();
    }
  }, [snake]);

  useEffect(() => {
    if (!localStorage.getItem("userNameUser")) {
      const userNameUser = prompt("Please enter your username: ");
      localStorage.setItem("userNameUser", userNameUser);
      window.location.reload();
    }

    firebase
      .database()
      .ref("scores")
      .limitToLast(11)
      .on("value", (snapchot) => {
        setPlayers([]);
        snapchot.forEach((childSnapchot) => {
          setPlayers((previousArr) => [...previousArr, childSnapchot.val()]);
        });
      });
  }, []);

  useEffect(() => {
    submitScores(snake.length, username);
  }, [snake.length]);

  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        if (direction !== "right") {
          setDirection("left");
        }
        break;
      case 38:
        if (direction !== "bottom") {
          setDirection("top");
        }
        break;
      case 39:
        if (direction !== "left") {
          setDirection("right");
        }
        break;
      case 40:
        if (direction !== "top") {
          setDirection("bottom");
        }
        break;
    }
  };

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake";
    });
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  };

  const moveSnake = () => {
    if (direction) {
      const newSnake = [];
      switch (direction) {
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
    displaySnake();
  };

  useInterval(moveSnake, 150);

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
    <MainContainer>
      <LeaderBoard>
        {players.map((player, index) => {
          return (
            <PlayerInformationContainer
              key={player}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <PlayerName>{player.name}</PlayerName>
              <PlayerHighScore>{player["high-score"]}</PlayerHighScore>
            </PlayerInformationContainer>
          );
        })}
      </LeaderBoard>
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
              }
            })}
          </div>
        ))}
        <h1
          style={{ fontFamily: "sans-serif" }}
        >{`your score is:  ${snake.length}`}</h1>
      </GameContainer>
    </MainContainer>
  );
};

export default SnakeBoard;
