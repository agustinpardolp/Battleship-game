import types from "../../actions/types";

export const UserInitialGameOption = (
  state = {
    initialUserValues: "",
    initialUserTotalValues: "",
    userName: "",
  },
  { type, payload = {} }
) => {
  switch (type) {
    case types.SET_INITIAL_USER_GAME_OPTION:
      return {
        initialUserValues: payload.initialUserValues,
        initialUserTotalValues: payload.initialUserTotalValues,
        userName: payload.userName,
      };
    case types.RESET_NOTIFICATION:
      return { message: null, msgType: null };
    default:
      return state;
  }
};
