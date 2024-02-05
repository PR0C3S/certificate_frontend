import { axiosClient } from "../utils/Axios";

const route = "/certificado";

export const createCertificate = async (certificate) => {
  try {
    const { res } = axiosClient.post(`${route}/request`, certificate);
    const { data } = await res.json();
    return data;
  } catch {
    console.error(`Error creating certificate.`);
  }
};

export const listCertificate = async () => {
  try {
    const { res } = axiosClient.get(`${route}/list`);
    const { data } = await res.json();
    return data;
  } catch {
    console.error(`Error getting certificate list.`);
  }
};
