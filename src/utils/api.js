import { shortISO } from "./date-wrangler";

const getData = (url) => {
  return fetch(url).then(response => {
    if (!response.ok) {
        throw new Error("There was a problem fetching data from the server.");
    }
    return response.json();
  });
};

const getBookables = () => {
  const urlRoot = "http://localhost:3001/bookables";
  return getData(`${urlRoot}`);
}

const getBookings = (bookableId, startDate, endDate) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = "http://localhost:3001/bookings";
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  return getData(`${urlRoot}?${query}`);
}

const getUsers = () => {
  const urlRoot = "http://localhost:3001/users";
  return getData(`${urlRoot}`);
}

export {
  getBookables,
  getBookings,
  getUsers
};