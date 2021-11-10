const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Like } = require('../models');
const withAuth = require("../utils/auth");
// Get all user posts, include comments and likes
router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'post_content', 'user_id', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postInfo) => {
      const posts = postInfo.map((post) => post.get({ plain: true }));
      res.render('user-profile', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/users/:id', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_content', 'user_id', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postInfo) => {
      const posts = postInfo.map((post) => post.get({ plain: true }));
      res.render('user-profile', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user and route to profile page
router.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
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

// Get all user posts, include comments and likes
router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'post_content', 'user_id', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postInfo) => {
      const posts = postInfo.map((post) => post.get({ plain: true }));
      res.render('user-profile', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/user/:id', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_content', 'user_id', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postInfo) => {
      const posts = postInfo.map((post) => post.get({ plain: true }));
      res.render('user-profile', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single user and route them to the user-profile page
router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
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

// Get single Post for editing
router.get('/edit/:id', (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ['id', 'post_content', 'title'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postInfo) => {
      if (postInfo) {
        const post = postInfo.get({ plain: true });

        res.render('edit-post', {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get all of users interests
router.get('/', (req, res) => {
  userInterests
    .findAll({
      where: {
        user_id: req.params.user_id,
      },
      attributes: ['id', 'user_id', 'interest_id'],
    })
    .then((interestsData) => {
      const interests = interestsData.map((interest) =>
        interest.get({ plain: true })
      );
      res.render('user-profile', { interests, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

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

router.get('/profile/edit/:id', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'username',
      'email',
      'twitter',
      'interestOne',
      'interestTwo',
      'interestThree',
      'interestFour',
      'interestFive',
    ],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

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

// export router
module.exports = router;
