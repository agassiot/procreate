const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    
    let newUserData = await User.create(req.body);
    let newUser = newUserData.get({ plain: true });
    console.log(newUser);
    // create session with values that we will use later: user_name, user id, and logged_in flag
    req.session.save(() => {
      req.session.user_name = req.body.name;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    res.status(200).json(newUserData);
    });
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

// route for logging in users.
router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) return res.status(400).json({ message: 'ivalid user' });

    let checkPass = await userData.passport(req.body.password);

    if (!checkPass) return res.status(400).json({ message: 'invalid user' });
    

    // create session with values that we will use later: user_name, user id, and logged_in flag
    req.session.save(() => {
      req.session.user_name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route.
router.post('/logout', (req, res) => {

  req.session.logged_in ? req.session.destroy(()=> res.status(204).end()) : res.status(404).end()
});

module.exports = router;
