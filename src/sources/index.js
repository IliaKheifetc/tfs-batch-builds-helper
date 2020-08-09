import axios from "axios/index";
import {
  BUILD_DEFINITIONS_LIST_URL,
  REFS_LIST_URL,
  QUEUE_BUILD_URL
} from "../constants";

export default {
  getBuildDefinitions: headers => {
    return axios.get(BUILD_DEFINITIONS_LIST_URL, {
      headers
    });
  },
  getRefs: (queryStringParams = "", headers) => {
    return axios.get(`${REFS_LIST_URL}${queryStringParams}`, {
      headers
    });
  },
  queueBuild: (buildDefinitionId, branchName, headers) => {
    return axios.post(
      QUEUE_BUILD_URL,
      {
        definition: { id: buildDefinitionId },
        sourceBranch: branchName
      },
      { headers }
    );
  }
};
