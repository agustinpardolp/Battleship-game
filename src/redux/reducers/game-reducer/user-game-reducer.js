import types from "../../actions/types";

export const UserGameOption = (
  state = {
    userSelection: [],
    // totalUserBoard:[]
  },
  { type, payload = {} }
) => {
  switch (type) {
    case types.SET_SELECTED_USER_GAME_OPTION:
      console.log(state.option, state.totalUserBoard)
      return { 
        userSelection: [...state.userSelection, payload.userSelection]}
        // totalUserBoard: payload.totalUserBoard };
    case types.RESET_NOTIFICATION:
      return { message: null, msgType: null };
    default:
      return state;
  }
};
