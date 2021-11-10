const withAuth = (req, res, next) => {
  //verify that user is logged in 
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
  