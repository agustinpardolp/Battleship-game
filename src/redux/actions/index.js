import types from "./types";

export const setInitialUserGameOption = (numberRows, letterColumns) => {
  return {
    type: types.SET_INITIAL_USER_GAME_OPTION,
    payload: { numberRows, letterColumns },
  };
};
export const setInitialCPUGameOption = (option) => {

  return {
    type: types.SET_INITIAL_CPU_GAME_OPTION,
    payload: { option},
  };
};
export const setSelectedUserGameOption = (option) => {

  return {
    type: types.SET_SELECTED_CPU_GAME_OPTION,
    payload: { option },
  };
};
export const setSelectedCPUGameOption = (option) => {

  return {
    type: types.SET_SELECTED_USER_GAME_OPTION,
    payload: {option },
  };
};




export const resetNotification = () => ({
  type: types.RESET_NOTIFICATION,
});
