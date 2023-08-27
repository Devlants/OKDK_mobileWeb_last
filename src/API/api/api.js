import { authInstance } from "../utils";

authInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // isTokenExpired() - 토큰 만료 여부를 확인하는 함수
      // tokenRefresh() - 토큰을 갱신해주는 함수
      await refreshAccessToken();

      const accessToken = getToken();

      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const body = {
    refresh: localStorage.getItem("refresh"),
  };

  try {
    const response = await axios.post("/account/refresh/access_token/", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const access = response.data.access;
    const refresh = response.data.refresh;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    console.log("success : refresh Access Token");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error; // 함수를 호출하는 곳에서 오류를 처리할 수 있도록 오류를 다시 던집니다.
  }
};
