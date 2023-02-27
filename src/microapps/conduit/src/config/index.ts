/* 
环境变量封装
 */
const env = "development";
const EnvConfig = {
  development: {
    baseApi: "https://conduit.productionready.io/api",
  },
};
export default {
  namespace: "conduit",
  env: "development",
  ...EnvConfig[env],
};
