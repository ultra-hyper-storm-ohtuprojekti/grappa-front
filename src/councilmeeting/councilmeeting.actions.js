import { CALL_API } from "../middleware/grappaAPI";

export const COUNCILMEETING_GET_ALL_SUCCESS = "COUNCILMEETING_GET_ALL_SUCCESS";
export const COUNCILMEETING_GET_ALL_FAILURE = "COUNCILMEETING_GET_ALL_FAILURE";

export const COUNCILMEETING_SAVE_ONE_SUCCESS = "COUNCILMEETING_SAVE_ONE_SUCCESS";
export const COUNCILMEETING_SAVE_ONE_FAILURE = "CONCILMEETING_SAVE_ONE_FAILURE";

export const addCouncilmeeting = (Councilmeeting) => {
  console.log("addCouncilmeeting-action called :)");
  return {
    type: CALL_API,
    success: COUNCILMEETING_SAVE_ONE_SUCCESS,
    failure: COUNCILMEETING_SAVE_ONE_FAILURE,
    method: "post",
    url: "/councilmeeting",
    data: Councilmeeting,
  };
};

export const getCouncilmeetings = (filterParams) => {
  console.log("getCouncilmeetings-action called :)");
  return {
    type: CALL_API,
    success: COUNCILMEETING_GET_ALL_SUCCESS,
    failure: COUNCILMEETING_GET_ALL_FAILURE,
    method: "get",
    url: "/councilmeeting",
    data: filterParams,
  };
};
