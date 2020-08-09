import React from "react";
import styled from "styled-components";
import MuiList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

const nameIncludesString = (name, str) =>
  name.toLowerCase().includes(str.toLowerCase());

const includes = searchText => item => {
  if (!searchText) {
    return true;
  }

  return nameIncludesString(item.name, searchText);
};

const excludes = searchText => item => {
  if (!searchText) {
    return true;
  }

  return !nameIncludesString(item.name, searchText);
};

const List = React.memo(
  ({ errorText, items, handleItemClick, searchText, shouldIncludeText }) => {
    const filterCallback = (shouldIncludeText ? includes : excludes)(
      searchText
    );

    return (
      <Wrapper>
        <MuiList component="nav">
          {items.length ? (
            items.filter(filterCallback).map((item, index) => {
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  <ListItemIcon />
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      checked={!!item.isSelected}
                      color="primary"
                      onChange={() => handleItemClick(item)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <div>{errorText}</div>
          )}
        </MuiList>
      </Wrapper>
    );
  }
);

List.defaultProps = {
  errorText: "Ошибка",
  items: [],
  searchText: "",
  shouldIncludeText: true
};

export default List;

const Wrapper = styled.div`
  max-height: 400px;
  min-height: 400px;
  width: 500px;
  margin-top: 10px;
  overflow-y: scroll;
`;
