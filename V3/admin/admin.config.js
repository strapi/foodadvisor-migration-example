module.exports = (config, webpack) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      CLIENT_URL: JSON.stringify(process.env.CLIENT_URL),
      CLIENT_PREVIEW_SECRET: JSON.stringify(process.env.CLIENT_PREVIEW_SECRET),
    })
  );
  return config;
};
