# Dice throws

This project was create to learning React(javascript library).
Thanks this app we can put dice set to roll.
This can be very helpful during game Dungeons and Dragons.
https://krzysztofziemski.github.io/diceThrows/
## instal

To run this project you need instal:

Node.js

React - command powershell(or other):
npx create-react-app my-app 
npm start

React Router Dom:
npm install react-router-dom


serwer with static path files(u can use live server extension in Visual Studio Code)


## use

This is complete App to 
pick a dice set(second overlap)
roll(third overlap)
look a history(last overlap)

The history don't save result on data base. Refresh page delete all.


##components

This projest has 4 main components:

###App.js
router app
Render Nav component
Pages component
Footer component

###Nav
menu created by Navlink 

###Footer
don't end this component yet

###Pages

Pages component is rendering other components depend on what you selected in the nav.
Switch one of four components
StartPage
PickPage
RollPage
HistoryPage

In state this component save selected dice set and history throws


