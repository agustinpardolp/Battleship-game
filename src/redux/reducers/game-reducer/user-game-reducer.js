import types from '../../actions/types';


export const UserGameOption = (state = {}, { type, payload = {} }) => {
  switch (type) {
    case types.SET_SELECTED_USER_GAME_OPTION:
      return { option: payload.option}
    case types.RESET_NOTIFICATION:
      return { message: null, msgType: null };
    default:
      return state;
  }
};
