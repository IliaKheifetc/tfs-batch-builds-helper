import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default ({ checked, onChange }) => (
  <StyledFormGroup aria-label="position" row>
    <FormControlLabel
      value="top"
      control={
        <Checkbox color="primary" checked={checked} onChange={onChange} />
      }
      label="Выбрать все"
      labelPlacement="start"
    />
  </StyledFormGroup>
);

const StyledFormGroup = styled(FormGroup)`
  justify-content: flex-end;
  margin-right: 44px;
`;
