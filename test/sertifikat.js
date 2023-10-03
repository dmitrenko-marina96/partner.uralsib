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

    'Переход в раздел Договор страхования': function(browser) {
        browser.click('#menu > div > div:nth-child(4)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/')
            .assert.titleContains('Договор страхования', 'title ok')
            .assert.textContains("h2", "Договор страхования")
            .expect.element('#table-listing-0930ff858b39e9698aa790016d1e21c4').to.be.visible // видимость таблицы с сертификатами            
    },

    'Переход в сертификат': function(browser) {
        browser.click('.text-truncate > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/13045669/')
            .assert.titleContains('УРАЛ000009', 'title ok')
            .assert.textContains("h2", "УРАЛ000009")

        browser.expect.element('.me-1 > .marker').text.to.equal('Действующий')  // проверка отображения корректного статуса
        browser.expect.element('.col-sm-8 > .marker').text.to.equal('Ваш юрист Персональная') // проверка отображения корректного продукта
        browser.expect.element('#box_content_ajax_48_13045668 > a').text.to.equal('Тест Уралсиб (для автотестов)') // проверка отображения корректного клиента
       // browser.expect.element('#menu_1118947_page_boxes_1 > div > div > table').to.be.visible // проверка видимости таблицы со списанием услуг
    },

    'Возврат в раздел Договор страхования': function(browser) {
        browser.click('.btn-secondary > .d-none')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/')
            .assert.titleContains('Договор страхования', 'title ok')
            .assert.textContains("h2", "Договор страхования")
            .expect.element('#table-listing-0930ff858b39e9698aa790016d1e21c4').to.be.visible // видимость таблицы с сертификатами
    }    
};    