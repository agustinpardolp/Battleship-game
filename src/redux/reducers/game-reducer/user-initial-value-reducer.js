import types from "../../actions/types";

export const UserInitialGameOption = (state = {}, { type, payload = {} }) => {
  switch (type) {
    case types.SET_INITIAL_USER_GAME_OPTION:
      return {
        letterColumns: payload.letterColumns,
        numberRows: payload.numberRows,
      };
    case types.RESET_NOTIFICATION:
      return { message: null, msgType: null };
    default:
      return state;
  }
};
