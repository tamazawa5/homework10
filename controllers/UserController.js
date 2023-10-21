const UserService = require('../services/UserService.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { key } = require('../secretKey.js');

class UserController {
    static async all(req, res) {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const result = await UserService.all(limit, (page - 1) * limit);
            res.status(200).json(result.rows);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findOne(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.findOne(id);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows);
            } else {
                res.status(400).json({ message: "User not found!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async register(req, res) {
        try {
            const { id, email, gender, password, role } = req.body;
            const findEmail = await UserService.findEmail(email);
            if (findEmail.rows.length > 0) {
                res.json({ message: "Email already registered!" });
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                const result = await UserService.register({ id, email, gender, hashPassword, role });
                res.status(200).json({ message: "Successfully registered!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { email, gender, password, role } = req.body;
            const findOne = await UserService.findOne(id);
            if (findOne.rows.length > 0) {
                const hashPassword = await bcrypt.hash(password, 10);
                const result = await UserService.update(id, { email, gender, hashPassword, role });
                res.status(200).json({ message: "Successfully updated user!" });
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params;
            const findOne = await UserService.findOne(id);
            if (findOne.rows.length > 0) {
                const result = await UserService.destroy(id);
                res.status(200).json({ message: "Successfully deleted user!" });
            } else {
                res.status(404).json({ message: "User not found!" });
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const findEmail = await UserService.findEmail(email);
            if (findEmail.rows.length > 0) {
                const comparePassword = await bcrypt.compare(password, findEmail.rows[0].password);
                if (comparePassword) {
                    const user = {
                        id: findEmail.rows[0].id,
                        email: findEmail.rows[0].email,
                        role: findEmail.rows[0].role
                    }
                    const token = jwt.sign(user, key, { expiresIn: "1h" });
                    res.status(200).json({ ...user, token });
                } else {
                    res.status(401).json({ message: "Wrong password!" });
                }
            } else {
                res.status(401).json({ message: "Email not register!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserController;