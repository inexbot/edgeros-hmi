import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/teach', component: '@/pages/teach/index' },
    { path: '/teach/jog', component: '@/pages/teach/jog' },
  ],
  fastRefresh: {},
  mfsu: {},
  outputPath: '../server/public',
  hash: true,
  dva: {
    immer: true,
    hmr: false,
  },
});
