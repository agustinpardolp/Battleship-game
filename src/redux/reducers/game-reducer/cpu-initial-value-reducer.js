import types from "../../actions/types";

export const CpuInitialGameOption = (
  state = {
    initialCpuValues: "",
  },
  { type, payload = {} }
) => {
  switch (type) {

    case types.SET_INITIAL_CPU_GAME_OPTION:
      return {
        initialCpuValues: payload.initialCpuValues,
      };
    default:
      return state;
  }
};
