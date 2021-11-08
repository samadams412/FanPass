const Comment = require('./Comment');

const Follow = require('./Follow');
const Likes = require('./Likes');
const Post = require('./Post');

const User = require('./User');

//******USER RELATIONS**********/

// User can create many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
});

// Create assosciation between User and their Post
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// User can comment on many posts
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// Create assosciation between User and their comment
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// User can Like each Post
User.hasMany(Likes, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// Create assosciation between User and their Like
Likes.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// User can Follow many
User.hasMany(Follow, {
  foreignKey: 'user_id',
  as: 'Followed ',
  onDelete: 'cascade',
});

Follow.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

User.hasMany(Follow, {
  foreignKey: 'follower_id',
  as: 'follower ',
  onDelete: 'cascade',
});

Follow.belongsTo(User, {
  foreignKey: 'follower_id',
  onDelete: 'cascade',
});

// Create assosciation between Follower and User
Follow.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

//******POST RELATIONS**********/

// A Post can have many likes
Post.hasMany(Likes, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// Create assosciation between Post and Likes
Likes.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

// A Post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

//******COMMENTS RELATIONS**********/
// Create assosciation between Comment and Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

module.exports = { User, Post, Likes, Comment, Follow };
