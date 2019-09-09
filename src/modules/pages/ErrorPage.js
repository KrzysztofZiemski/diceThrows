import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../styles/ErrorPage.css'
const ErrorPage = () => {
    return (<div className="ErrorPage">
        <h1>Strona nie znaleziona</h1>
        <p>Wróć do strony głównej i spróbuj ponownie</p>
        <div><NavLink to="/" exact>Strona główna</NavLink></div>
    </div>);
}

export default ErrorPage;