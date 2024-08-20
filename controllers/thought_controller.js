const { User, Thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const user = await User.findById(req.params.user_id);
        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            createdAt: req.body.createdAt,
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
        const thoughts = await Thought.find().populate({
            path: 'username',
            select: 'email -_is -username'
        });
        res.json(thoughts)
    },
    async getSingleThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        res.json(thought);
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thought_id, req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({
                message: 'Thought Updated',
                thought: updatedThought
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating thought', error: error.message });
        }
    },
    async deleteThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);
        await thought.deleteOne();

        res.json({
            message: 'Thought Removed'
        })
    }
}