# Travel 21

Travel 21 aims to simplify the research for travel restrictions and recommendations by creating a platform to more easily access the most crucial data you’ll need in order to make important travel decisions.

# Technologies/Frameworks used:
- Frontend: HTML5, CSS3, vanilla JavaScript, Bootstrap
- UX: Figma, Typeform, Google Docs, Photoshop
- Data Science: Python, Scrapy, Serverless, AWS 

# Features:
- choose your destination of travel and check which restrictions are currently in place at the given location, as well as requirements you will need to fulfil upon return to your country of departure
- browse safest locations (based on reported cases from last 7 days per 100k) - choose locations worldwide or within EU

# Interface:
![Main Page](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_09_Homepage_2x.png "Main Page View")
![Results Page](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_08_Results_2x.png "Results Page View")

# Folder structure:

UX files
- UX/Interface: Figma master file
- UX/Interface/Deliverables: All reference exports for Dev + assets
- UX/Interface/Inspiration: Various screenshots used for UI research
- UX/Interface/Sources: Graphics, source files (Creative Commons)
- UX/Logo: logo exports and source files
- UX/User Research: Various user research files
- UX/Wireframe: Wireframe files and exports

Dev Folder
- Main folder:
    - main files for the single-page application can be found at the root of the folder - index.html, styles.css and app.js
    - other files : countriesUtilities.js which includes a function to translate data pulled in German into English and a static COVID0402-C.json file, which includes infection       cases data
- Assets folder: 
    -  includes all the pictures and icons used in the design
    - a country-flag directory with png files for each country 
    - futura directory with futura font 
- Archive folder:
    - JSON files with mock data used for the interface developement - all data is currently hosted on hosting service https://jsonbin.io/
    
Data Science
- Adac_Scraper:
    - Contains the Code for the Spider, the pipeline, the settings for both of them and the JSON file which gets scraped
- WHO-Data:
    - Contains the Code that collects the case data from the WHO website and calculates the risk indicator (Cases per 100K in the last 7 Days) and exports it into a            JSON file.

# Project status:
- project is currently in beta/testing version
- current restrictions include: currect location only available for Germany
- future development will include:
    - enabling all locations to be chosen as departure
    - adding flight information for chosen locations 
    - featuring safest locations with cheapest flights


# Getting started:
- Clone the repo to you machine: 
$ git clone https://github.com/TechLabs-Berlin/Travel-20.git
- Open the Travel-20 folder, go into Dev directory and open index.html on your local machine using a browser of your choice (no dependencies must be installed before running the application locally)

# How to scrape the ADAC data:
# Installing Scrapy
Install scrapy with an IDE.
```
pip install scrapy
```
# Starting the project
Start a Porject with scrapy.
```
scrapy startproject adac_scraper
```
Go into the project folder.
```
cd adac_scraper
```
# Creating a Spider
Create a Spider.
```
scrapy genspider adac adac.de/news/corona-einreiseverbote/
```
# Copy and paste the given code
Copy the code from adac.py into the Spider which has been created.
Copy the code from settings.py into the already created settings.py.
Copy the code from pipelines.py into the already created pipelines.py.

# Run the spider
```
scrapy crawl adac_scraper
```
# Obtain the JSON-file
An JSON-file should be available to you in the folder.

# How to scrape the WHO data:
Run the code in COVID-Scrapper.py, a JSON file should be available in the folder after. 

# Credits:
- country flags: www.freepik.com from www.flaticon.com
- futura font: https://fontsgeek.com/fonts/Futura-Medium

# Teams and contributors:
- UX Team: Irina Constantin & Nicolas Huart
- Data Science Team: Philipp Henschke & Francisco Javier Ardila Suarez
- Web Development Team: Zuzanna Tarka & Natalie Dieckmann
