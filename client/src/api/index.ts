import axios from "axios";
import { SignInForm, SignUpForm } from "../store/types/auth.types";
import { TODO } from "../store/types/to-do-types";

type Token = {
  token: string;
};

const API = axios.create({
  baseURL: "https://mapi.zapminds.com/v1",
  // baseURL: "http://localhost:8080/v1",
  // baseURL: "https://9b37-2406-7400-98-df77-61dd-533e-fa3d-9f42.ngrok-free.app/",
});

function get_token() {
  const tokenSerial = localStorage.getItem("token");
  const tokenJSON: Token | null = tokenSerial ? JSON.parse(tokenSerial) : {};
  const token = tokenJSON?.token;
  return token;
}

API.interceptors.request.use((req) => {
  const token = get_token();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers["ngrok-skip-browser-warning"] = "true";
  }

  return req;
});

//AUTH
export const google_auth = (token: string) => API.get(`/auth?code=${token}`);

export const sign_in = (form: SignInForm) => API.post(`/auth/login`, form);
export const sign_up = (form: SignUpForm) => API.post(`/auth/register`, form);

//TODO
export const create_todo = (todo: TODO) => API.post(`/todo`, todo);
export const get_todos = (filter: string) =>
  API.get(`/todo?status=${filter || ""}`);
export const update_todo = (id: string, todo: Partial<TODO>) =>
  API.patch(`/todo/${id}`, todo);
export const delete_todo = (id: string) => API.delete(`/todo/${id}`);
