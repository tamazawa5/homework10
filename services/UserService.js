const UserRepository = require('../repositories/UserRepository.js');

class UserService {
    static all(limit, page) {
        return UserRepository.get(limit, page);
    }

    static findOne(id) {
        return UserRepository.getById(id);
    }

    static findEmail(email) {
        return UserRepository.getByEmail(email);
    }

    static register(obj) {
        return UserRepository.post(obj);
    }

    static update(id, obj) {
        return UserRepository.put(id, obj);
    }

    static destroy(id) {
        return UserRepository.delete(id);
    }
}

module.exports = UserService;