
class User{
    constructor(username,email,password,cart ={}){
        this.username = username;
        this.email = email;
        this.password = password;
        this.cart = cart
    }
}

module.exports = User;