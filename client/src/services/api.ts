import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// get the response data and wait 3 seconds before returning - DEBUG purposes + disable Query caching
// api.interceptors.response.use(response => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(response);
//     }, 1500);
//   });
// })

export default api;