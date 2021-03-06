import types from "../../actions/types";

export const CPUGameOption = (
  state = {
    cpuSelection: [],
  },
  { type, payload = {} }
) => {
  switch (type) {
    case types.SET_SELECTED_CPU_GAME_OPTION:
      return { cpuSelection: [...state.cpuSelection, payload.cpuSelection] };
    case types.RESET_SELECTED_CPU_GAME_OPTION:
      return { cpuSelection: [] };
    default:
      return state;
  }
};
