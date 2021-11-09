const router = require('express').Router();
const { User, Post, Comment, Likes } = require('../../models');

// Get all users for mainpage
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((userInfo) => res.json(userInfo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user for profile page
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  })
    .then((userInfo) => {
      if (!userInfo) {
        res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(userInfo);
    })
    .catch((err) => {
      console.log('Opps! ' + err);
      res.status(500).json(err);
    });
});

// Create User
router.post('/', (req, res) => {
  console.log(req.body.username);
  // Expected input {username: 'Samadams', email: 'samadams412@gmail.com', twitter: 'samadams', password: 'testpassword123'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    twitter: req.body.twitter,
    interestOne: req.body.interestOne,
    interestTwo: req.body.interestTwo,
    interestThree: req.body.interestThree,
    interestFour: req.body.interestFour,
    interestFive: req.body.interestFive,
    password: req.body.password,
  })
    .then((dbUserData) => {
      console.log(dbUserData);
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// User login
router.post('/login', (req, res) => {
  // Expected input {email: 'samadams412@gmail.com', password: 'testpassword123'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that Email' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// User can delete account
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userInfo) => {
      if (!userInfo) {
        res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(userInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
