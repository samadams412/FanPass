const { Post } = require('../models');

const postData = [
  {
    title: 'Testing First TechBlog Post!',
    post_content: 'First Test for TechBlog Post!',
    user_id: 1,
  },
  {
    title: 'Testing Second TechBlog Post!',
    post_content:
      'TechBlog is a great place to learn and share new information and ideas related to all tech.',
    user_id: 2,
  },
  {
    title: 'Testing Third TechBlog Post',
    post_content: '',
    user_id: 2,
  },
  {
    title: 'Testing Fourth TechBlog Post',
    post_content:
      'A CMS-style blog that is most similar to a wordpress site, where developers can make blog posts aswell as comment on others. This site was built from scratch and deployed to Heroku. The app follows an MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.',
    user_id: 5,
  },
  {
    title: 'Release date for new application announced.',
    post_content: 'New application coming soon',
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
