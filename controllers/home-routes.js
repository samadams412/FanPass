const router = require('express').Router();
const sequelize = require('../config/connection');
const {
  User,
  Post,
  Comment,
  Likes,
  Interests,
  UserInterests,
} = require('../models');


router.get('/', (req, res) => {
	res.render('layouts/homepage');
});
// router.get("/", (req, res) => {
//     console.log(req.session);
//     Post.findAll({
//       attributes: ["id", "title", "created_at", "post_content"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["username", "twitter"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["username", "twitter"],
//         },
//       ],
//     })
//       .then((dbPostData) => {
//         const posts = dbPostData.map((post) => post.get({ plain: true }));
//         res.render("layouts/homepage", {
//           posts,
//           loggedIn: req.session.loggedIn,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

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

// // Route to signup page
// router.get('/sign-up', (req, res) => {
//   res.render('sign-up');
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('sign-up');
});

module.exports = router;
