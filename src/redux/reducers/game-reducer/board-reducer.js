import types from "../../actions/types";

export const BoardValues = (
  state = {
    boardValues: [],
  },
  { type, payload = {} }
) => {
  switch (type) {

    case types.SET_TOTAL_BOARD_VALUES:
      return {
        boardValues: payload.boardValues,
      };
    case types.RESET_NOTIFICATION:
      return { option: null };
    default:
      return state;
  }
};
