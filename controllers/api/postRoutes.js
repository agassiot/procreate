const router = require('express').Router();
const { Tree, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    let newFam = await Tree.create({
     name: req.body.newname,
     nameX: req.body.nameX,
     nameY: req.body.nameY,
     famId: req.body.famId,
     user_id: req.session.user_id 
    });

    res.status(200).json(newFam);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const treeData = await Tree.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!treeData) {
      res.status(404).json({ message: 'No family found with this id!' });
      return;
    }

    res.status(200).json(treeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
