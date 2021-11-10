const router = require('express').Router();
const { User, Post, Comment, Likes } = require('../../models');
const withAuth = require('../../utils/auth');
// Get all users for mainpage
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
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
        attributes: ['id', 'title', 'post_content', 'created_at'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
            model: Post,
            attributes: ["title"],
        }
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create User
router.post('/', (req, res) => {
  console.log(req.body.username, req.body.email, req.body.twitter);
  // Expected input {username: 'Samadams', email: 'samadams412@gmail.com', twitter: 'samadams', password: 'testpassword123'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    twitter: req.body.twitter,
    password: req.body.password,
    interestOne: req.body.interestOne,
    interestTwo: req.body.interestTwo,
    interestThree: req.body.interestThree,
    interestFour: req.body.interestFour,
    interestFive: req.body.interestFive,
  })
    .then((dbUserData) => {
      console.log(dbUserData);
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.twitter = dbUserData.twitter;
        req.session.interestOne = dbUserData.interestOne;
        req.session.interestTwo = dbUserData.interestTwo;
        req.session.interestThree = dbUserData.interestThree;
        req.session.interestFour = dbUserData.interestFour;
        req.session.interestFive = dbUserData.interestFive;
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
      req.session.email = dbUserData.email;
      req.session.twitter = dbUserData.twitter;
      req.session.interestOne = dbUserData.interestOne;
      req.session.interestTwo = dbUserData.interestTwo;
      req.session.interestThree = dbUserData.interestThree;
      req.session.interestFour = dbUserData.interestFour;
      req.session.interestFive = dbUserData.interestFive;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'Logged In!' });
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

router.put("/:id", withAuth, (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// User can delete account
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
