/* craco.config.js */
/* 
    对 create-react-app 的默认配置进行自定义，这里我们使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）。
    在项目根目录创建一个 craco.config.js 用于修改默认配置。
*/
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};