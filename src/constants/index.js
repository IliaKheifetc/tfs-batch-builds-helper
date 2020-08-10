const BASE_URL = " https://tfs.astralnalog.ru/tfs/DefaultCollection/";

const PROJECT_ID = "e3337b08-f8bd-424a-9626-53e0af05ffa9";
const REPOSITORY_ID = "64d662b0-bef2-4366-8577-c091a286f49f";

const COMMITS_URL = `https://tfs.astralnalog.ru/tfs/DefaultCollection/e3337b08-f8bd-424a-9626-53e0af05ffa9/_apis/git/repositories/64d662b0-bef2-4366-8577-c091a286f49f/commits`;
const BUILDS_LIST_URL = `${BASE_URL}${PROJECT_ID}/_apis/build/builds?api-version=6.0-preview.6&$top=10`;

export const FOLDER_PATH = "\\YAML WebReport Pipelines";

export const BUILD_DEFINITIONS_LIST_URL = `${BASE_URL}${PROJECT_ID}/_apis/build/definitions?api-version=6.0-preview.7&path=${FOLDER_PATH}`;

const REFS_LIMIT_PER_QUERY = 15;

// branches and tags
export const REFS_LIST_URL = `${BASE_URL}${PROJECT_ID}/_apis/git/repositories/${REPOSITORY_ID}/refs?api-version=6.0-preview.1&$top=${REFS_LIMIT_PER_QUERY}`;

export const QUEUE_BUILD_URL = `${BASE_URL}${PROJECT_ID}/_apis/build/builds?api-version=6.0-preview.6`;

export const NOTIFICATION_TYPES = {
  success: "success",
  warning: "warning",
  info: "info",
  error: "error"
};
