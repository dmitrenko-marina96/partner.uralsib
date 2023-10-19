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

        // проверки, что отображются все поля формы
        
        browser.expect.element('.container-form-fields > fieldset > legend').text.to.equal('Номер заявки*') 
        browser.expect.element('input[type="text"]').not.to.be.active // проверка, что поле с номером некликабельное
        browser.expect.element('.listing-group-by-container:nth-child(1) > .listing-group-by-title').text.to.equal('  Выберите тип вычета*')
        browser.expect.element('.container-form-fields > div.forms-parameters > div:nth-child(16) > fieldset > legend').text.to.equal('Email *') 
        browser.expect.element('#field_44268').to.have.value.that.equals('testural@test.ru') // проверка, что в поле предзаполнен email клиента
        browser.expect.element('.container-form-fields > div.forms-parameters > div:nth-child(17) > fieldset > legend').text.to.equal('Комментарий*')      
    },

    'Выбор типа вычета': function(browser) {
        browser
            .click('.btn-xs')
            .click('input[value="9349524"]')

        // проверки, что появились новые поля    

        browser.expect.element('.listing-group-by-container:nth-child(2) > .listing-group-by-title').text.to.equal('  Персональные данные')
        browser.expect.element('.forms-parameters > div:nth-child(2) > div.listing-group-by-data > div:nth-child(1) > fieldset > legend').text.to.equal('Сертификат*')    
        browser.expect.element('button[data-id="field_4423"]').text.to.equal('УРАЛ000009')  // проверка, что сертификат предзаполнен
    },

    'Заполнение формы': function(browser) {
        browser
            .setValue('#link_29a2ec773febc77b961c6e02710ab306', 'https://lk-zabota.pravocard.ru/download/?ant=1689938547&file=static1_pravocard%2Fuploads%2F2023%2F07%2F21%2F1ANosjyJzBo_64ba6a72bccc2.pdf')
            .setValue('#field_44269', 'Тест разрабочтиков')
            .expect.element('#btn-save').to.be.enabled 
    }
};    