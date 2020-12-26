require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    siteTitle: 'Konrad Alfaro',
    siteTitleAlt: `Blog by Konrad Alfaro`,
    siteDescription: 'Software Engineer and PHP Developer',
    siteUrl: 'https://radnok.com',
    siteHeadline: '',
    siteImage: '/site-image.jpg',
    siteLanguage: 'en',
    author: 'Konrad Alfaro',
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        blogPath: '/posts',
        navigation: [
          {
            title: `Blog`,
            slug: `/posts`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/RadnoK`,
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/RadnoK_`,
          },
          {
            name: `Hire me!`,
            url: `https://apprife.com`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Konrad Alfaro`,
        short_name: `konrad-alfaro`,
        description: `Software Engineer and PHP Developer`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `konrad-alfaro-blog`
      }
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
