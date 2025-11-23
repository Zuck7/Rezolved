// src/datasource/api-event.js

import { API_BASE } from "./api-user.js";

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// LIST all events
export const listEvents = async (token) => {
  const res = await fetch(`${API_BASE}/events`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return res.json();
};

// CREATE event
export const createEvent = async (event, token) => {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(event),
  });
  return res.json();
};

// READ a single event
export const readEvent = async (id, token) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return res.json();
};

// UPDATE event
export const updateEvent = async (id, updates, token) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
  return res.json();
};

// DELETE event
export const deleteEvent = async (id, token) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
};
