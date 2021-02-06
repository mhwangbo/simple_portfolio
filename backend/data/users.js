const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Mi Hwangbo',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    }
]

module.exports = users