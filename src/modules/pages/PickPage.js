import React from 'react';
import '../../styles/PickPage.css'

class PickPage extends React.Component {
    state = {
        nameRoll: "",
        modifier: "",
        criticAvaible: true,
        dices: [],
        id: 1,
    }

    handleCheckModifier = (e) => {
        if (e.target.value % 1 !== 0) return alert('Wpisz tylko cyfry całkowite')
        const modifier = e.target.value;
        this.setState({
            modifier
        })
    }

    handleCritic = (e) => {

        this.setState({
            criticAvaible: !this.state.criticAvaible
        })
    }

    handleCheck = (e, element) => {
        //en of classname clickedDice to can again pick
        const keyTarget = e.target.id
        let addClass = () => {
            document.querySelector('#' + keyTarget).className = ""
            console.log(keyTarget)
        }
        addClass.bind(this, e.target)

        let dices = [...this.state.dices];
        addClass()
        dices.push({
            value: element,
            lastThrow: "",
        })

        this.setState({
            dices
        })
        e.target.className = 'clickedDice'
        setTimeout(addClass, 500)
    }
    handlePutName = (e) => {

        this.setState({
            nameRoll: e.target.value
        })
    }

    handleCheckSubmit = (e) => {
        let correct = true;
        let message = [];
        if (this.state.dices.length < 1) {
            correct = false;
            message.push('Wybierz przynajmniej jedną kość');
        }
        if (this.state.nameRoll.length < 1) {
            correct = false;
            message.push('Podaj nazwę dla rzutu')
        }
        if (this.state.modifier === "") {
            correct = false;
            message.push('Wpisz modyfikator rzutu')
        }
        if (!correct) return alert(message.join(", "))

        this.props.submit(this.state)

        this.setState({
            id: this.state.id + 1,
            nameRoll: "",
            modifier: "",
            criticAvaible: true,
            dices: [],
        })
    }

    handleDelete = (element) => {
        let dices = [...this.state.dices]
        dices = dices.filter(dice => dice !== element)
        this.setState({
            dices
        })
    }

    id = 1;
    dices = [4, 6, 8, 10, 12, 20]

    render() {
        let dicesToPick = [...this.dices];
        dicesToPick = dicesToPick.map((element, index) => <div key={index} className="containerDicesToPick"><img id={'keyId' + index} onClick={(e) => this.handleCheck(e, element)} src={require('../../img/d' + element + '-icon.png')} alt="dice" /></div >
        )
        let dicesToShow = [...this.state.dices];
        dicesToShow = dicesToShow.map((element, index) => {
            return <img key={index} src={require('../../img/d' + element.value + '-icon.png')
            } alt="dice" onClick={() => this.handleDelete(element)} className="" />
        })
        return (
            <div className="PickPage">
                <div className="dicesToPick"> {dicesToPick}</div >

                <div className="dicesPicked">
                    <h3>Wybrane:</h3>
                    <div className="formPicked">
                        <div>
                            <h4>Nazwa rzutu:</h4>
                            <input placeholder="What's the throw name?" type="text" id="name" value={this.state.nameRoll} onChange={this.handlePutName} />
                        </div>
                        <div>
                            <h4>Kości:</h4>
                            <div className="containerPickedDices">{this.state.dices.length ? dicesToShow : <p>Brak wybranych kości</p>}</div>
                        </div>
                        <div>
                            <h4><label htmlFor="modifier">Modyfikator: </label></h4>
                            <input type="number" id="modifier" value={this.state.modifier} onChange={this.handleCheckModifier} />
                        </div>
                        <div className="criticalAvaible">
                            <h4>Czy możliwy krytyk:</h4>
                            <input type="checkbox" checked={this.state.criticAvaible} onChange={this.handleCritic}></input>
                        </div>

                        <button onClick={(e) => { this.handleCheckSubmit(e) }}>Dodaj parametry rzutu</button>
                    </div>


                </div>
            </div >
        );
    }
}

export default PickPage;