import axios, { AxiosResponse } from 'axios';


const DEFAULT_API = '/api';//本地
// const DEFAULT_API = 'http://www.acg-home.cn/api';//线上(可以不换)
const axiosRequest = axios.create({
  baseURL: `${DEFAULT_API}`, // 设置请求的基本URL
  timeout: 5000, // 设置请求超时时间
});

// 添加响应拦截器
axiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    // 在这里处理错误
    console.error('Error:', error);

    // 返回一个包含错误信息的对象
    return Promise.reject("服务器异常，请稍后重试或联系站长!");
  }
);


export {
  axiosRequest, DEFAULT_API
};