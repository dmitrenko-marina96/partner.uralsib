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

    'Переход в Помощь': function(browser) {
        browser.click('#header_comment > a:nth-child(2) > span')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/pomoshnik-839349072/')
            .assert.titleContains('Помощник', 'title ok')
            .assert.textContains("h2", "Помощник")
            .expect.element('#AJAX_MAIN > div.px-3.px-md-5.pt-3.flex-grow-1.flex-column.d-flex > div > div:nth-child(1) > div.item-block.manual_text').to.be.visible // проверка видимости текста помощника
    },
    
    'Переход к созданию Вопроса': function(browser) {
        browser.click('.btn-primary:nth-child(1) > .d-none')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/tehnicheskaja_podderzhka/add/')
            .assert.titleContains('Техническая поддержка', 'title ok')
            .assert.textContains("h2", "Задать вопрос")
            .expect.element('#form10349154').to.be.visible // видимость формы

       // проверка видимости нужных полей
       
        browser.expect.element('.container-form-fields > fieldset > legend').text.to.equal('№')
        browser.expect.element('div:nth-child(1) > fieldset:nth-child(2) > legend').text.to.equal('Тема вопроса') 
        browser.expect.element('div:nth-child(2) > fieldset > legend').text.to.equal('Какой у Вас вопрос?') 
        browser.expect.element('legend:nth-child(2)').text.to.equal('Файлы') 
        browser.expect.element('.container-form-fields > fieldset > div').not.to.be.active // проверка, что поле с номером некликабельное    
    },

    'Заполнение формы': function(browser) {
        browser
            .setValue('#field_4421', 'Тестовая заявка')
            .setValue('#field_4422', 'Тест разработчиков')
            .expect.element('button[type="submit"]').to.be.enabled
          //.click('button[type="submit"]') 
    }        
};    