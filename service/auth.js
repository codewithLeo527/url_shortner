const sessionIdToUsermap = new Map();

function setUser(id, user){
    sessionIdToUsermap.set(id, user);
}

function getUser(id){
    return sessionIdToUsermap.get(id);
}

module.exports = {
    getUser,
    setUser
}