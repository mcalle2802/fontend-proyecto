const API_URL = import.meta.env.PUBLIC_API_URL;

// Función base para llamadas al backend
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`API Error: ${res.status} ${message}`);
  }

  return res.json();
}

// Guardar token luego del login
export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
