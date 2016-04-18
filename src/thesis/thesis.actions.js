/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to listing, adding and viewing theses.
*/
import { CALL_API } from "../middleware/grappaAPI";

export const THESIS_GET_ALL_SUCCESS = "THESIS_GET_ALL_SUCCESS";
export const THESIS_GET_ALL_FAILURE = "THESIS_GET_ALL_FAILURE";
export const THESIS_RESET_ALL_REQUEST = "THESIS_RESET_ALL_REQUEST";
// export const THESIS_SAVE_ONE_REQUEST = "THESIS_SAVE_ONE_REQUEST";
export const THESIS_SAVE_ONE_SUCCESS = "THESIS_SAVE_ONE_SUCCESS";
export const THESIS_SAVE_ONE_FAILURE = "THESIS_SAVE_ONE_FAILURE";
export const THESIS_UPDATE_ONE_SUCCESS = "THESIS_UPDATE_ONE_SUCCESS";
export const THESIS_UPDATE_ONE_FAILURE = "THESIS_UPDATE_ONE_FAILURE";

/*
* The action called to get a list of all the data related to the theses in the database.
* @return getTheses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getTheses = () => {
  console.log("getTheses-action called!");
  return {
    type: CALL_API,
    success: THESIS_GET_ALL_SUCCESS,
    failure: THESIS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesis",
    data: {},
  };
};

/*
* The action called to reset the state to its INITIAL_STATE.
* @return resetTheses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const resetTheses = () => {
  console.log("resetTheses-action called!");
  return {
    type: THESIS_RESET_ALL_REQUEST,
  };
};

/*
* The action called to save the given data as a new thesis in the database.
* @param thesis An object cantaining all the relevant data of the new thesis thats
* to be added.
* @return saveThesis The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const saveThesis = (thesis) => {
  console.log("saveThesis-action called!");
  return {
    type: CALL_API,
    success: THESIS_SAVE_ONE_SUCCESS,
    failure: THESIS_SAVE_ONE_FAILURE,
    method: "post",
    url: "/thesis",
    data: thesis,
  };
};

export const updateThesis = (data) => {
  console.log("");
  return {
    type: CALL_API,
    success: THESIS_UPDATE_ONE_SUCCESS,
    failure: THESIS_UPDATE_ONE_FAILURE,
    method: "put",
    url: "/thesis",
    data,
  };
};
