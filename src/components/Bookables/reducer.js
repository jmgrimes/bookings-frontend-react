const SET_GROUP = "SET_GROUP";
const SET_BOOKABLE = "SET_BOOKABLE";
const NEXT_BOOKABLE = "NEXT_BOOKABLE"
const PREVIOUS_BOOKABLE = "PREVIOUS_BOOKABLE"
const TOGGLE_HAS_DETAILS = "TOGGLE_HAS_DETAILS"

const nextBookable = () => ({
  type: NEXT_BOOKABLE
});

const previousBookable = () => ({
  type: PREVIOUS_BOOKABLE
})

const setBookable = (index) => ({
  type: SET_BOOKABLE,
  payload: index
});

const setGroup = (group) => ({
  type: SET_GROUP,
  payload: group
});

const toggleDetails = () => ({
  type: TOGGLE_HAS_DETAILS
});

export const actions = {
  nextBookable,
  previousBookable,
  setBookable,
  setGroup,
  toggleDetails
};

export const reducer = (state, action) => {
  const count = state.bookables.filter(bookable => bookable.group === state.group).length;
  switch(action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };
    case SET_BOOKABLE:
      return {
        ...state,
        bookableIndex: action.payload
      };
    case NEXT_BOOKABLE:
      return {
        ...state,
        // no need to add the count to this algorithm since the result will always be positive.
        bookableIndex: (state.bookableIndex + 1) % count
      }
    case PREVIOUS_BOOKABLE:
      return {
        ...state,
        // we have to add the count to keep the number positive, and modulus takes care of the rest
        bookableIndex: (count + state.bookableIndex - 1) % count
      }
    case TOGGLE_HAS_DETAILS:
      return {
        ...state,
        showDetails: !state.showDetails
      };
    default:
      return state;
  };
};