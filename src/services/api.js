const BASE_URL = 'https://jsonplaceholder.typicode.com';
const WORLDTIME_URL = 'https://worldtimeapi.org/api/timezone'

export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const data = await response.json();
  return data;
};

export const getPosts = async (userId) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  const data = await response.json();
  return data;
};

export const getCountries = async () => {
  const response = await fetch(`${WORLDTIME_URL}`);
  const data = await response.json();
  return data;
};

