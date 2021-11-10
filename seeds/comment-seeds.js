const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: "?????",
  },
  {
    user_id: 4,
    post_id: 3,
    comment_text: "Nice Job!",
  },
  {
    user_id: 1,
    post_id: 3,
    comment_text: "Awesome, nice job guys!",
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: "Could be better",
  },
  {
    user_id: 2,
    post_id: 4,
    comment_text: "Well done!",
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: "Pretty cool!",
  },
  {
    user_id: 4,
    post_id: 3,
    comment_text: "Cant wait for the update.",
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "About time!",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
