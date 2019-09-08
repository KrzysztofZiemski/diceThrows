import React from 'react';
import '../../styles/HistoryPage.css'
const HistoryPage = (props) => {
    let history = props.history.reverse()
    history = props.history.map((element, index) => <div className="historyElement" key={index}><span>{element.nameRoll}</span><span>Wynik: {element.value} ({element.modifier < 0 ? null : "+"}{element.modifier})</span>
        <span className="historyDates">
            <span>
                {element.date.getFullYear()}-{element.date.getMonth() < 10 ? "0" + element.date.getMonth() : element.date.getMonth()}-{element.date.getDate() < 10 ? "0" + element.date.getDate() : element.date.getDate()}
            </span>
            <span>
                {element.date.getHours() < 10 ? "0" + element.date.getHours() : element.date.getHours()}:
            {element.date.getMinutes() < 10 ? "0" + element.date.getMinutes() : element.date.getMinutes()}:
            {element.date.getSeconds() < 10 ? "0" + element.date.getSeconds() : element.date.getSeconds()}
            </span>
        </span>
    </div>)


    return (
        <div className="historyPage">{history}</div>
    );
}

export default HistoryPage;