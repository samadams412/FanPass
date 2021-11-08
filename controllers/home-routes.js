const router = require('express').Router();
const sequelize = require('../config/connection');
const {
  User,
  // Post,
  // Comment,
  // Likes,
  Interests,
  UserInterests,
} = require('../models');

// Render login page
router.get('/', (req, res) => {
  res.render('layouts/homepage');
});

// Get all users for user feed page
router.get('/users', (req, res) => {
  UserInterests.findAll({
    attributes: ['id', 'user_id', 'interest_id'],
    include: [
      {
        // include users interests
        model: Interests,
        attributes: ['Interest_Category'],
      },
      {
        model: UserInterests,
        attributes: ['Interest_Category'],
      },
    ],
  })
    .then((userData) => {
      const users = userData.map((user) => user.get({ plain: true }));
      console.log(users);
      res.render('user-feed', {
        users,
        loggedIn: req.session.loggedIn,
      });
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to signup page
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

module.exports = router;
