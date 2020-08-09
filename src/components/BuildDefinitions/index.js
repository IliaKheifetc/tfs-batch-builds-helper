import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import GenericList from "../GenericList";
import ToggleAll from "../ToggleAll";

const Index = ({
  debouncedSearchText,
  handleSearchTextChange,
  items,
  searchText,
  shouldSelectAllBuildDefs,
  setShouldIncludeText,
  shouldIncludeText,
  toggleAllBuildDefinitions,
  toggleBuildDefinition
}) => {
  return (
    <Wrapper>
      <h2>Build definitions</h2>

      <FormControl fullWidth>
        <InputLabel htmlFor="standard-adornment-build-defs">
          Название build definitions
        </InputLabel>
        <Input
          id="standard-adornment-build-defs"
          value={searchText}
          onChange={handleSearchTextChange}
          endAdornment={
            <InputAdornment position="end">
              <StyledChip
                size="small"
                label={"Содержит"}
                color={shouldIncludeText ? "primary" : "default"}
                onClick={() => setShouldIncludeText(true)}
              />
              <StyledChip
                size="small"
                label={"Не содержит"}
                color={!shouldIncludeText ? "primary" : "default"}
                onClick={() => setShouldIncludeText(false)}
              />
            </InputAdornment>
          }
        />
      </FormControl>

      <ToggleAll
        checked={shouldSelectAllBuildDefs}
        onChange={toggleAllBuildDefinitions}
      />
      <GenericList
        errorText={"Не удалось загрузить список build definitions"}
        handleItemClick={toggleBuildDefinition}
        items={items}
        shouldIncludeText={shouldIncludeText}
        searchText={debouncedSearchText}
      />
    </Wrapper>
  );
};

export default Index;

const StyledChip = styled(Chip)``;

const Wrapper = styled.div`
${StyledChip} + ${StyledChip} {
  margin-left: 10px;
}
`;
