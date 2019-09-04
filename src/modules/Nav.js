import React from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Nav.css'
import history from '../img/history2.png'
import dicesRoll from '../img/dices-roll.png'
import dnd from '../img/dndLogo.png'
import attack from '../img/attack.png'

const Nav = () => {
    const hideMenu = () => {
        document.querySelector('.mainMenu').classList.toggle('hide')
        document.querySelector('.pages').classList.toggle('hide')
    }

    return (
        <ul className="mainMenu hide">
            <li><NavLink onClick={hideMenu} to="/" exact><img src={dnd} alt="Start"></img></NavLink></li>
            <li><NavLink onClick={hideMenu} to="/pick" exact><img src={dicesRoll} alt="Pick dices"></img></NavLink></li>
            <li><NavLink onClick={hideMenu} to="/roll" exact><img src={attack} alt="Throw dices"></img></NavLink></li>
            <li><NavLink onClick={hideMenu} to="/history" exact><img src={history} alt="Check dices' history"></img></NavLink></li>
        </ul>
    );
}

export default Nav;