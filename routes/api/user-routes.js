const router = require('express').Router();
const { User } = require('../../models');
 
// impement CRUD actions

// get /api/users
router.get('/', (req, res) => {
    // Access our user model and run .finAll() method)
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route that only returns one user based on its req.params.id value, let's use a variation of the .findAll() method.
// get /api/users/1
router.get('/:id', (req, res) => {
    // findOne is similar to findAll but we only want one peice of data back. we use the where option to indicate where to look. this is similar to SELECT * FROM user WHERE id = 1
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post /api/users
router.post('/', (req, res) => {
    // // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead 
  User.update(req.body, {
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
// The associated SQL syntax would look like the following code: code above
// UPDATE users
// SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
// WHERE id = 1;

// delete /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;