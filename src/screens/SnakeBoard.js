import React, { useState, useEffect, useRef } from "react";
import Food from "../components/Food.js";
import Snake from "../components/Snake.js";

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
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);

  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("top");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("bottom");
        break;
      default:
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
    const newSnake = [];
    switch (direction) {
      case "right":
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width });
        break;
      case "left":
        newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + width) % width });
        break;
      case "top":
        newSnake.push({ x: (snake[0].x - 1 + height) % height, y: snake[0].y });
        break;
      case "bottom":
        newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y });
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
    displaySnake();
  };

  useInterval(moveSnake, 200);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {rows.map((row) => (
        <div style={{ display: "flex", backgroundColor: "#435560" }}>
          {row.map((e) => {
            switch (e) {
              case "blank":
                return (
                  <div
                    style={{
                      backgroundColor: "#435560",
                      width: 30,
                      height: 30,
                    }}
                  />
                );
              case "snake":
                return <Snake />;
              case "food":
                return <Food />;
            }
          })}
        </div>
      ))}

      <h1
        style={{ fontFamily: "sans-serif" }}
      >{`your score is:  ${snake.length}`}</h1>
    </div>
  );
};

export default SnakeBoard;
