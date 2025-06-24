import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/feedback'; // Adjust if your base URL differs

// Fetch all feedback
export const fetchFeedback = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
};

// Submit a new feedback
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
