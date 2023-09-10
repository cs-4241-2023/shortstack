Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

GLITCH LINK

NOTE: I'm aware this project does not look great, and the code is a convoluted mess, and it is because I bit off a lot more than I can chew in terms of design, and completely underestimated how much time it would take. I'm hoping that since I fullfilled all of the requirements, I will get all or most points, but I am VERY AWARE of the visual and functional failings of my interface, I just have not had time to correct them. In future projects I will spend less time on backend development by keeping my goals simple, and more time on designing a website that actually looks good.
---

## Character Manager

This project is a mockup/beginnings of a website that could be used to manage characters for someone creating a book or a game with history they want to keep track of. It is specifically focused around keeping track of time, and one can create, delete and modify eras on the timeline that appears to the right. Then, any characters they create will be sorted into the eras on the timeline with real time updating.

## Project Structure:
one HTML file, index.html, used to structure both the two tabs and the timeline.

one js file to manage the server, server.improved.js

3 js/css file pairs:
-main.css/main.js, used to handle styling and code for the main page
-timeline.css/timeline.js, handling styling and code for the timeline
-characterSheet.css/characterSheet.js, handling stylnig and code for the character sheet.

## Functionalities Implemented:
-Server, contained in server.improved.js.
-Results: this is presented in multiple screens, but the two datasets are visible from the characters tab, and the timeline is always visible.
-Form/Entry: both sets of data have from/entry capability, which is done by filling in the form boxes and clicking submit.
-server logic: When a character is submitted, the server looks at the birth/death and calculates which eraI(s) that character belongs to. This updates in real time.
-derived field: See above. I'm aware the data is not from the new sent data, but it refers to other submissions and I believe this fullfills the spirit of this task.

## Concepts Implemented:
-HTML: all content contained in index.html, data is presented 
-CSS:
    -Used all of the CSS selector types, including connecting to classes, and elements
    -styled and positioned all of the elements, used non-default font
    -all CSS content in seperate stylesheets organized in a way I thought made sense
-Javascript
    -code that fullfills the requirement of sending/receiving data
-Node.js
    -fullfills the requirements of creating the derived fields

## Achievements:
-5 Points: create app that allows submission of data and updates current server-side data. It is possible to see the changes in clientside when something is added, and more importantly, the derived fields will update with the new information that is changed in the timeline. I don't know about "one-page app" but all of this is part of one HTML file, and it is possible to see this all one one page

-5 Points: Add ability to modify data. Both the character and timeline items can be modified. To do this, enter in values in the submissions tab, and click the relevant 'modify' button on each item, what is in the submission boxes will go into 

-5 Points, UI study








