import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const BuildQueueControls = ({ handleQueueBuildsClick }) => {
  return (
    <Wrapper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleQueueBuildsClick}
      >
        Запустить билды
      </Button>
    </Wrapper>
  );
};

export default BuildQueueControls;

const Wrapper = styled.div`
  margin-top: 25px;
`;
