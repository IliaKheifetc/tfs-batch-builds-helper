import React, { useEffect, useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import qs from "qs";
import { debounce } from "lodash";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import Index from "./components/BuildDefinitions/index";
import Branches from "./components/Branches";
import BuildQueueControls from "./components/BuildQueueControls";

import { NOTIFICATION_TYPES, PAT_TOKEN } from "./constants";
import sources from "./sources";
import { getHeaders, reduceBuildDefinitions } from "./utils";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState("");
  const [buildDefinitions, setBuildDefinitions] = useState([]);
  const [buildDefsSearchText, setBuildDefsSearchText] = useState("");
  const [
    debouncedBuildDefsSearchText,
    setDebouncedBuildDefsSearchText
  ] = useState("");
  const [shouldIncludeText, setShouldIncludeText] = useState(true);
  const [shouldSelectAllBuildDefs, setShouldSelectAllBuildDefs] = useState(
    false
  );
  const [shouldSelectAllBranches, setShouldSelectAllBranches] = useState(false);
  const [selectedBuildDefsCount, setSelectedBuildDefsCount] = useState(0);
  const [selectedBranchesCount, setSelectedBranchesCount] = useState(0);

  const [branches, setBranches] = useState([]);
  const [branchesSearchText, setBranchesSearchText] = useState("");
  const [
    debouncedBranchesSearchText,
    setDebouncedBranchesSearchText
  ] = useState("");
  const [notificationsData, setNotificationsData] = useState([]);

  const createItemClickHandler = useCallback(
    ({
      currentItems,
      setItems,
      selectedItemsCount,
      setSelectedItemsCount,
      setShouldSelectAllItems,
      idFieldName
    }) => item => {
      const itemIndex = currentItems.findIndex(
        buildDef => buildDef[idFieldName] === item[idFieldName]
      );
      const currentItem = currentItems[itemIndex];

      const isCurrentSelected = !currentItem.isSelected;

      setItems([
        ...currentItems.slice(0, itemIndex),
        { ...currentItem, isSelected: isCurrentSelected },
        ...currentItems.slice(itemIndex + 1)
      ]);

      const newSelectedItemsCount =
        selectedItemsCount + (isCurrentSelected ? 1 : -1);
      setSelectedItemsCount(newSelectedItemsCount);
      setShouldSelectAllItems(newSelectedItemsCount === currentItems.length);
    },
    [App]
  );

  const toggleBuildDefinition = useCallback(
    createItemClickHandler({
      currentItems: buildDefinitions,
      setItems: setBuildDefinitions,
      selectedItemsCount: selectedBuildDefsCount,
      setSelectedItemsCount: setSelectedBuildDefsCount,
      setShouldSelectAllItems: setShouldSelectAllBuildDefs,
      idFieldName: "id"
    }),
    [buildDefinitions]
  );

  const toggleBranch = useCallback(
    createItemClickHandler({
      currentItems: branches,
      setItems: setBranches,
      selectedItemsCount: selectedBranchesCount,
      setSelectedItemsCount: setSelectedBranchesCount,
      setShouldSelectAllItems: setShouldSelectAllBranches,
      idFieldName: "objectId"
    }),
    [branches]
  );

  const toggleAllBuildDefinitions = useCallback(
    () => {
      const shouldSelectAll = !shouldSelectAllBuildDefs;
      const newBuildDefinitions = buildDefinitions.map(buildDef => ({
        ...buildDef,
        isSelected: shouldSelectAll
      }));

      setBuildDefinitions(newBuildDefinitions);
      setShouldSelectAllBuildDefs(shouldSelectAll);
      setSelectedBuildDefsCount(shouldSelectAll ? buildDefinitions.length : 0);
    },
    [buildDefinitions]
  );

  const toggleAllBranches = useCallback(
    () => {
      const shouldSelectAll = !shouldSelectAllBranches;
      const newBranches = branches.map(branch => ({
        ...branch,
        isSelected: shouldSelectAll
      }));

      setBranches(newBranches);
      setShouldSelectAllBranches(shouldSelectAll);
      setSelectedBranchesCount(shouldSelectAll ? branches.length : 0);
    },
    [branches]
  );

  const debouncedBuildDefsSetter = useCallback(
    debounce(setDebouncedBuildDefsSearchText, 200),
    [App]
  );
  const debouncedBranchesSetter = useCallback(
    debounce(setDebouncedBranchesSearchText, 400),
    [App]
  );

  const getRefs = async (searchText = "") => {
    try {
      const queryStringParams = searchText
        ? `&${qs.stringify({ filterContains: searchText })}`
        : "";

      const response = await sources.getRefs(
        queryStringParams,
        getHeaders(token)
      );

      const {
        data: { value: branches }
      } = response;

      setBranches(branches);
    } catch (e) {
      setBranches([]);
      console.error("Error occurred when getting refs/branches", e);
    }
  };

  const handleBuildDefsSearchTextChange = e => {
    e.persist();
    setBuildDefsSearchText(e.target.value);
    debouncedBuildDefsSetter(e.target.value);
  };

  const handleBranchesSearchTextChange = e => {
    setBranchesSearchText(e.target.value);
    debouncedBranchesSetter(e.target.value);
  };

  const handleQueueBuildsClick = async () => {
    const selectedBuildDefinitions = buildDefinitions.filter(
      buildDefinition => buildDefinition.isSelected
    );

    const selectedBranchesNames = branches
      .filter(branch => branch.isSelected)
      .map(branch => branch.name.replace("refs/heads/", ""));

    if (!selectedBuildDefinitions.length || !selectedBranchesNames.length) {
      enqueueSnackbar("Необходимо выбрать build definitions и ветки", {
        variant: NOTIFICATION_TYPES.warning
      });
      return;
    }

    try {
      selectedBuildDefinitions.forEach(buildDefinition => {
        selectedBranchesNames.forEach(async branchName => {
          const buildQueueResponse = await sources.queueBuild(
            buildDefinition.id,
            branchName,
            getHeaders(token)
          );
        });

        enqueueSnackbar(
          <SnackbarText>
            Билд <b>{buildDefinition.name}</b> успешно отправлен в очередь
            билдов
          </SnackbarText>,
          {
            variant: NOTIFICATION_TYPES.success
          }
        );
      });
    } catch (e) {
      console.error("Error occurred when queueing builds", e);
    }
  };

  useEffect(
    () => {
      const getBuildDefinitions = async () => {
        try {
          const response = await sources.getBuildDefinitions(getHeaders(token));

          const {
            data: { value: buildDefinitions }
          } = response;

          setBuildDefinitions(reduceBuildDefinitions(buildDefinitions));
        } catch (e) {
          setBuildDefinitions([]);
          console.error("Error occurred when getting build definitions", e);
        }
      };

      getBuildDefinitions();
      getRefs();
    },
    [token]
  );

  useEffect(
    () => {
      getRefs(debouncedBranchesSearchText);
    },
    [debouncedBranchesSearchText]
  );

  return (
    <AppWrapper>
      <StyledTextField
        label="PAT токен"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <Index
        debouncedSearchText={debouncedBuildDefsSearchText}
        items={buildDefinitions}
        handleSearchTextChange={handleBuildDefsSearchTextChange}
        searchText={buildDefsSearchText}
        setShouldIncludeText={setShouldIncludeText}
        shouldIncludeText={shouldIncludeText}
        shouldSelectAllBuildDefs={shouldSelectAllBuildDefs}
        toggleAllBuildDefinitions={toggleAllBuildDefinitions}
        toggleBuildDefinition={toggleBuildDefinition}
      />
      <StyledBranches
        debouncedSearchText={debouncedBranchesSearchText}
        handleSearchTextChange={handleBranchesSearchTextChange}
        items={branches}
        searchText={branchesSearchText}
        toggleBranch={toggleBranch}
        shouldSelectAllBranches={shouldSelectAllBranches}
        toggleAllBranches={toggleAllBranches}
      />
      <BuildQueueControls handleQueueBuildsClick={handleQueueBuildsClick} />
    </AppWrapper>
  );
}

export default App;

const StyledBranches = styled(Branches)``;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1100px;
  padding-top: 20px;
  flex-wrap: wrap;
  margin: 0 auto;

  ${StyledBranches} {
    margin-left: 25px;
  }
`;

const SnackbarText = styled.span`
  white-space: pre;
`;

const StyledTextField = styled(TextField)`
  flex-basis: 30%;
  margin-right: 63%;
`;
