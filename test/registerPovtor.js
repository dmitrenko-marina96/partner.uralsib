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

    'Переход на страницу регистрации': function(browser) {
        browser.click('#ajax-register-form > div.mb-3 > div > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/register/9550655/')
            .assert.titleContains('Личный кабинет Правокард', 'title ok')
            .assert.textContains("h1", "Регистрация")
    },

    'Повторная регистрация с уже зарегистрированным сертификатом невозможна': function(browser) {
        browser
            .clearValue('#inputCert')
            .setValue('#inputCert', 'УРАЛ000009')
            .click('button[type="button"]')

        browser.expect.element('#register-form > p > span.auth-error').to.be.visible // ошибка, т.к. нельзя повторно зарегистрироваться с тем же сертом
        browser.expect.element('#register-form > p > span.auth-error').text.to.equal('Поле "Договор страхования" заполнено неверно!')     
    },

    'Регистрация без сертификата невозможна': function(browser) {
        browser
            .clearValue('#inputCert')
            .click('button[type="button"]')

        browser.expect.element('#register-form > p > span.auth-error').to.be.visible // ошибка, т.к. поле Сертификат не заполнено
        browser.expect.element('#register-form > p > span.auth-error').text.to.equal('Поле "Договор страхования" заполнено неверно')     
    }
};    