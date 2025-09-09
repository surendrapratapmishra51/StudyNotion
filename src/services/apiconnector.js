import axios from "axios";

export const axiosInstance = axios.create({});
export const apiConnector = (method, url, bodyData, headers, params) => {

      console.log("📡 API Request kya hain tere:", { method, url, headers, params, bodyData });


    return axiosInstance({
        method:`${method}`,
        url: `${url}`,
        data:bodyData ? bodyData : null,
        headers:headers ? headers:{},
        params:params ? params:null,
        withCredentials: true
         
    });
}