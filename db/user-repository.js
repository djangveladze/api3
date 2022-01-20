require('dotenv').config()
const User = require('./model.js')

class UserRepository {
    constructor() {
        this.blockProperties = ['-password', '-salt', '-isDeleted', '-deletedAt', '-createdAt', '-updatedAt']
    }

    async add(userProperties) {
        const newUser = new User(userProperties)
        await newUser.save()
    }

    async deleteUser(nickname) {
        await User.softDelete({ nickname })
    }

    async recoverUser(nickname) {
        const user = await User.findOneAndUpdate({ nickname }, { isDeleted: false })
        return user
    }

    async findUserByNickname(nickname) {
        const user = await User.findOne({
            nickname,
            isDeleted: false
        }).select(this.blockProperties)
        if (user === null) {
            throw new Error("user not exists")
        }
        return user
    }

    async findDeleteUserByNickname(nickname) {
        const user = await User.findOne({
            nickname,
            isDeleted: true
        }).select(this.blockProperties)
        if (user === null) {
            throw new Error("delete user not exists")
        }
        return user
    }

    async getUserUpdateAt(nickname) {
        const user = await User.findOne({ nickname })
        if (user === null) {
            throw new Error("user not exists")
        }
        return user.updatedAt
    }

    async changeUserPassword(nickname, password) {
        await User.findOneAndUpdate({ nickname, isDeleted: false }, { password })
    }

    async changeUserSalt(nickname, salt) {
        await User.findOneAndUpdate({ nickname, isDeleted: false }, { salt })
    }

    async getLimitedUsers(limited, skip) {
        const users = await User.find({ isDeleted: false }).skip(skip).limit(limited).select(this.blockProperties)
        return users
    }

    async getUserPassword(nickname) {
        const user = await User.findOne({ nickname, isDeleted: false })
        if (user === null) throw new Error("user dont exists")
        return user.password
    }

    async getUserSalt(nickname) {
        const user = await User.findOne({ nickname, isDeleted: false })
        if (user === null) throw new Error("user dont exists")
        return user.salt
    }

    async updateUser(nickname, userUpdateProperties) {
        await User.findOneAndUpdate({ nickname, isDeleted: false }, userUpdateProperties)
    }

}

module.exports = UserRepository