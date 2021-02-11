import scrapy

class AdacSpider(scrapy.Spider):
    name = 'adac'
    allowed_domains = ['adac.de']
    start_urls = ['https://www.adac.de/news/corona-einreiseverbote/']

    def parse(self, response):


        start_header= response.xpath('//main//article//div[2]//h2[position()>2]')
        start_text= response.xpath('//main//article//div[2]//ul[position()>3]')

        for i in range(len(start_header)-1):
            if start_header[i].xpath('./text()').get() == 'Einreisebeschränkungen wegen Covid-19 weltweit':
                del start_header[i]


        for (head,text) in zip(start_header,start_text):
                Lander= head.xpath('./@id').get()
                Reisewarnung = text.xpath('.//p[contains(.,"Reisewarnung")]//b[2]/text()').get()
                Risikogebiet = text.xpath('.//p[contains(.,"Risikogebiet")]//b[2]/text()').get()
                Test_Einreise = text.xpath('.//p[contains(.,"Corona-Test")]//b[2]/text()').get()
                Einreise_Formular = text.xpath('.//p[contains(.,"Einreise-Formular")]//b[2]/text()').get()
                Quarantäne= text.xpath('.//p[contains(.,"Quarantäne")]//b[2]/text()').get()

                test = {
                        'Land': Lander,
                        'Reisewarnung':Reisewarnung,
                        'Riskzone': Risikogebiet,
                        'Test_entry': Test_Einreise,
                        'Entry_form' : Einreise_Formular,
                        'Quarantine' : Quarantäne
                }

                yield test




