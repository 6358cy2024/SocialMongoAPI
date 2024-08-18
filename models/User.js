const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            allowNull: false
        },
        email: {
            type: String,
            unique: true,
            required: true,
            allowNull:false,
            match: [/.+@.+\..+/, "Must enter a valid email address!"]//proper formatting
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('Users', userSchema);

module.exports = Users;