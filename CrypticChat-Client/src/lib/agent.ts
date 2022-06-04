import { createReducer } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { getToken } from "../redux/slices/userSlice";
import { UserDetails } from "./models/UserDetails";
import { UserLogin } from "./models/UserLogin";
import { UserRegister } from "./models/UserRegister";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}


axios.defaults.baseURL = "http://localhost:5000/api";


axios.interceptors.request.use(config => {

})



axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
});


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get:    <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:   <T> (url: string, body:{}) => axios.post<T>(url,body).then(responseBody)
}

const Account = {
    current:    () => requests.get<UserDetails>('Users/checkuser'),
    login:      (user: UserLogin) => requests.post<UserDetails>('/Users/login', user),
    register:   (user: UserRegister) => requests.post<UserDetails>('/Users/register', user)
}

const agent = {
    Account
}

export default agent;