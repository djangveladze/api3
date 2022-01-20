const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    deleteAt: {
        type: Date
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })
UserSchema.plugin(softDeletePlugin)
const User = mongoose.model('UserManagementAuth', UserSchema)
module.exports = User