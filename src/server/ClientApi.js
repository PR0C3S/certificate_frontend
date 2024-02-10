import { axiosClient } from "../utils/Axios";

const route = "/cliente";

export const getByDniAPI = async (dni) => {
  try {
    const res = await axiosClient.get(`${route}/findByDni/${dni}`);
    const data = await res.data;
    return data; // Validation passed
  } catch {
    console.error(`Error searching client by DNI.`);
  }
};

export const checkEmailAPI = async (email) => {
  try {
    const res = await axiosClient.get(`${route}/findByEmail/${email}}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error searching client by email.`);
  }
};

export const createClientApi = async (user) => {
  try {
    const res = await axiosClient.post(`${route}/created`, user);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error creating client.`);
  }
};

export const updateClientAPI = async (object) => {
  try {
    const res = await axiosClient.patch(
      `${route}/update/${object.id}`,
      object.body
    );
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error updating client.`);
  }
};

export const getClientByIdAPI = async (id) => {
  try {
    const res = await axiosClient.get(`${route}/update/${id}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error getting client by id.`);
  }
};

export const listClientsAPI = async () => {
  try {
    const res = await axiosClient.get(`${route}/list`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.error(`Error getting user list.`);
  }
};
