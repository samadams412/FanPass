const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// get all users for user-feed page
router.get('/', (req, res) => {
  User.findAll({})
    .then((userData) => {
      const users = userData.map((user) => user.get({ plain: true }));
      console.log(users);
      res.render('user-feed', {
        users,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user and route to profile
router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      const user = userData.get({ plain: true });

      res.render('user-profile', {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;