var express = require('express');
var router = express.Router();
var User = require('../models/user');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try
  {
    const user = await User.findOne({email: req.body.email});
    if (user === null)
    {
      res.json({result: false, error: "Identifiant incorect"})
    }
    else
    {
      if (bcrypt.compareSync(req.body.password, user.password))
      {
        const token = uid2(32);
        user.token = token;
        await user.save();
        res.json({result: true, token:token});
      }

      else
      {
        res.json({result: false, error: "Mot de passe incorect"})
      }
    }
  }
  catch (error) {
    res.json({result: false, error: error.message});
  }
});

router.post('/signin', async (req, res) => {
  try
  {
    const result = (await User.find({email: req.body.email})).length === 0;

    if (result)
    {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const token = uid2(32);

      const new_user = new User({
        email: req.body.email,
        password: hash,
        token: token,
      });
      await new_user.save();
      res.json({result: true, token: token});
    }
    else
    {
      res.json({result: false, error: "Identifiant déjà existant"});
    }
  }
  catch (error)
  {
    res.json({result: false, error: error.message});
  }
  
});

module.exports = router;
