import React from 'react';
import '../../styles/RollPage.css'
import attack from '../../img/attack.png'


class RollPage extends React.Component {


    render() {
        //create react element to render
        const show = this.props.dicesPicked.map(element => {
            let showLastThrow = false
            //create img html element with matching source. We can have different quality dices
            //coś nie działa
            const dicesImg = element.dices.map((dice, index) => {
                return (
                    <img key={index} src={require('../../img/d' + dice.value + '-icon.png')} alt="dice" />
                )
            })


            //calculations sum Array witch score
            let throwScoreSum = 0;
            for (let i = 0; i < element.dices.length; i++) {
                if (element.dices[i].lastThrow) showLastThrow = true
                throwScoreSum += element.dices[i].lastThrow
            }
            throwScoreSum += element.modifier;
            //create react element to render score(we can have several dices(don't knows how much))
            let throwScore = element.dices.map((dice, index) => <span key={index}> {dice.lastThrow} +</span >)

            throwScore = throwScore.map((score, index) => <span key={index}>{score}</span>)

            return (
                <div key={element.id} className="rollsElement">
                    <button onClick={() => this.props.delete(element.id)}>Usuń</button>
                    <div>
                        <p>{element.nameRoll}</p>
                    </div>
                    <div>
                        <p>{element.modifier}</p>
                    </div>
                    <div>
                        <div>{dicesImg}</div>
                    </div>
                    <button onClick={() => this.props.roll(element.id)}><img src={attack} alt="" /></button>
                    <div>
                        {showLastThrow ? <div>
                            <p>{throwScore}<span>{element.modifier}</span></p>
                            <p>{throwScoreSum}</p>
                        </div> : null}
                    </div>
                </div>
            )
        })


        return (
            <div className="rollsContainer" >
                {show}


            </div>
        );
    }

}

export default RollPage;