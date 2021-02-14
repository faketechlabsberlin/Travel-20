# Travel 21

written by Irina Constantin

### From the Problem ...
While I was researching if it's possible to travel home for Christmas I noticed there's no centralised platform dedicated to presenting the current Covid-19 travel rules and restrictions.
A lot of dashboards and statistics can be found, but there is no easy way to understand the numbers, and often they are incomplete and don't present the restrictions.

### ... to the Solution
That’s why we set out to build a platform to acquire information about safety regulations that will allow the user to travel as safely and informed as possible and without breaking the imposed restrictions.

With my team, we've identified the best sources, figured out a way to scrape data, and create an automatic update of information. We wanted to design a user-friendly, simple interface that can easily answer the most important questions.

We created a modern and simple design that offers a brief look of what the user can expect in the country they want to visit but also the necessary information for the return journey.

### And we succeeded to build up a prototype!

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_09_Homepage_2x.png)

This is our landing page, it opens up with our logo created to inspire one of our missions: responsible global traveling, hence the seatbelt on the world.

Here you have the option to be located by the system – so it saves the user a click – or you can choose your location manually.
After selecting your destination you click on the „Read our travel information“ button which takes you to the second screen where you find all the results.

This page initially shows Germany with the number of cases per last 7 days and the restrictions imposed upon return from your chosen destination. The destination in this example is Denmark. The restrictions are presented with representative icons which help the user to find out the most important things before traveling. 

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_08_Results_2x.png)


Another cool feature that we decided to implement is the „safest locations“ where the user has the option of switching between „worldwide destinations“ and „Europe“. The top shows the locations which have the lowest number of cases in the last 7 days. At the moment, we can only guarantee the accuracy of the data for Europe, because especially in the cases of really small countries often there’s no reliable data update. But we're hoping that with the help of our users we will gradually have the database completed.

That’s why an interesting feature we implemented is to crowdsource a part of our data in the most reliable way possible. At the level of our landing page, there will be a pop-up that asks the user if they would like to share some information related to restrictions in the country that they live in or come from – which we would after control and verify.

There's also a section for the FAQs that informs our users about the sources of our data, how often it’s being updated and how we choose the safest locations.

For the „about“ page we've created short descriptions of our mission and objective as a team. 

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE%2008%20About%20Variant%202x.png)

What we are happy about is the moment when a participant in the user testing confirmed our direction of design: "My first impression is it is straightforward, inviting, and friendly. The colour palette is refreshing. The icons of results make the information simple to digest what to expect when traveling."

### What are our greatest personal moments of success?

For me, it was how from a wild idea a project can develop as an actual functional prototype when you have team members who believe as much as I did in the idea. 

„Seeing all members of the team learning and building something new together.“ (Nicolas)
„The first for-loops and if-else statements run, putting them together and see them working.“ (Philipp)
„Having a neat code that would do exactly what I wanted to the point that I started looking into ways to make it smaller and more efficient.“ (Javier) 
„Seeing that we can hook the data to the interface and figuring out some of the tricks with CSS to make the page look decent.“ (Zuzanna)
„Retrieving the data from the JSON files and displaying the data on the webpage.“ (Natalie)

### What were the biggest challenges? 

Having unrealistic expectations at the beginning and trying to lower them without feeling disappointed, while continuing to feel motivated to do the job. Downsizing our idea into something worthwhile and manageable. Other challenges were designing an interface without proper user testing, the web-scraping process, working with the data, and finding the best solutions. The time constraint was one of the biggest challenges.

### The process

A journey in the UX land: We've started with a Wireframe that was validated by the team. 
We realised we needed to understand what were the most important data points to our target audience, so we ran a survey.

We found inspiration in different interfaces and collected colour themes.

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Inspiration/Colours.png)

We designed the logo, implemented the elements by adjusting colours and size. We produced the interface for the first screen and after several iterations opted for light green having more of a safe connotation and soft orange to draw attention. 

We produced a Design Specs document for the Dev team to use for CSS. 

We continued with producing the second screen. A big challenge was to organise the information clearly while providing enough data. 

We  produced the About page as a standard page format for the website.

![Wireframe](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Wireframe/Exports/INTERFACE%2001%20Screen%201.png)

![Wireframe](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Wireframe/Exports/INTERFACE%20Screen%202-02.png)

A journey in the magical reign of WebDev: First, we set up a skeleton for the page based on the wireframes to see how all the parts come together, only then we started to work with the mock data, to eventually be able to connect the interface with the backend. This was the part where the JavaScript knowledge became essential to work with different data structures, but also included a lot of googling and trying out many different approaches.

![Blog images](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Blog%20Images/coviddatajasonfile.png)

![Blog images](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Blog%20Images/promiseloadaflag%20image.png)

A journey in the Data Science field: Our first steps included searching for websites we wanted to scrape and trying out the first scraping commands. The code evolved and we proceeded to create a pipeline to clean up the CSV-file (the picture was taken in jupyter notebook). After the first attempt, we've learned how important it is to properly plan how you want to use the data to see if you can use it. The website we've initially scraped turned out to not offer the data we needed, so we changed it and repeated the whole process. 

The new code now looks like this (the first image shows the Pipeline, the second the spider). After getting all the data and cleaning it, we thought the easy part started now, but we were wrong: The automation turned out to be quite tricky due to some strange errors we got. After a ton of research on stack overflow and with help of the wonderful Techlabs team we were able to solve the problem.

![Blog images](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Blog%20Images/gettingbetter.png)

![Blog images](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Blog%20Images/spider.png)


### As tech-stack we had: 

For project management: Github, Trello; for WebDev: HTML, Vanilla JS, CSS, Bootstrap, Magic; for Data Science: Python, Serverless, AWS, Scrapy, JSON files, Jupiter Lab and finally for UX: Figma, Google docs, Photoshop, Miro board.

### The future looks bright if we:
- Figure out how to make a text recognition software to properly scrape other websites for even more valuable data. Automate this process to create a more interesting indicator.

- Try to combine the features with some flight-APIs to give more cool functionality.

- Spend more time getting data for all the countries in the world and providing more detailed information on the result screen.

- Furthermore, ensure responsive design and introduce more error handling. Also, test our webpage, while at the same time in the background we run proper user testing and edit our interface based on our findings.

I conclude this article with many thanks to my team members: Nicolas Huart-UX and right hand, Philipp Henschke and Francisco Ardila- DS, Natalie Dieckmann, and Zuzanna Tarka- WD and magical creatures. 

Special thanks to the TechLabs Berlin team and Benedikt Ulrich, my mentor. 




