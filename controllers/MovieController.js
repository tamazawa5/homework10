const MovieService = require('../services/MovieService.js');

class MovieController {
    static async all(req, res) {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const result = await MovieService.all(limit, (page - 1) * limit);
            res.status(200).json(result.rows);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findOne(req, res) {
        try {
            const { id } = req.params;
            const result = await MovieService.findOne(id);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows);
            } else {
                res.status(404).json({ message: "Movie not Found!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async create(req, res) {
        try {
            const { id, title, genres, year } = req.body;
            const result = await MovieService.create({ id, title, genres, year });
            res.status(200).json({ message: 'Succesfully created movies!' });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, genres, year } = req.body;
            const findOne = await MovieService.findOne(id);
            if (findOne.rows.length > 0) {
                const result = await MovieService.update(id, { title, genres, year });
                res.status(200).json({ message: "Successfully updated movies!" });
            } else {
                res.status(404).json({ message: "Movie not found!" });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updatePhoto(req, res) {
        try {
            const { id } = req.params;
            if (req.file != null) {
                const imgName = req.file.filename;
                const file = `http://localhost:3000/public/upload/${imgName}`;
                const result = await MovieService.updatePhoto(id, file);
                res.status(200).json({ message: "Successfully upload photo!" });
            } else {
                res.status(404).json({ message: "Photo cannot be null!" })
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params;
            const findOne = await MovieService.findOne(id);
            if (findOne.rows.length > 0) {
                const result = await MovieService.destroy(id);
                res.status(200).json({ message: "Succesfully delete movie!" });
            } else {
                res.status(404).json({ message: "Movie not found!" });
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = MovieController;