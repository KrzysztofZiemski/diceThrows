import React from 'react';
import logo from '../../img/logoDnd.png'
import '../../styles/StartPage.css'

const StartPage = () => {
    return (
        <div className='StartPage'>
            <img src={logo} alt="logo dnd" />
            <h1>Witam w świecie Dungeons and Dragons</h1>
            <p>Zapraszam i życzę samych krytyków.</p>
            <p>Na wstępie udostepniono biblioteke losowania.</p>
            <p>Przejdź do zakładki wyboru kostek i stwórz swoje rzuty</p>
        </div>);
}

export default StartPage;