import axios, { AxiosResponse } from "axios";
import { store } from "../redux/store";
import { ChatMessages } from "./models/Message";
import { UserDetails } from "./models/UserDetails";
import { UserLogin } from "./models/UserLogin";
import { UserRegister } from "./models/UserRegister";

axios.defaults.baseURL = "http://localhost:5286/api";

axios.interceptors.request.use((config) => {
  const { user } = store.getState();
  const { token } = user;

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
};

const Account = {
  current: () => requests.get<UserDetails>("/User"),
  login: (user: UserLogin) => requests.post<UserDetails>("/User/login", user),
  register: (user: UserRegister) =>
    requests.post<UserDetails>("/User/register", user),
};

const Messages = {
    newChat: (friendId: string) => requests.get<ChatMessages>(`/chat/${friendId}`)
}


const agent = {
    Account,
    Messages
}

export default agent;
