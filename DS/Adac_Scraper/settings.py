
BOT_NAME = 'adac_scraper'

SPIDER_MODULES = ['adac_scraper.spiders']
NEWSPIDER_MODULE = 'adac_scraper.spiders'


AWS_ACCESS_KEY_ID = '****'
AWS_SECRET_ACCESS_KEY= '****'

# Export CSV feed

FEED_URI='s3://adac-scraper-dev-scraperfeedbucket-16nuzvfai8pr8/adac/adac.json'
S3PIPELINE_URL = FEED_URI
FEED_FORMAT= 'json'

ITEM_PIPELINE = {
'scrapy.pipelines.files.S3FilesStore': 1,
's3pipeline.S3Pipeline': 100
}

ROBOTSTXT_OBEY = True



# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    'adac_scraper.pipelines.AdacScraperPipeline': 300,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
AUTOTHROTTLE_ENABLED = True


# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 60 * 60 * 24 * 7
HTTPCACHE_DIR = 'httpcache'

