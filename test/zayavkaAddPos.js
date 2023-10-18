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
            .assert.textContains('button[data-id="field_4421"]', "УРАЛ000009") // проверка, что сертификат предзаполнен сразу
            .expect.element('#form993440').to.be.visible
    },   

    'Заполнение формы': function(browser) {
       browser
           .setValue('#field_4422', 'Тестовое обращение')
           .setValue('#field_4423', 'Тест разработчиков')
           .expect.element('#btn-save').to.be.enabled 
    }   
};      