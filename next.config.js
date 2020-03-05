// next.config.js
const withSass = require("@zeit/next-sass");
module.exports = withSass({
 webpack(config) {
   const rules = [{
     test: /\.scss$/,
     use: [
     { loader: "sass-loader" }
  ]}
];
return {
   ...config,
   module: { 
     ...config.module, 
     rules: [...config.module.rules, ...rules] 
   }
  };
}});