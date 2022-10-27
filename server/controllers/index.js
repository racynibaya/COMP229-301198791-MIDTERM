export const DisplayHomePage = function (req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
};
