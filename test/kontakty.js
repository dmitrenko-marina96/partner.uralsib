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

    'Переход в контакты': function(browser) {
        browser.click('#header_comment > a.btn.btn-link.me-2 > span')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/kontakty-12027016/')
            .assert.titleContains('Контакты', 'title ok')
            .assert.textContains("h2", "Контакты")
            .expect.element('#listingForm > div > div.col-xl-6.col-xxl-5 > div').to.be.visible // видимость карточки с сертификатом

        browser.expect.element('.marker').text.to.equal('Ваш юрист Персональная')
        browser.expect.element('.text-primary > a').text.to.equal('УРАЛ000009')    
    },

    'Переход в сертификат': function(browser) {
        browser.click('.text-primary > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/13045669/')
            .assert.titleContains('УРАЛ000009', 'title ok')
            .assert.textContains("h2", "УРАЛ000009")
            .expect.element('.col-sm-8 > .marker').text.to.equal('Ваш юрист Персональная')  // проверка, что продукт совпадает с карточкой в контактах
    }
};    