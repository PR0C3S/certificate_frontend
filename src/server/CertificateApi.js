import { axiosClient } from "../utils/Axios";

const route = "/certificado";

export const createCertificateAPI = async (certificate) => {
  try {
    const res = await axiosClient.post(`${route}/request`, certificate);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error creating certificate.`);
  }
};

export const depositOneMonthAPI = async (id) => {
  try {
    const res = await axiosClient.post(`${route}/deposito/${id}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error depositing 1 month to certificate.`);
  }
};

export const depositRestMonthAPI = async (id) => {
  try {
    const res = await axiosClient.post(`${route}/deposito/completo/${id}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error depositing rest months to certificate.`);
  }
};

export const retireRestApi = async (object) => {
  try {
    const res = await axiosClient.post(
      `${route}/retiro/${object.id}`,
      object.body
    );
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error retiring to certificate.`);
  }
};

export const listCertificateAPI = async () => {
  try {
    const res = await axiosClient.get(`${route}/list`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error getting certificate list.`);
  }
};

export const getBalanceByIdAPI = async (id) => {
  try {
    const res = await axiosClient.get(`${route}/balance/${id}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error getting balance by id.`);
  }
};

export const getRevenueById = async (id) => {
  try {
    const res = await axiosClient.get(`${route}/ganancia/${id}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error getting revenue by id.`);
  }
};
