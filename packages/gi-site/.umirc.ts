import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
  base: '/',
  publicPath: '/',
  hash: true,
  history: {
    type: 'hash',
  },
  routes: [
    { exact: true, path: '/', component: 'Home' },
    { exact: true, path: '/workspace', component: 'Workspace' },
    { exact: true, path: '/workspace/:projectId', component: 'Analysis' },
    { exact: true, path: '/market', component: 'Components' },
  ],
  antd: {
    dark: false,
    compact: false,
  },
  chainWebpack(config: any) {
    config.plugin('monaco-editor').use(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'json'],
      }),
    );
  },
  nodeModulesTransform: {
    type: 'none',
  },
};