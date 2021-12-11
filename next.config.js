const { remarkCodeHike } = require('@code-hike/mdx');
const theme = require('./src/editorTheme.json');

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: { esmExternals: true },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [[remarkCodeHike, { theme }]],
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/games/:id/step',
        destination: '/games/:id',
        permanent: true,
      },
    ];
  },
};
