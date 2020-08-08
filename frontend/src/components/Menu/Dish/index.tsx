import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FormTypes, MenuItem } from "../../AddItemsInterface/interfaces";
import { RootStateOrAny, connect } from "react-redux";

function Dish({ menuItem }: { menuItem: MenuItem }) {
  return (
    <Container>
      <DishWrapper>
        {menuItem.name}
        {menuItem.tag && <Tag>{menuItem.tag}</Tag>}
      </DishWrapper>
    </Container>
  );
}

export default Dish;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  overflow: hidden;
  border: 4px solid #166446;
  border-radius: 20px;
  min-height: 60px;
  max-height: 60px;
  min-width: 80%;
  max-width: 80%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DishWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #333;
`;

const Tag = styled.div`
  position: absolute;
  top: 60px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 50px;
`;
