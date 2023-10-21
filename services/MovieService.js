const MovieRepository = require('../repositories/MovieRepository.js');

class MovieService {
    static all(limit, offset) {
        return MovieRepository.get(limit, offset);
    }

    static findOne(id) {
        return MovieRepository.getById(id);
    }

    static create(obj) {
        return MovieRepository.post(obj);
    }

    static update(id, obj) {
        return MovieRepository.put(id, obj);
    }

    static updatePhoto(id, photo) {
        return MovieRepository.putPhoto(id, photo);
    }

    static destroy(id) {
        return MovieRepository.delete(id);
    }
}

module.exports = MovieService;