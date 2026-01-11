const API_URL = "http://localhost:5000/api/auth";

export const loginRequest = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return { error: "السيرفر لا يستجيب" };
  }
};

export const registerRequest = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    return { error: "السيرفر لا يستجيب" };
  }
};
