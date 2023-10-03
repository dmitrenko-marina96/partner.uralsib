module.exports = {
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .page.auth()
            .navigate()
        browser   
            .waitForElementVisible('#ajax-register-form')       
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация") 
    }, 

    after(browser) {  
      browser.end();  
    },
   
   'Login': function(browser) {  
        browser
            .page.auth()
            .login('testural@test.ru', '123456q!')
            .waitForElementVisible('body', 'Заголовок загружен')
            .verify.urlContains('https://partner.pravocard.ru/profile/') 
            .assert.titleContains('Тест Уралсиб (для автотестов)', 'title ok')
            .assert.textContains("h2", "Тест Уралсиб (для автотестов)")
    },

     'Logout': function(browser) {
        browser
            .click('#dropdownAlerts > .bi-chevron-down')
            .click('li:nth-child(2) > .dropdown-item')


        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/login/9550655/')
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация")
            .expect.element('#ajax-register-form').to.be.visible
       
        browser.expect.element('.bg-navbar').to.be.visible
    }    
};    