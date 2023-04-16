import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const user = JSON.parse(localStorage.getItem('persist:root') || null)?.user
const TOKEN = JSON.parse(user || null)?.currentUser?.accessToken || '';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`
  }
});
