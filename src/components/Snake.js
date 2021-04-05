import React from "react";
import styled from "styled-components";

const SnakeBody = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;

const Snake = ({ color }) => {
  return <SnakeBody style={{ backgroundColor: color }} />;
};
export default Snake;
