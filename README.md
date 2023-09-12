## Simple Banking App

Ethan Catania
https://a2-ethancatania.glitch.me/

This application requires the input of a string in the username function, which may be empty. After hitting create account, the server checks if an account already exists and if not, it will create a new account with the inputted savings/ expenses. The user can see a list of all current accounts using the current accounts button. The default login is "Admin", but any string can be used to create a new account.The user can also delete the current account by inputting a username that exists in the data, and pressing the "delete User" button. User "Admin" may not be deleted. The user can also update any account balance by either depositing or withdrawing money directly from balance. Note: if there is a value in both deposit and withdraw, then the button pressed will determine which action is carried out(i.e. if both deposit and withdraw have a value, and deposit is pressed, only the value within deposit will be sent and updated in the server.) Anytime the user makes a change to data or creates an account, either an error message or success message will be displayed and more information will be provided on the new data. This page uses css styling and a flex box to hold the "main" object present in html. It makes use of element selctors such as h1, classes such as "button", and id selctors such as #nameDisplay. These css rules allow for the page to appear more colorful and appealing, while also assuring the any log messages will fit within the displayed message.

## Technical Achievements

- **Tech Achievement 1**: In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.
  The user may manipulate data within the server by updating the derived field balance. When a user deposits into an account, the server will add the value of the deposit to the balance variable and return the result. Withdraw works similarly, but also checks to make sure that a user balance is greater than the withdrawl amount before any money is removed. (i.e. a withdrawal may not leave balance as a negative number.) These implementatiosn allow for dynamic adjusting of variables within the server.

## Design/Evaluation Achievements

- **Design Achievement 1**: Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the think-aloud protocol to obtain feedback on your design (talk-aloud is also fine).
  Last Name: Raymond
  Issues: Issues with the formatting of the input fields. Issue With too much white space. Issue with cluttered buttons.
  Suprising Comments: I was suprised about the ambiguous nature of "Admin is the default username" as to me it was very clear but another set of eyes it wasnt as clear what it meant.
  Changes: I would definetly change the formatting of the input fields and also make the buttons larger and take up more space on the page.
