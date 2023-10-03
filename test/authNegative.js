module.exports = {
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .url('https://partner.pravocard.ru/login/9550655/')
            .waitForElementVisible('#ajax-register-form');       
        browser
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация"); 

    }, 

    after(browser) {  
      browser.end();  
    },

         'Не вводить логин': function(browser) {
        browser
            //.setValue('#inputEmail', 'testural@test.ru')
            .setValue('#inputPassword', '123456q!') 
            .click('button[type="submit"]')

        browser
            .waitForElementVisible('#ajax-register-form')  
            .assert.urlContains('https://partner.pravocard.ru/login/9550655/')    
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация")     
    },

    'Не вводить пароль': function(browser) {  
        browser
            .setValue('#inputEmail', 'testural@test.ru')
            .clearValue('#inputPassword') 
            .click('button[type="submit"]') 

        browser
            .waitForElementVisible('#ajax-register-form')  
            .assert.urlContains('https://partner.pravocard.ru/login/9550655/')    
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация") 
    },
    
    'Ввести неверный пароль': function(browser) {
        browser
            //.setValue('#inputEmail', 'testural@test.ru')
            .setValue('#inputPassword', '1234')
            .click('button[type="submit"]')

        browser.expect.element('#ajax-register-form > div.auth-error.text-danger').to.be.visible // ошибка, т.к. пароль неверный 
        browser.expect.element('#ajax-register-form > div.auth-error.text-danger').text.to.equal('Неверный пароль')    
    }    
};     