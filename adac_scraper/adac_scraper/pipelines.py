# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


from itemadapter import ItemAdapter

from io import BytesIO
from urllib.parse import urlparse
from datetime import datetime
from itemadapter import ItemAdapter
import gzip

import boto3
from botocore.exceptions import ClientError

from scrapy.exporters import JsonLinesItemExporter

class S3Pipeline:
    """
    Scrapy pipeline to store items into S3 bucket with JSONLines format.
    Unlike FeedExporter, the pipeline has the following features:
    * The pipeline stores items by chunk.
    * Support GZip compression.
    """

    def __init__(self, settings, stats):
        self.stats = stats

        url = settings['S3PIPELINE_URL']
        o = urlparse(url)
        self.bucket_name = o.hostname
        self.object_key_template = o.path[1:]  # Remove the first '/'

        self.max_chunk_size = settings.getint('S3PIPELINE_MAX_CHUNK_SIZE', 100)
        self.use_gzip = settings.getbool('S3PIPELINE_GZIP', url.endswith('.gz'))

        self.s3 = boto3.client(
            's3',
            region_name=settings['AWS_REGION_NAME'], use_ssl=settings['AWS_USE_SSL'],
            verify=settings['AWS_VERIFY'], endpoint_url=settings['AWS_ENDPOINT_URL'],
            aws_access_key_id=settings['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=settings['AWS_SECRET_ACCESS_KEY'])
        self.items = []
        self.chunk_number = 0

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler.settings, crawler.stats)

    def process_item(self, item, spider):
        """
        Process single item. Add item to items and then upload to S3 if size of items
        >= max_chunk_size.
        """
        self.items.append(item)
        if len(self.items) >= self.max_chunk_size:
            self._upload_chunk(spider)

        return item

    def open_spider(self, spider):
        """
        Callback function when spider is open.
        """
        # Store timestamp to replace {time} in S3PIPELINE_URL
        self.ts = datetime.utcnow().replace(microsecond=0).isoformat().replace(':', '-')

    def close_spider(self, spider):
        """
        Callback function when spider is closed.
        """
        # Upload remained items to S3.
        self._upload_chunk(spider)

    def _upload_chunk(self, spider):
        """
        Do upload items to S3.
        """

        if not self.items:
            return  # Do nothing when items is empty.

        f = self._make_fileobj()

        # Build object key by replacing variables in object key template.
        object_key = self.object_key_template.format(**self._get_uri_params(spider))

        try:
            self.s3.upload_fileobj(f, self.bucket_name, object_key)
        except ClientError:
            self.stats.inc_value('pipeline/s3/fail')
            raise
        else:
            self.stats.inc_value('pipeline/s3/success')
        finally:
            # Prepare for the next chunk
            self.chunk_number += len(self.items)
            self.items = []

    def _get_uri_params(self, spider):
        params = {}
        for key in dir(spider):
            params[key] = getattr(spider, key)

        params['chunk'] = self.chunk_number
        params['time'] = self.ts
        return params

    def _make_fileobj(self):
        """
        Build file object from items.
        """

        bio = BytesIO()
        f = gzip.GzipFile(mode='wb', fileobj=bio) if self.use_gzip else bio

        # Build file object using ItemExporter
        exporter = JsonLinesItemExporter(f)
        exporter.start_exporting()
        for item in self.items:
            exporter.export_item(item)
        exporter.finish_exporting()

        if f is not bio:
            f.close()  # Close the file if GzipFile

        # Seek to the top of file to be read later
        bio.seek(0)

        return bio

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
