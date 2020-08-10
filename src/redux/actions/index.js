import types from "./types";

export const setInitialUserGameOption = (
  initialUserValues,
  initialUserTotalValues,
  userName
) => {
  return {
    type: types.SET_INITIAL_USER_GAME_OPTION,
    payload: { initialUserValues, initialUserTotalValues, userName },
  };
};
export const setInitialCPUGameOption = (initialCpuValues) => {
  return {
    type: types.SET_INITIAL_CPU_GAME_OPTION,
    payload: { initialCpuValues },
  };
};
export const setSelectedUserGameOption = (userSelection) => {
  return {
    type: types.SET_SELECTED_USER_GAME_OPTION,
    payload: { userSelection },
  };
};
export const resetSelectedUserGameOption = () => {
  return {
    type: types.RESET_SELECTED_USER_GAME_OPTION,
  };
};
export const resetSelectedCPUGameOption = () => {
  return {
    type: types.RESET_SELECTED_CPU_GAME_OPTION,
  };
};

export const setSelectedCPUGameOption = (cpuSelection) => {
  return {
    type: types.SET_SELECTED_CPU_GAME_OPTION,
    payload: { cpuSelection },
  };
};

export const setTotalBoardValues = (boardValues) => ({
  type: types.SET_TOTAL_BOARD_VALUES,
  payload: { boardValues },
});
export const setCpuBoardValues = (cpuBoardValues) => ({
  type: types.SET_CPU_BOARD_VALUES,
  payload: { cpuBoardValues },
});
