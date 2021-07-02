import { useReducer } from "react";

import { bookables } from "../../static.json";

const SET_GROUP = "SET_GROUP";
const SET_BOOKABLE = "SET_BOOKABLE";
const NEXT_BOOKABLE = "NEXT_BOOKABLE"
const PREVIOUS_BOOKABLE = "PREVIOUS_BOOKABLE"
const TOGGLE_HAS_DETAILS = "TOGGLE_HAS_DETAILS"

const reducer = (state, action) => {
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
        bookableIndex: (state.bookableIndex + 1) % count
      }
    case PREVIOUS_BOOKABLE:
      return {
        ...state,
        bookableIndex: state.bookableIndex > 0 ? state.bookableIndex - 1 : count - 1
      }
    case TOGGLE_HAS_DETAILS:
      return {
        ...state,
        hasDetails: !state.hasDetails
      };
    default:
      return state;
  };
};

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables
};

export function useActions() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  return [
    state,
    {
      setGroup: (group) => dispatch({
        type: SET_GROUP,
        payload: group
      }),
      setBookable: (index) => dispatch({
        type: SET_BOOKABLE,
        payload: index
      }),
      nextBookable: () => dispatch({
        type: NEXT_BOOKABLE
      }),
      previousBookable: () => dispatch({
        type: PREVIOUS_BOOKABLE
      }),
      toggleDetails: () => dispatch({
        type: TOGGLE_HAS_DETAILS
      })
    }
  ];
}