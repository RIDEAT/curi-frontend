import { getHeader, getHeaderWithAuth } from "./header";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeader(),
  });
  const data = await response.json();

  return data;
};

const fetcherWithToken = async (
  url: string,
  callback?: any,
  type?: "GET" | "DELETE"
) => {
  const response = await fetch(url, {
    method: type || "GET",
    headers: await getHeaderWithAuth(),
    credentials: "include",
  });
  const data = await response.json();

  if (callback) {
    return callback(data);
  }

  return data;
};

const fetcherWithTokenAndBody = async (
  url: string,
  body: any,
  type?: "POST" | "PUT"
) => {
  const response = await fetch(url, {
    method: type || "POST",
    headers: await getHeaderWithAuth(),
    credentials: "include",
    body: JSON.stringify(body),
  });
  const result = await response.json();

  return { response, result };
};

export { fetcherWithToken, fetcherWithTokenAndBody, fetcher };
