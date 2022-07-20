module.exports = {
  title: 'Sass',
  description: 'Sass 笔记',
  themeConfig: {
    searchMaxSuggestions: 5,
    nextLinks: true,
    prevLinks: true,
    sidebar: [
      '/',
      '/syntax',
      '/nest',
      '/variable',
      '/data-type',
      '/operator',
      {
        path: '/module',
        title: '模块化',
        children: [
          '/module/@use',
          '/module/@forward',
          '/module/@import',
          '/module/comparison'
        ]
      },
      {
        title: '代码复用',
        children: [
          '/reuse/@mixin',
          '/reuse/@extend',
          '/reuse/@function',
          '/reuse/comparison',
        ]
      },
      '/flow-control',
      {
        title: '其它@rules',
        children: [
          '/@rules/output',
          '/@rules/@at-root',
          '/@rules/css'
        ]
      },
      
    ]
  },
}