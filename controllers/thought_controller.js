const { User, Thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const user = await User.findById(req.params.user_id);
        const newThought = await Thought.create({//Thought Body
            thoughtText: req.body.thoughtText,
            username: user.username
        })
        user.thoughts.push(newThought._id);
        await user.save();

        res.json({
            message: 'Thought Created',
            thought: newThought
        })
    },
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find().populate({//don't include id and username
            path: 'username',
            select: 'email -_id -username'
        });
        res.json(thoughts)
    },
    async getSingleThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);//simple findById

        res.json(thought);
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thought_id, req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });//error message
            }
            res.json({
                message: 'Changes Made',
                thought: updatedThought
            });
        } catch (error) {
            res.status(500).json({ message: 'Unable to make changes', error: error.message });
        }
    },
    async deleteThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);//same find by, just for a different purpose
        await thought.deleteOne();

        res.json({
            message: 'Thought Removed'
        })
    },

    //Reaction section

    async createReaction(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        thought.reactions.push(req.body);//push the reaction to the thought
        await thought.save();
        res.json(thought);//then call the new thought including the reaction now
    },

    //async deleteReaction(req, res)

}