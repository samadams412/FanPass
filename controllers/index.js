const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', { text: 'testing render to homepage' });
});

module.exports = router;
