Isabella Pabon
https://a2-isabellapabon.glitch.me/


## Baseline Requirments
- I used a HTML form and a "ul and p" tags to display the data from the server on to my webpage.
- I used all kinds of selectors for my css, including: element selectors, id selectors, and class selectors.
 You can see each one in my html, for example I made a class for header, and gave it an id to be able to access it
 and style it in my css.
 - I used a flexbox for my design.
 - The fonts I used are: "Roboto" for the general text and "Abril Fatface" for the header. I got both of these fonts 
 from Google Fonts.
 - My javascript contains the functions for getting/deleting/updating the data from the server. I also added a helper
 function for changing the color of the header background depending on the season.
 - My server maintains all the data and responds to requests from the frontend.
 

## Season Playlist Generator
My project works by having a form that allows you to choose a season, and asks you to inputs a song title, artist,
and the length of the song in seconds. After you press submit, the information in the form is sent to the server 
in a post request, parsed, and appended to my array "playlists" that stores all of my data. The response sent back 
to the frontend is the entire list, which is then appended to a list of elements, and printed to the screen. 

For deleting, I used a button and a onClick function to make another post request to the server with the information
on the given entry that the specific button is attached to. That information is parsed and evaluated to see if it
matches any data in playlists. When it finds the specific entry, I then splice the array and then send back the data
to the frotend, and display it again.

For my html, I attemped a flexbox hierachy and made different class elements using "div." There is where I also placed
my form, and button for submit. (Some other elements I created in the JS using createElement, like the delete buttons.)

For my css, I implemented a flexbox and styled each element using the commands for a flexbox.

My derived field is that I take the song length in seconds and return it in the format: minutes:seconds.

## Technical Achievements
- **Tech Achievement 1** - I created a single page application that updates according to this achievement. When information
is submited to the server, it automatically displays the updated data and this is all done with a single page.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

1- Oliveira
  - This user stated that the square borders that I have should have been reworked to be a little less sporadically placed
  - It suprised me to hear that they thought that the design was very easy to understand, even with the design not being
  their personal favorite.
  - After their feedback, I would like to redesign how I implemented the flexbox elements and their hierachy, so that 
  it would be easier to position each element. 
  
2 - McCormick
  - This user stated that I should add a "load playlist" option, so that you can see what is in each playlist without having 
  to input a song. They also said that it would be cool if the site theme changed with each playlist. Although it wasn't
  neccessary I did like this idea, and decided to implement a function that changes the header color after this conversation.
  - Again, it was stated that my webiste was really easy to understand and simple to use.
  - If I could do this project again I would like to implement a load feature that displays each playlist seperately (maybe
  using multiple arrays for each season?) and also add some more season specific design elements, like images.
