import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FormTypes, Tag, MenuItem } from "../AddItemsInterface/interfaces";
import { RootStateOrAny, connect } from "react-redux";
import Dish from "./Dish";

const select = (state: RootStateOrAny) => ({
  menuItems: state.menuInfo.menuItems,
});

function Menu({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <Container>
      <Header>Menu</Header>
      <ScrollableContainer>
        {menuItems.map((dish) => {
          return <Dish menuItem={dish} />;
        })}
        <Bottom />
      </ScrollableContainer>
    </Container>
  );
}

export default connect(select)(Menu);

const Container = styled.div`
  max-height: 450px;
  min-height: 450px;
  min-width: 90vw;
  margin: 0 auto;
  max-width: 90vw;
  overflow: hidden;
  border: 5px solid #166446;
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #333;
`;

const ScrollableContainer = styled.div`
  border-top: 4px solid black;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  height: 450px;
`;

const Bottom = styled.div`
  margin-top: 40px;
`;
