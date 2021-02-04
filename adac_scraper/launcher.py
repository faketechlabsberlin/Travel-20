import sys
import json
import scrapy
import lxml



from adac_scraper.crawl import crawl2
from lxml import etree


def handle(event, context):
    return etree.fromstring(event)


def scrape(event={}, context={}):
    crawl2(**event)


if __name__ == "__main__":
    try:
        event = json.loads(sys.argv[1])
    except IndexError:
        event = {}
    scrape(event)