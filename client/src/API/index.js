import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const getParkOfficers = async () =>
  await httpClient.get("/parkOfficers");

export const deleteParkOfficer = async (parkOfficerID) =>
  await httpClient.delete(`/parkOfficers/${parkOfficerID}`);

export const dismissParkOfficer = async (parkOfficerID) =>
  await httpClient.put(`/parkOfficers/${parkOfficerID}/dismiss`);

export const addParkOfficer = async (parkOfficer) =>
  await httpClient.post("/parkOfficers", parkOfficer);

export const updateParkOfficer = async (parkOfficerID, updatedData) =>
  await httpClient.put(`/parkOfficers/${parkOfficerID}`, updatedData);

export const getAllProtocols = async () =>
  await httpClient.get("/parkOfficers/protocols");

export const getAllProtocolsByOfficerID = async (parkOfficerID) =>
  await httpClient.get(`/parkOfficers/${parkOfficerID}/protocols`);

export const deleteProtocolByID = async (parkOfficerID, protocolID) =>
  await httpClient.delete(
    `parkOfficers/${parkOfficerID}/protocols/${protocolID}`
  );

export const createProtocol = async (parkOfficerID, protocol) => {
  await httpClient.post(`parkOfficers/${parkOfficerID}/protocols`, protocol);
};

export const updateProtocol = async (parkOfficerID, protocolID, updatedData) =>
  await httpClient.put(
    `/parkOfficers/${parkOfficerID}/protocols/${protocolID}`,
    updatedData
  );

export const addProtocolImages = async (images, protocolID) =>
  await httpClient.post(`/parkOfficers/protocols/${protocolID}/images`, images);

export const deleteProtocolImageByID = async (protocoID, imageID) =>
  await httpClient.delete(
    `/parkOfficers/protocols/${protocoID}/images/${imageID}`
  );

let geolocation;
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    geolocation = `${latitude} ${longitude}`;
  }
);

export const loginUser = async (userData) =>
  await httpClient.post("/users/sign-in", {
    ...userData,
    geolocation,
  });

export const registerUser = async (userData) =>
  await httpClient.post("/users/sign-up", {
    ...userData,
    geolocation,
  });

// TOKENS

export const authUser = async () => await httpClient.get("/users");

export const refreshUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const { data } = await httpClient.post("/users/refresh", {
    refreshToken,
    geolocation,
  });

  return data;
};

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    const tokens = response.data?.tokens;
    if (tokens) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    if (!err.response) {
      return Promise.reject({ message: "Server not reachable" });
    }

    const status = err.response.status;

    if (status === 403 && localStorage.getItem("refreshToken")) {
      try {
        const { accessToken, refreshToken } = await refreshUser();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return await httpClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        return Promise.reject({ message: "Session expired" });
      }
    }

    if (status === 401) {
      localStorage.clear();
      return Promise.reject({ message: "Unauthorized" });
    }

    return Promise.reject(err);
  }
);
