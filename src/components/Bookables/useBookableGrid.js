import { 
  addDays, 
  shortISO 
} from "../../utils/dates";
import { 
  sessions as sessionNames 
} from "../../static.json";
import { useMemo } from "react";

const getGrid = (bookable, startDate) => {
  const dates = bookable.days.sort().map((day) => shortISO(addDays(startDate, day)));
  const sessions = bookable.sessions.map((session) => sessionNames[session]);
  const grid = {};
  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach((date) => {
      grid[session][date] = {
        session,
        date,
        bookableId: bookable.id,
        title: ""
      };
    });
  });
  return {
    grid,
    dates,
    sessions
  };
};

const useBookableGrid = (bookable, startDate) => {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : { },
    [ bookable, startDate ]
  );
}

export default useBookableGrid;