import path from 'path';
import webpack, {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import dotenv from 'dotenv';

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      exportGlobals: true,
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      context: path.resolve(__dirname, 'src'),
      hashPrefix: 'my-custom-hash'
    }
  }
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true
  }
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => []
  }
};

const config = dotenv.config().parsed;
const configKeys = Object.keys(config).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(config[next]);
  return prev;
}, {});

const webpackConfig = (env): Configuration => ({
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      components: path.resolve(__dirname, './src/components/')
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /dist/
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', CSSLoader, postCSSLoader, 'sass-loader']
      },
      {
        test: /\.module\.scss$/,
        use: ['style-loader', CSSModuleLoader, postCSSLoader, 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
      'process.env.NAME': JSON.stringify(require('./package.json').name),
      'process.env.VERSION': JSON.stringify(require('./package.json').version),
      ...configKeys
    }),
    new ForkTsCheckerWebpackPlugin({eslint: true})
  ]
});

export default webpackConfig;
