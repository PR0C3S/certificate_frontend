import { axiosClient } from "../utils/Axios";

const route = "/cliente";

export const checkDNIAPI = async (dni) => {
  try {
    const res = await axiosClient.get(`${route}/findByDNI/${dni}}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error searching user by DNI.`);
  }
};

export const checkEmailAPI = async (email) => {
  try {
    const res = await axiosClient.get(`${route}/findByEmail/${email}}`);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error searching user by email.`);
  }
};

export const createUserAPI = async (user) => {
  try {
    const res = await axiosClient.post(`${route}/created`, user);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error creating user.`);
  }
};

export const updateUserAPI = async (id, user) => {
  try {
    const res = await axiosClient.patch(`${route}/update/${id}`, user);
    const data = await res.data;
    return data;
  } catch {
    console.error(`Error updating user.`);
  }
};

export const listUserAPI = async () => {
  try {
    const res = await axiosClient.get(`${route}/list`);
    const data = await res.data;
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    console.error(`Error getting user list.`);
  }
};
