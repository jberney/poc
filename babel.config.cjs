module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    plugins: [
      ['babel-plugin-react-compiler', {}],
      api.env('development') ? ['react-refresh/babel'] : null,
    ].filter(Boolean),
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }],
    ],
  };
};
