import axios from "axios";

const API_URL = "http://localhost:5000/health-records";

// Get specific health record based on id
export const getHealthRecord = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Create a new health record
export const createHealthRecord = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Update an existing health record
export const updateHealthRecord = async (id: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete an existing health record
export const deleteHealthRecord = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
