const router = require('express').Router();
const  { User, Tree }  = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try{
  if (!req.session.logged_in) return res.redirect('/login')
  let userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Tree }],
  });

    let user = userData.get({ plain: true });

    let data = await Tree.findAll({
      where: {
        user_id:user.id
      }
    });

    let trees = data.map((tree) => tree.get({plain: true}));

    res.render('profile', {
      ...user, 
      trees, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




/* router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Tree }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/login', (req, res) => {
  if (req.session.logged_in) return res.redirect('/');
  
  res.render('login');
});

module.exports = router;
