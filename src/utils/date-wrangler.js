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

const shortISO = (date) => {
  return date.toISOString().split("T")[0];
};

export { 
  addDays, 
  getWeek,
  shortISO
};