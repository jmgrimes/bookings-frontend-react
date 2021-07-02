const ACTION_NEXT_WEEK = "NEXT_WEEK";
const ACTION_PREVIOUS_WEEK = "PREVIOUS_WEEK";
const ACTION_SET_DATE = "SET_DATE";

const addDays = (date, daysToAdd) => {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
};

const getWeek = (forDate, daysOffset = 0) => {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();
  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day)
  };
};

export const actions = {
  nextWeek: () => ({ type: ACTION_NEXT_WEEK }),
  previousWeek: () => ({ type: ACTION_PREVIOUS_WEEK }),
  setDate: (date) => ({ type: ACTION_SET_DATE, payload: date }), 
  today: () => ({ type: ACTION_SET_DATE, payload: new Date() })
};

export const initializer = (date) => getWeek(date);

export const reducer = (state, action) => {
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