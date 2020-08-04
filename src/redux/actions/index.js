import types from "./types";

export const setInitialUserGameOption = (initialUserValues, initialUserTotalValues, userName) => {
  return {
    type: types.SET_INITIAL_USER_GAME_OPTION,
    payload: { initialUserValues, initialUserTotalValues, userName },
  };
};
export const setInitialCPUGameOption = (initialCpuValues) => {
  return {
    type: types.SET_INITIAL_CPU_GAME_OPTION,
    payload: {  initialCpuValues},
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
