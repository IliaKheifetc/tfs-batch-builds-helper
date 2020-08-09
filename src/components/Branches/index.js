import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import GenericList from "../GenericList";
import ToggleAll from "../ToggleAll";

const Branches = ({
  className,
  debouncedSearchText = "",
  handleSearchTextChange,
  items,
  searchText,
  shouldSelectAllBranches,
  toggleAllBranches,
  toggleBranch
}) => {
  return (
    <div className={className}>
      <h2>Branches</h2>
      <FormControl fullWidth>
        <InputLabel htmlFor="standard-adornment-branches">
          Название ветки
        </InputLabel>
        <Input
          id="standard-adornment-branches"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </FormControl>
      <ToggleAll
        checked={shouldSelectAllBranches}
        onChange={toggleAllBranches}
      />
      <GenericList
        errorText="Не удалось загрузить список веток и тэгов"
        handleItemClick={toggleBranch}
        items={items}
        searchText={debouncedSearchText}
      />
    </div>
  );
};

export default Branches;
