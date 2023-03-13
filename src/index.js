import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
// import reportWebVitals from './reportWebVitals';

// 将web存储中user的数据存到内存
const user = storageUtils.getUser()
memoryUtils.user = user

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

// // ---首屏加载
// function listen() {
//   if (document.readyState == 'complete') { // 资源加载完成
//     root.render(
//       // <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//       // </React.StrictMode>
//     );
//   } else { // 资源加载中
//     root.render(
//       <h1>loading...</h1>
//     );
//   }
// }
// document.onreadystatechange = listen

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
