// SigninController.js
const API_URL = "http://localhost:8000/api/token/"; // Replace with your server's URL

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.access) {
      localStorage.setItem("token", data.access);
      return data;
    } else {
      throw new Error("Error obtaining token:", data);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
