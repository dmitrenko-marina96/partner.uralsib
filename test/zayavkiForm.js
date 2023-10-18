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

    'Переход в Мои обращения': function(browser) {
        browser.click('#menu > div > div:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/obrashenija-178415891/')
            .assert.titleContains('Обращения', 'title ok')
            .assert.textContains("h2", "Обращения")
            .expect.element('#AJAX_MAIN > div > div > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Переход к созданию обращения': function(browser) {
        browser.click('.btn-primary')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/obrashenija-178415891/add/')
            .assert.titleContains('Обращения', 'title ok')
            .assert.textContains("h2", "Создать обращение")
            .expect.element('#form993440').to.be.visible

        // проверки, что отображаются все нужные поля     

        browser.expect.element('.container-form-fields > .fieldset-floating > .form-floating').text.to.equal('№')
        browser.expect.element('.container-form-fields > .fieldset-floating > .form-floating').not.to.be.active // проверка, что поле с номером некликабельное 
        browser.expect.element('div:nth-child(1) > fieldset > div > label').text.to.equal('Сертификат')
        browser.assert.textContains('button[data-id="field_4421"]', "УРАЛ000009") // проверка, что сертификат предзаполнен сразу
        browser.expect.element('div:nth-child(2) > fieldset > div > label').text.to.equal('Тема (кратко)')
        browser.expect.element('div.forms-parameters > div:nth-child(3) > fieldset > div > label').text.to.equal('Сообщение')
        browser.expect.element('legend:nth-child(2)').text.to.equal('Файлы')  

        // проверки, что админские поля не отображаются у клиента

        browser.expect.element('div.container-form-fields > div:nth-child(3) > fieldset > div > label').not.to.be.visible // поле Администратор
        browser.expect.element('div.container-form-fields > div:nth-child(4) > fieldset > div > label').not.to.be.visible // поле Верификатор
        browser.expect.element('div.container-form-fields > div:nth-child(5) > fieldset > div > label').not.to.be.visible // поле Клиент
        browser.expect.element('div.container-form-fields > div:nth-child(6) > fieldset > div > label').not.to.be.visible // поле Ответственный
        browser.expect.element('div:nth-child(5) > div > fieldset > div > label').not.to.be.visible // поле Маркер
        browser.expect.element('div:nth-child(6) > div > fieldset > div > label').not.to.be.visible // поле Признак
        browser.expect.element('div:nth-child(7) > div > fieldset > div > label').not.to.be.visible // поле Внутренний комментарий
    }
};    