// проверки обязательности полей

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

    'Переход в Налоговый вычет': function(browser) {
        browser.click('#menu > div > div:nth-child(2)')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/nalogovyi_vychet-1284692060/')
            .assert.titleContains('Налоговый вычет', 'title ok')
            .assert.textContains("h2", "Налоговый вычет")
            .expect.element('#AJAX_MAIN > div > div > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Переход к созданию заявки на НВ': function(browser) {
        browser.click('.btn-primary')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/nalogovyi_vychet-1284692060/add/')
            .assert.titleContains('Налоговый вычет', 'title ok')
            .assert.textContains("h2", "Создать заявку")
            .expect.element('#form2455756').to.be.visible
   },

   'Нельзя отправить пустую заявку': function(browser) {
       browser.click('#btn-save')

       browser.expect.element('.field-after-error-text').to.be.visible // ошибка, т.к. не выбран Тип вычета
       browser.expect.element('.field-after-error-text').text.to.equal('Вы пропустили это поле.') 
   },

   'Нельзя отправить заявку без паспорта': function(browser) {
        browser
            .click('input[value="9349524"]') // выбрать тип вычета
            .click('#btn-save')

        browser.expect.element('.field-after-error-text.text-danger').to.be.visible // ошибка, т.к. не загружен паспорт
        browser.expect.element('.field-after-error-text.text-danger').text.to.equal('Пожалуйста, загрузите файл.')    
   },

   'Нельзя отправить заявку без заполнения поля Комментарий': function(browser) {
        browser 
            .setValue('#link_29a2ec773febc77b961c6e02710ab306', 'https://lk-zabota.pravocard.ru/download/?ant=1689938547&file=static1_pravocard%2Fuploads%2F2023%2F07%2F21%2F1ANosjyJzBo_64ba6a72bccc2.pdf')  // загрузить паспорт
            .click('#btn-save')

        browser.expect.element('div:nth-child(17) > fieldset > div > div').to.be.visible // ошибка, т.к. не звполнено поле Комментарий
        browser.expect.element('div:nth-child(17) > fieldset > div > div').text.to.equal('Заполните это поле.')      
   },

   'Нельзя отправить заявку, если не заполнено поле Email': function(browser) {
       browser
            .setValue('#field_44269', 'Тест разрабочтиков')
            .clearValue('#field_44268')
            .click('#btn-save')
    
        browser.expect.element('div:nth-child(16) > fieldset > div > div').to.be.visible // ошибка, т.к. не заполнено поле Email
        browser.expect.element('div:nth-child(16) > fieldset > div > div').text.to.equal('Заполните это поле.')   
   },

   'Нельзя отправить заявку, если не проставлен чек-бокс': function(browser) {
        browser
            .setValue('#field_44268', 'testural@test.ru')
            .click('#personal_data')
            .click('#btn-save')

        browser.expect.element('.container > div > div > div > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // ошибка, т.к. не роставлен чек-бокс
        browser.expect.element('.container > div > div > div > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Чтобы продолжить, установите этот флажок.')    
   }
};            