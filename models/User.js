function createUser(email, password) {
    var user = {
        _id : null, 
        email : email,
        password : password,
        date : new Date()
    }
    return user;
}

module.exports = { createUser };