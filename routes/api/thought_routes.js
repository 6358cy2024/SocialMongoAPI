const router = require('express').Router();
const thought_controller = require('../../controllers/thought_controller');

//GET all
router.get('/thoughts', thought_controller.getAllThoughts)

// GET a single thought by id
router.get('/thought/:thought_id', thought_controller.getSingleThought)

// POST
router.post('/thoughts/:user_id', thought_controller.createThought);

//PUT to update a thought
router.put('/thought/:thought_id', thought_controller.updateThought)

//DELETE
router.delete('/thought/:thought_id', thought_controller.deleteThought)

// /api/thoughts/:thoughtId/reactions
//router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
//router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;