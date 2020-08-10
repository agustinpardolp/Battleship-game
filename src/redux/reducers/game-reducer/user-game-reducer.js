import types from "../../actions/types";

export const UserGameOption = (
  state = {
    userSelection: [],
  },
  { type, payload = {} }
) => {
  switch (type) {
    case types.SET_SELECTED_USER_GAME_OPTION:
      return {
        userSelection: [...state.userSelection, payload.userSelection],
      };
    case types.RESET_SELECTED_USER_GAME_OPTION:
      return { userSelection: [] };
    default:
      return state;
  }
};
