const BASE_URL = import.meta.env.VITE_API_URL;

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
    console.log(decodedData)
    if (!res.ok) {
      return {
        ok: false,
        data: decodedData,
      };
    }
    return { ok: true, data: decodedData };
  } catch (err) {
    console.log("this one is not server's fault")
    const error = { ok: false, data:{message: err.message} };
    return error;
  }
}
export default apiRequest