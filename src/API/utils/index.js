import axios from "axios";

function getToken() {
  return localStorage.getItem("access");
}

const BASE_URL = "http://3.36.95.105/";

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const axiosAuthApi = (url, options) => {
  const token = getToken();
  console.log(token);

  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    ...options,
  });
  return instance;
};
export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
