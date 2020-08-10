import types from "../../actions/types";

export const CpuBoardValues = (
  state = {
    cpuBoardValues: [],
  },
  { type, payload = {} }
) => {
  switch (type) {

    case types.SET_CPU_BOARD_VALUES:
      return {
        cpuBoardValues: payload.cpuBoardValues,
      };
    case types.RESET_NOTIFICATION:
      return { option: null };
    default:
      return state;
  }
};
