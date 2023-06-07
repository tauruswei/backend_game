const { defineConfig } = require("@vue/cli-service");
const Timestamp = new Date().getTime();
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  css: {
    loaderOptions: {
      scss: {
        //additionalData: `@use "@/element-variables.scss" as *;`,
        additionalData: (content, loaderContext) => {
          // All scss files ending with imports.scss
          // will not re-import additionalData
          const { resourcePath } = loaderContext;
          if (resourcePath.endsWith("element-variables.scss")) return content;
          // prepend import sentence
          return `@import "@/element-variables.scss"; 
            ${content}`;
        },
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto", //element-plus报错Can‘t import the named export ‘ArrowDown‘ from non EcmaScript module
        },
      ],
    },
    // webpack 配置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
    },
    externals: {
      fs: "var fs",
    },
  },
});
