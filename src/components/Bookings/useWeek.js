import { useCallback, useReducer } from "react";
import { getWeek } from "../../utils/dates";

const ACTION_NEXT_WEEK = "NEXT_WEEK";
const ACTION_PREVIOUS_WEEK = "PREVIOUS_WEEK";
const ACTION_GO_TO_WEEK_OF_DATE = "GO_TO_WEEK_OF_DATE";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_NEXT_WEEK:
      return getWeek(state.date, 7);
    case ACTION_PREVIOUS_WEEK:
      return getWeek(state.date, -7);
    case ACTION_GO_TO_WEEK_OF_DATE:
      return getWeek(action.payload);
    default:
      return state;
  }
};

const useWeek = (date) => {
  const [ week, dispatch ] = useReducer(reducer, date, getWeek);
  const nextWeek = useCallback(
    () => (() => dispatch({ type: ACTION_NEXT_WEEK })), 
    [ dispatch ]
  );
  const previousWeek = useCallback(
    () => (() => dispatch({ type: ACTION_PREVIOUS_WEEK })), 
    [ dispatch ]
  );
  const weekOfDate = useCallback(
    (date) => (() => dispatch({ type: ACTION_GO_TO_WEEK_OF_DATE, payload: date })), 
    [ dispatch ]
  );
  const weekOfToday = useCallback(
    () => (() => dispatch({ type: ACTION_GO_TO_WEEK_OF_DATE, payload: new Date() })), 
    [ dispatch ]
  );
  return {
    week,
    nextWeek, 
    previousWeek,
    weekOfDate,
    weekOfToday
  };
}

export default useWeek;