import axios from "axios";

import { HealthRecordType } from "@/types/healthRecordTypes";

const API_URL = "http://localhost:5000/health-records";

export const getHealthRecord = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching health record:", error);
    throw error;
  }
};

export const getAllHealthRecords = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching health records:", error);
    throw error;
  }
};

export const createHealthRecord = async (data: HealthRecordType) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating health record:", error);
    throw error;
  }
};

export const updateHealthRecord = async (id: number, data: HealthRecordType) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating health record:", error);
    throw error;
  }
};

export const deleteHealthRecord = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting health record:", error);
    throw error;
  }
};

export default {
  getHealthRecord,
  getAllHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
};
