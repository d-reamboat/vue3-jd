import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',

})
// instance.interceptors.request.use(config => {
//   return config;
// }, err => {
//   return err;
// })

// instance.interceptors.response.use(res => {
//   return res.data;
// }, err => {
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400:
//         err.message = "请求错误";
//         break;
//       case 401:
//         err.message = "未授权访问";
//         break;
//     }
//   }
//   return err;
// })

const post = (url, data = {}) => {   
  return new Promise((resolve, reject) => {
    instance.post(url, data, {   //post请求接受data
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })

}
const get = (url, params = {}) => {   
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })

}

export {
  instance,
  post,
  get
};

