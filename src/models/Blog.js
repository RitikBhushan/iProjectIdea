import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    desc: {
        type: String,
        required: true,
        min: 6
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Web Developement',
            'Android Development',
            'Arificial intelligence',
            'Cyber Security',
            'Machine Learning',
            'Java',
            'C/C++'
        ]
    },
    sem: {
        type: String,
        required: true,
        enum: [
            '1st Semester',
            '2nd Semester',
            '3rd Semester',
            '4th Semester',
            '5th Semester',
            '6th Semester',
            '7th Semester',
            '8th Semester',
        ]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, {timestamps: true})

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema)