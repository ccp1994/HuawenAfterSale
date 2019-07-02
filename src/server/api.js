/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';

export const baseApi = 'https://app.fitoneapp.com/merit';
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  let token='';
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        if (0 === res.data.code) {
          this.$message(res.data.msg || '请求异常...');
        }
        ;
        resolve(res.data);
      })
      .catch(err => {
        console.log(err)
        this.$message('响应异常');
        reject(err.data)
      })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  // console.log(params)
  if(undefined===params){
    params=[];
  }
  // params.concat({wxapp_id:10001,sign:'2228aa244438551c61f9c929b9a9e8e0'});
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        if (res.data.code===0) {
          this.$message(res.data.msg || '响应异常');
        }
        ;
        resolve(res.data);
      })
      .catch(err => {
        this.$message('响应异常');
        reject(err.data)
      })
  });
}

