export const reduceBuildDefinitions = buildDefinitions => {
  return buildDefinitions.map(buildDefinition => ({
    id: buildDefinition.id,
    name: buildDefinition.name
  }));
};

export const getHeaders = token => ({
  Authorization: `Basic ${btoa(token)}`
});
