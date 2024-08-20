const { User, Thought } = require('../models');

module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json({
                user: user
            })
        } catch (error) {
            console.log('register error', error);
            if (error.code === 11000) {//11000 means that this is a repeated value and cannot used for another account
                res.status(403).json({
                    message: 'This email is already used'
                })
            }
        }
    },

    async loginUser(req, res) {
        const user = await User.findOne({
            email: req.body.email//email field
        });

        if (!user) {
            return res.status(403).json({
                message: 'Email is not associated with an account'
            });
        }

        res.json({
            user: user
        })
    },
    
    async getSingleUser(req, res) {
        const user = await User.findById(req.params.user_id).populate('thoughts');
        res.json(user);
    },

    async getAllUsers(req, res) {
        const users = await User.find().populate('thoughts');
        res.json(users);
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.user_id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            console.log('updateUser error', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async deleteUser(req, res) {
        const user = await User.findById(req.params.user_id);
        await user.deleteOne();
        res.json({
            message: 'user deleted'
        });
    }
}