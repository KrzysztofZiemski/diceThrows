import React from 'react';

const HistoryPage = (props) => {
    const history = props.history.map((element, index) => <div key={index}><p><span>{element.nameRoll}</span><span>Wynik:{element.value}(modyfikator:{element.modifier})</span></p></div>)

    return (
        <div>{history}</div>
    );
}

export default HistoryPage;