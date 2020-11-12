function createUser(username, email, password) {
    var user = {
        _id : null, 
        username : username,
        email : email,
        password : password,
        date : new Date()
    }
    return user;
}

module.exports = { createUser };