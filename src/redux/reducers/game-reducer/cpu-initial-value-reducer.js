import types from '../../actions/types';

export const CpuInitialGameOption = (state = {}, { type, payload = {} }) => {
  switch (type) {
    case types.SET_CPU_INITIAL_GAME_OPTION:
      return { option: payload.option};
    case types.RESET_NOTIFICATION:
      return { option: null };
    default:
      return state;
  }
};
