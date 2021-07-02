const ACTION_NEXT_BOOKABLE = "NEXT_BOOKABLE"
const ACTION_PREVIOUS_BOOKABLE = "PREVIOUS_BOOKABLE"
const ACTION_SET_BOOKABLE = "SET_BOOKABLE";
const ACTION_SET_GROUP = "SET_GROUP";
const ACTION_TOGGLE_DETAILS = "TOGGLE_DETAILS"

export const actions = {
  nextBookable: () => ({ type: ACTION_NEXT_BOOKABLE }),
  previousBookable: () => ({ type: ACTION_PREVIOUS_BOOKABLE }),
  setBookable: (index) => ({ type: ACTION_SET_BOOKABLE, payload: index }),
  setGroup: (group) => ({ type: ACTION_SET_GROUP, payload: group }),
  toggleDetails: () => ({ type: ACTION_TOGGLE_DETAILS })
};

export const reducer = (state, action) => {
  const count = state.bookables.filter(bookable => bookable.group === state.group).length;
  switch(action.type) {
    case ACTION_NEXT_BOOKABLE:
      return {
        ...state,
        // no need to add the count to this algorithm since the result will always be positive.
        bookableIndex: (state.bookableIndex + 1) % count
      }
    case ACTION_PREVIOUS_BOOKABLE:
      return {
        ...state,
        // we have to add the count to keep the number positive, and modulus takes care of the rest
        bookableIndex: (count + state.bookableIndex - 1) % count
      }
    case ACTION_SET_GROUP:
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };
    case ACTION_SET_BOOKABLE:
      return {
        ...state,
        bookableIndex: action.payload
      };
    case ACTION_TOGGLE_DETAILS:
      return {
        ...state,
        showDetails: !state.showDetails
      };
    default:
      return state;
  };
};