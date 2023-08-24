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
  const result = await response.json();

  if (callback) {
    return { response, result: callback(result) };
  }

  return { response, result };
};

const fetcherWithTokenAndBody = async (
  url: string,
  body: any,
  type?: "POST" | "PUT" | "PATCH"
) => {
  const response = await fetch(url, {
    method: type || "POST",
    headers: await getHeaderWithAuth(),
    credentials: "include",
    body: JSON.stringify(body),
  });
  try {
    const result = await response.json();
    return { response, result };
  } catch (error) {
    const result = { status: "empty" };
    return { response, result };
  }
};

export { fetcherWithToken, fetcherWithTokenAndBody, fetcher };
