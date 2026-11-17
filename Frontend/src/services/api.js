const BASE_URL = import.meta.env.VITE_API_URL;
async function fetchData(method, data, endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...(method !== "GET" && { body: JSON.stringify(data) }),
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.log("internal server error");
    return {
      success: false,
      statusCode: 500,
      message: "network error",
    };
  }
}
async function apiRequest(method, data, endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...(method !== "GET" && { body: JSON.stringify(data) }),
    });
    const decodedData = await res.json();
    if (!res.ok) {
      return {
        ok: false,
        data: decodedData,
      };
    }
    return { ok: true, data: decodedData };
  } catch (err) {
    console.log("internal server error");
    const error = { ok: false, data: { message: "internal server error" } };
    return error;
  }
}
export default apiRequest;
