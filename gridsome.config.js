module.exports = {
  siteName: 'Plantas',
  siteDescription: '',
  siteUrl: 'https://gridsome-starter-bleda.netlify.com',
  titleTemplate: `Plantas`,
  icon: 'src/favicon-96x96.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: [ 'nofollow', 'noopener', 'noreferrer' ],
      plugins: [
        [
          'gridsome-plugin-remark-shiki',
          {
            theme: 'min-light'
          }
        ]
      ]
    }
  },

  plugins: [
    {
      use: '@zefman/gridsome-source-instagram',
      options: {
        username: 'plantas_plants', // Instagram username
        typeName: 'InstagramPhoto' // The GraphQL type you want the photos to be added under. Defaults to InstagramPhoto
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          },
          author: {
            typeName: 'Author',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-135446199-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000 // default
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'plantas plants',
          feed_url: '',
          site_url: ''
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.description,
          url: 'https://gridsome-starter-bleda.netlify.com' + node.path,
          author: node.author,
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'feed.xml'
        }
      }
    }
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id'
  },

  chainWebpack: (config) => {
    config.module.rule('css').oneOf('normal').use('postcss-loader').tap((options) => {
      options.plugins.unshift(...[ require('postcss-import'), require('postcss-nested'), require('tailwindcss') ]);

      if (process.env.NODE_ENV === 'production') {
        options.plugins.push(
          ...[
            require('@fullhuman/postcss-purgecss')({
              content: [ 'src/assets/**/*.css', 'src/**/*.vue', 'src/**/*.js' ],
              defaultExtractor: (content) => content.match(/[\w-/:%]+(?<!:)/g) || [],
              whitelistPatterns: [ /shiki/ ]
            })
          ]
        );
      }

      return options;
    });
  }
};
