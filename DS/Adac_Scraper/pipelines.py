# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface

class AdacScraperPipeline:
    def process_item(self, item, spider):
        for key in item:
            if key == 'Riskzone':
                if item['Riskzone'] is None:
                    item['Riskzone'] = 'NoValue'
                else:
                    item['Riskzone']=item['Riskzone'].strip(' ')
                    if any(x in item['Riskzone']for x in 'JA'):
                        item['Riskzone'] = 1
                    elif any(x in item['Riskzone']for x in 'NEIN'):
                        item['Riskzone'] = 0
                    else:
                        item['Riskzone'] = 'NoValue'

            elif key == 'Reisewarnung':
                if item['Reisewarnung'] is None:
                    item['Reisewarnung'] = 'NoValue'
                else:
                    item['Reisewarnung']=item['Reisewarnung'].strip(' ')
                    if any(x in item['Reisewarnung']for x in 'JA'):
                        item['Reisewarnung'] = 1
                    elif any(x in item['Reisewarnung']for x in 'NEIN'):
                        item['Reisewarnung'] = 0
                    else:
                        item['Reisewarnung'] = 'NoValue'

            elif key == 'Test_entry':
                if item['Test_entry'] is None:
                    item['Test_entry'] = 'NoValue'
                else:
                    item['Test_entry'] = item['Test_entry'].strip(' ')
                    if any(x in item['Test_entry'] for x in 'JA'):
                        item['Test_entry'] = 1
                    elif any(x in item['Test_entry'] for x in 'NEIN'):
                        item['Test_entry'] = 0
                    else:
                        item['Test_entry'] = 'NoValue'

            elif key == 'Entry_form':
                if item['Entry_form'] is None:
                    item['Entry_form'] = 'NoValue'
                else:
                    item['Entry_form'] = item['Entry_form'].strip(' ')
                    if any(x in item['Entry_form'] for x in 'JA'):
                        item['Entry_form'] = 1
                    elif any(x in item['Entry_form'] for x in 'NEIN'):
                        item['Entry_form'] = 0
                    else:
                        item['Entry_form'] = 'NoValue'

            elif key == 'Quarantine':
                if item['Quarantine'] is None:
                    item['Quarantine'] = 'NoValue'
                else:
                    item['Quarantine'] = item['Quarantine'].strip(' ')
                    if any(x in item['Quarantine'] for x in 'JA'):
                        item['Quarantine'] = 1
                    elif any(x in item['Quarantine'] for x in 'NEIN'):
                        item['Quarantine'] = 0
                    else:
                        item['Quarantine'] = 'NoValue'



        return item
