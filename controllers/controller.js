const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', { text: 'Will is my favorite TA' });
});


module.exports = router;
