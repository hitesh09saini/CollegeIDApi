const { Schema, model } = require('mongoose');

const StudentIdSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    follower: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            unique: true, // Corrected spelling
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    avatar: {
        public_id: String,
        secure_url: String,
    },
    colleges: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'College',
            },
            branch: {
                type: String,
                required: true,
            },
            semester: {
                type: String,
                required: true,
            },
        },
    ],
    bio: {
        type: String,
        maxLength: [500, 'Bio must be less than 500 characters'],
    },
    goal: {
        type: String,
    },
    links: [
        {
            name: {
                type: String,
                required: true, // Added required validation
            },
            link: {
                type: String,
                validate: {
                    validator: (value) => {
                        console.log("Link value before validation:", value);
                        return /^https?:\/\/\S+$/i.test(value)
                    },
                    message: 'Please provide a valid URL for the link.',
                },
            },
        },
    ],
    relationship: {
        type: String,
        enum: ['Single', 'Mingle'],
        default: 'Single',
    },
    style: {
        BorderStyle: {
            type: String,
        },
        themeStyle: {
            type: String,
        },
        BoxStyle: {
            type: String,
        },
        fontStyle: {
            type: String,
        }
    },
    posts: {
        type: Schema.Types.ObjectId, // Corrected property name
        ref: 'Post'
    }
}, {
    timestamps: true,
});

const Student = model('Student', StudentIdSchema);

module.exports = Student;
