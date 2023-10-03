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
            .assert.textContains("h2", "Тест Уралсиб (для автотестов)"); 
    },

    'Переход в мои обращения': function(browser) {
        browser.click('#menu > div > div:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/obrashenija-178415891/')
            .assert.titleContains('Обращения', 'title ok')
            .assert.textContains("h2", "Обращения")
            .expect.element('#AJAX_MAIN > div > div > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
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

    'Переход в Типовые документы hr и психология': function(browser) {
        browser
            .click('#menu > div > div:nth-child(3)')
            .click('.tree-frame:nth-child(2) > .tree-item:nth-child(1) .nav-item > .d-flex')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/tipovye_dokumenty-1808098518/')
            .assert.titleContains('HR и психология', 'title ok')
            .assert.textContains("h2", "HR и психология")
            .expect.element('#AJAX_MAIN > div > div > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Переход в Типовые документы юридические': function(browser) {
        browser.click('.tree-frame:nth-child(2) > .tree-item:nth-child(2) .nav-item div')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/tipovye_dokumenty-933658466/')
            .assert.titleContains('Юридические документы', 'title ok')
            .assert.textContains("h2", "Юридические документы")
            .expect.element('#AJAX_MAIN > div > div > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Переход в Договор страхования': function(browser) {
        browser.click('#menu > div > div:nth-child(4)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/')
            .assert.titleContains('Договор страхования', 'title ok')
            .assert.textContains("h2", "Договор страхования")
            .expect.element('#table-listing-0930ff858b39e9698aa790016d1e21c4').to.be.visible // видимость сертификата
    },

    'Переход в Добавить ДС': function(browser) {
        browser.click('#menu  > div > div:nth-child(5)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/dobavit_dogovor_strahovanija/')
            .assert.titleContains('Добавить договор страхования', 'title ok')
            .assert.textContains("h2", "Добавить договор страхования")
            .expect.element('#activate-form').to.be.visible
    }
};    