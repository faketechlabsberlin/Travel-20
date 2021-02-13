# Travel 21 story

### From the Problem 
While I was doing research for travelling home for Christmas I noticed there’s no centralised platform dedicated to presenting the Covid-19 current situation globally. 

A lot of dashboards and statistics are made available, but there is no easy way to understand the numbers and often they don’t present the restrictions.
We decided to find a solution, we set out to build a platform to acquire information about safety regulations which will allow the user to travel as safely as possible and without breaking the imposed restrictions.

With my team we’ve identified the best sources, figured out a way to scrape data and create a automatic update of information. We wanted to design a user-friendly, simple interface that can easily answer the most important questions.

### To the Solution
A modern and simple design that offers a brief look of what the user can expect in the country they want to visit but also the necessary information for the return journey.

### And we succeeded to build up a prototype!

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_09_Homepage_2x.png)

This is our landing page, it opens up with our logo created to inspire one of our missions: responsible travelling, hence the seatbelt on the world.
Here you have the option from the system to be located- Germany, so it saves the user a click or you can choose it manually.
After choosing your destination you click on the Read our travel information button which takes you to the second screen where you have all the results.
The page initially shows Germany  with number of cases per last 7 days and the restrictions imposed upon return from your chosen destination when it comes to quarantine and a test. The destination for example Denmark. You can see it presents with representative icons the restrictions which would help you in a matter of minutes to find out the most important things before travelling

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE_08_Results_2x.png)

At the third section of the webpage you’ll get the button and option to search for another location which takes you back to the first screen-the landing page where the user can run another research.

Another cool feature that we decided to implement it’s a top of safest locations where the user has the option of filtering out through worldwide destinations and European.  The top shows the locations which have the lowest number of cases in the last 7 days. At the moment, for the worldwide destinations we cannot guaranty the accuracy of the date, especially in the cases of really small countries but we’re hoping that gradually with the help of our users we could have the data base completed. For Europe the situation is different as there is more data made available everyday.
Another interesting feature that we wanted to implement is to crowdsource a part of our data in the most reliable way possible. At the level of our landing page there should be a pop-up which will ask the user if they would like to share some informations related to restrictions in the country that they live/come from. Which we would after control and verify.
There’s also a section for the FAQS that inform our users about the sources of our data, how often is being updated and how we choose the safest locations.
And the thing to mention is the about page where we’ve created a short descriptions of our mission and objective as a team which finishes the button to search for a destination.

![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Deliverables/INTERFACE%2008%20About%20Variant%202x.png)

### What are we are happy about?
When a participant in the user testing confirmed our direction of design: “My first impression is it is straightforward, inviting, and friendly. The colour palette is refreshing. The icons of results make the information simple to digest what to expect when travelling.”

### Greatest satisfaction?
For me it was to see how from a wild idea a project can develop an actual functional prototype when you have team members which believe as much as I did in the idea. 
Seeing all members of the team learning and building something new together. Nicolas- UX
To see the first for-loops and if-else statements run, then put them together and see them still running.- Philipp-  DS
Having a neat code that would do exactly what I wanted to the point that I started looking into ways to make it smaller and more efficient.-Javier- DS. Seeing that we are actually able to hook the data to the interface and figuring out some of the tricks with CSS to make the page look decent.-Zuzanna- WD
Retrieving the data from the JSON files and displaying the data on the webpage. It’s also really satisfying to struggle with a coding problem for hours and then finally hit a solution.-Natalie- WD

### Biggest challenges? 
Having unrealistic expectations at the beginning and trying to lower them without feeling disappointed, while continuing to feel motivated to do the job. Downsizing our idea into something worthwhile and manageable. Other challenges were designing an interface without proper user testing, the web-scraping process, working with the data and finding the best solutions. The time constraint was one of the biggest challenge.

### The future looks bright if we:
Figure out how to make a text recognition software to properly scrape other websites for even more valuable data. Automate this process to create a more interesting indicator.
Try to combine the features with some flight-apis to give more cool functionality.
Spend more time getting data for all the countries in the world and providing more details information on the result screen. Furthermore, ensured responsive design and introduced more error handling. Also, test our webpage.
While at the same time in the background we run proper user testing and edit our interface based on our findings.
Launch the official webpage!:)

### As tech-stack we had: 
For project management: Github, Trello for WebDev: HTML, Vanilla JS, CSS, Bootstrap, Magic for Data Science: Python, Serverless, AWS, Scrapy, JSON files, Jupiter Lab and finally for UX: Figma, Google docs, Photoshop, Miro board
### A journey in the UX processes: We’ve started with a Wireframe that was validated by the team. 
We realised we needed to understand what were the most important data points to our target audience, so we ran a survey.
We found inspiration in different interfaces and collected colour themes. We designed the logo, implemented the elements by adjusting colours and size. We produced the interface for the first screen and after  several iterations opted for light green having more of a safe connotation and soft orange to draw attention. 
Produced a Design Specs document for the Dev team to use for CSS. 
Continued with producing the second screen. A big challenge was to organise the information in a clear manner while providing enough data. Produced the About page as a standard page format for the website.
![Wireframe](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Wireframe/Exports/INTERFACE%2001%20Screen%201.png)
![Wireframe](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Wireframe/Exports/INTERFACE%20Screen%202-02.png)
![Interface](https://github.com/TechLabs-Berlin/Travel-20/blob/main/UX/Interface/Inspiration/Colours.png)

