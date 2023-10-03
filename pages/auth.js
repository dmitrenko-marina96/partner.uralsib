const authCommands = {
    login(email, password) {
        this
            .setValue('@inputEmail', email)
            .setValue('@inputPassword', password)
            .click('@btn')
        return this;        
    }  
}

module.exports = {
    url: 'https://partner.pravocard.ru/login/9550655/',
    commands: [authCommands],
    elements: {
        inputEmail: '#inputEmail',
        inputPassword: '#inputPassword',
        btn: 'button[type="submit"]'
    }
} 