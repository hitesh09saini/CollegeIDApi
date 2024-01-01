
const { Schema, model } = require('mongoose')

const CollegeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    location: {
        type: String,
        required: true,
    },

    logo: {
        public_id: String,
        secure_url: String,
    },

    branch: [
        {
            type: String,
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },

    ]
}, {
    timestamps: true
})



const College = model('College', CollegeSchema)
module.exports = College;