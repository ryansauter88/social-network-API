const { Schema, model } = require('mongoose');

// regexp for email validation
let re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new Schema(
    {
        username: {    
            type: String, trim: true,
            unique: true,
            required: true
        },
        email: {    
            type: String,
            unique: true,
            required: true,
            match: re,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function () {
    if (this.friends) {return this.friends.length}; // ensures there is an initialized array
});

const User = model('user', userSchema);

module.exports = User;
