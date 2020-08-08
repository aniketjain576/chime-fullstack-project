import React from "react";
import styled from "@emotion/styled";
import RestaurantOwnerPage from "./RestaurantOwnerPage";
import Menu from "./Menu";

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <RestaurantOwnerPage />
        <Menu />
      </Container>
    );
  }
}

export default ExampleComponent;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;
