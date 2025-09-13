// 统一导出一个配置后的axios

import axios  from "axios";

axios.defaults.baseURL = "http://localhost:17818/";

axios.interceptors.request.use(config=>{
    config.headers.Authorization=window.sessionStorage.getItem("token");
    return config;
})

export default axios;