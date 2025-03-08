import axios from "axios";

const API_URL = "http://localhost:5000/health-records";

export const fetchPartialRecord = async () => {
  try {
    const response = await axios.get(`${API_URL}/partial-record`);
    return response.data;
  } catch (error) {
    console.error("Error fetching partial record data: ", error);
    return null;
  }
};
