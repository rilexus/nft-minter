//eslint-disable-next-line
const path = require("path");
//eslint-disable-next-line
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
//eslint-disable-next-line
const HtmlWebpackPlugin = require("html-webpack-plugin");
//eslint-disable-next-line
const { EnvironmentPlugin, ProvidePlugin } = require("webpack");
//eslint-disable-next-line
require("dotenv").config({ path: "../../.env" });

const BUILD_FOLDER = "dist";

const getENV = () => {
  return Object.entries(process.env).reduce((e, [key, value]) => {
    if (key.startsWith("ENV_")) {
      const k = key.split("ENV_")[1];
      return {
        ...e,
        [k]: value,
      };
    }
    return e;
  }, {});
};

module.exports = ({ development, production }) => {
  const mode = development ? "development" : "production";

  const env = getENV();
  console.log("ENV");
  console.log("========");
  console.log(env);
  console.log("MODE:");
  console.log("========");
  console.log(mode);
  return {
    entry: ["@babel/polyfill", "./src/index.tsx"],
    mode,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
      ],
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser"),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        crypto: require.resolve("crypto-browserify"),
        assert: require.resolve("assert/"),
      },
      alias: {
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@hooks/": path.resolve(__dirname, "src/hooks/"),
        "@env": path.resolve(__dirname, "src/env.ts"),
        "@libs": path.resolve(__dirname, "src/libs"),
        "@libs/": path.resolve(__dirname, "src/libs/"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@utils/": path.resolve(__dirname, "src/utils/"),
        "@components": path.resolve(__dirname, "src/components"),
        "@components/": path.resolve(__dirname, "src/components/"),
        "@icons": path.resolve(__dirname, "src/icons"),
        "@icons/": path.resolve(__dirname, "src/icons/"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, BUILD_FOLDER),
      filename: "bundle.js",
    },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      static: {
        directory: path.join(__dirname, "public"),
      },
      open: true,
      historyApiFallback: true,
      compress: true,
      hot: true,
      port: 3000,
    },

    plugins: [
      new ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new ProvidePlugin({
        process: "process/browser",
      }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new EnvironmentPlugin(env),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*",
        },
      }),
    ],
  };
};
