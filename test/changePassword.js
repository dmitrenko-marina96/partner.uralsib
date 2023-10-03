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

    'Переход в редактирование профиля': function(browser) {
        browser.click('.btn-edit')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/profile/edit/')
            .assert.titleContains('Тест Уралсиб (для автотестов)', 'title ok')
            .assert.textContains("h2", "Тест Уралсиб (для автотестов)")
            .expect.element('#form993464').to.be.visible

    // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(2) > legend').text.to.equal('ФИО')
        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(3) > legend').text.to.equal('Email')
        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(4) > legend').text.to.equal('Телефон')
        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(5) > legend').text.to.equal('Пароль')
        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(6) > legend').text.to.equal('Email уведомления')
        browser.expect.element('#form993464 > div.container > div > div > div > div > fieldset:nth-child(7) > legend').text.to.equal('SMS уведомления')     
    },

    'Переход к изменению пароля': function(browser) {
        browser.click('#btn-change-password')

        browser.assert.visible('#popup-form > div > div')
        browser.expect.element('#labelpopup-form').text.to.equal('ИЗМЕНЕНИЕ ПАРОЛЯ')
    },

    'Не вводить старый пароль': function(browser) {
        browser.click('.modal-footer > .btn-default')

        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').to.be.visible // ошибка, т.к. пароль не введен
        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').text.to.equal('Неверный пароль') 
    },

    'Ввести неверный старый пароль': function(browser) {
        browser
            .setValue('input[type="password"]', '1234567')
            .click('.modal-footer > .btn-default')

        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').to.be.visible // ошибка, т.к. пароль неверный
        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').text.to.equal('Неверный пароль') 
    },

    'Ввести верный старый пароль': function(browser) {
        browser
            .setValue('input[type="password"]', '123456q!')
            .click('.modal-footer > .btn-default')
        
        browser
            .assert.visible('#form_password_confirm > div.modal-body > div:nth-child(3) > input') // поле Новый пароль
            .assert.attributeEquals('#form_password_confirm > div.modal-body > div:nth-child(3) > input', 'placeholder', 'Новый пароль')
            .assert.visible('#form_password_confirm > div.modal-body > div:nth-child(4) > input') // поле Подтвердите новый пароль
            .assert.attributeEquals('#form_password_confirm > div.modal-body > div:nth-child(4) > input', 'placeholder', 'Подтвердите новый пароль')
    },

    'Ввести пароль менее 8 символов': function(browser) {
        browser
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input', '1234567')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input', '1234567')
            .click('.modal-footer > .btn-default')

        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').to.be.visible // ошибка, т.к. пароль менее 8 символов
        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').text.to.equal('Пароль менее 8 символов!')           
    },

    'Ввести пароль 8 символов только цифры': function(browser) {
        browser
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input')
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input', '12345678')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input', '12345678')
            .click('.modal-footer > .btn-default')

        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').to.be.visible // ошибка, т.к. пароль не соответствует требованиям
        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').text.to.equal('Пароль не соответствует требованиям!')   
    },

    'Пароли не совпадают': function(browser) {
        browser
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input')
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input', '12345678')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input', '12345677')
            .click('.modal-footer > .btn-default')

        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').to.be.visible // ошибка, т.к. пароли не совпадают 
        browser.expect.element('#form_password_confirm > div.modal-body > div.text-danger.mb-2').text.to.equal('Пароли не совпадают!')    
    },

    'Ввести правильный новый пароль': function(browser) {
        browser
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input')
            .clearValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(3) > input', '123456q!')
            .setValue('#form_password_confirm > div.modal-body > div:nth-child(4) > input', '123456q!')
            .click('.modal-footer > .btn-default')

        browser.assert.visible('#box_password_change > div.modal-body')
        browser.expect.element('#box_password_change > div.modal-body').text.to.equal('Пароль успешно изменен!')   
    },

    'Закрыть попап редактирования': function(browser) {
        browser
            .click('#box_password_change > div.modal-footer > button')
            .refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/profile/edit/')
            .assert.titleContains('Тест Уралсиб (для автотестов)', 'title ok')
            .assert.textContains("h2", "Тест Уралсиб (для автотестов)")
            .expect.element('#form993464').to.be.visible 

    // проверка, что видно последнее изменение
            
        browser.assert.visible('#last-change-password')        
        browser.expect.element('#last-change-password').text.to.equal('Последнее изменение:') // тут будет выдавать ошибку, т.к. нужно ввести с датой и врменем, но эти параметры меняются
    }
};            