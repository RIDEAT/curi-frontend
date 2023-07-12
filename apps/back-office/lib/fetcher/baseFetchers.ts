import { getHeader, getHeaderWithAuth } from "../constant/header";

const fetcherWithToken = async (
  url: string,
  authToken: string,
  callback?: any
) => {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaderWithAuth(authToken),
    credentials: "include",
  });
  const data = await response.json();

  if (callback) {
    return callback(data);
  }

  return data;
};

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeader(),
  });
  const data = await response.json();

  return data;
};

export { fetcherWithToken, fetcher };
