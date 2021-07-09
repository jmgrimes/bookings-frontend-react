import { getWeek } from "../../utils/date-wrangler";

const ACTION_NEXT_WEEK = "NEXT_WEEK";
const ACTION_PREVIOUS_WEEK = "PREVIOUS_WEEK";
const ACTION_SET_DATE = "SET_DATE";

const actions = {
  nextWeek: () => ({ type: ACTION_NEXT_WEEK }),
  previousWeek: () => ({ type: ACTION_PREVIOUS_WEEK }),
  setDate: (date) => ({ type: ACTION_SET_DATE, payload: date }), 
  today: () => ({ type: ACTION_SET_DATE, payload: new Date() })
};

const initializer = (date) => getWeek(date);

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_NEXT_WEEK:
      return getWeek(state.date, 7);
    case ACTION_PREVIOUS_WEEK:
      return getWeek(state.date, -7);
    case ACTION_SET_DATE:
      return getWeek(action.payload);
    default:
      return state;
  }
};

const WeekState = {
  actions,
  initializer,
  reducer
};

export default WeekState;