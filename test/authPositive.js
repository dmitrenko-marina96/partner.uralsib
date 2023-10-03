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

        'Log in': function(browser) {  
        browser
            .setValue('#inputEmail', 'testural@test.ru')
            .setValue('#inputPassword', '123456q!') 
            .click('button[type="submit"]') 

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .verify.urlContains('https://partner.pravocard.ru/profile/') // тест упадет, т.к. цифры /profile/?1694694217 все время разные
            .assert.titleContains('Тест Уралсиб (для автотестов)', 'title ok')
            .assert.textContains("h2", "Тест Уралсиб (для автотестов)"); 
        },
};   