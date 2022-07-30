import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
// import reportWebVitals from './reportWebVitals';

// 将web存储中user的数据存到内存
const user = storageUtils.getUser()
memoryUtils.user = user

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
