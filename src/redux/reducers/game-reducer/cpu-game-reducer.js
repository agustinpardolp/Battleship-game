import types from '../../actions/types';

export const CPUGameOption = (state = {}, { type, payload = {} }) => {
  switch (type) {
    case types.SET_SELECTED_CPU_GAME_OPTION:
      return { option: payload.option};
    case types.RESET_NOTIFICATION:
      return { message: null, msgType: null };
    default:
      return state;
  }
};
