const router = require('express').Router();
const user_controller = require('../../controllers/user_controller');

//POST a new user
router.post('/register', user_controller.registerUser);

// Login a User
router.post('/login', user_controller.loginUser);

//GET all
router.get('/users', user_controller.getAllUsers);

//GET one by Id
router.get('/user/:user_id', user_controller.getSingleUser)

//PUT to update
router.put('/user/:id', user_controller.updateUser)

//DELETE
router.delete('/user/:user_id', user_controller.deleteUser)

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);


module.exports = router;