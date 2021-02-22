### The Struggles of Serverless

This is the update to the previous blog entry i did. Followed by the updated code in the DS Adac_Scraper folder. 
I didn't include this part because it`s only half functional. My plan was to scrape the data and then upload the scraped data to an S3 Bucket on AWS, and this should all be automated.

The scraping took a while to work, but i managed to do it, and turned my head to the next step, automatisation and storing of the data. I followed the steps in the workshop and came to my first problmes. I wasn't able to invoke my functions with serverless.
I searched around on stackoverflow, git hub and everything else the internet offers. I contacted our team mentor Sara and Daniel. Daniel told me not to worry about it too much and just continue with the other stuff.
And that's what i did, after a while, and some more help of Daniel i managed to store my data in and S3 Bucket so that my WebDev people can access it and use it for our project. 
Then i wondered why the automatisation wasn't working, i looked at the code for hours, tried to find a solution on the web but everthing i tried failed. I visited some webdev office hours, where i sat on the problem with Daniel.
We figured out that what the problem is
