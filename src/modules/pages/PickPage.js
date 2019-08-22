import React from 'react';
import '../../styles/PickPage.css'

class PickPage extends React.Component {
    state = {
        settings: {
            nameRoll: "",
            modifier: "",
            criticAvaible: false,
            dices: [],
        },
        errors: {
            errorName: true,
            errorDices: true,
            errorModifier: true,
            errorsActives: false,
        }
    }


    handleCheckModifier = (e) => {
        let errors = Object.assign({}, this.state.errors)
        let settings = Object.assign({}, this.state.settings)
        settings.modifier = e.target.value;
        if (settings.modifier < 1) errors.errorModifier = true;
        else errors.errorModifier = false;

        this.setState({
            settings,
            errors
        })
    }

    handleCritic = (e) => {
        let settings = Object.assign({}, this.state.settings)
        settings.criticAvaible = !settings.criticAvaible
        this.setState({
            settings
        })
    }

    handleCheck = (e, element) => {
        //en of classname clickedDice to can again pick
        const keyTarget = e.target.id
        let addClass = () => {
            document.querySelector('#' + keyTarget).className = ""
        }
        addClass.bind(this, e.target)

        let dices = [...this.state.settings.dices];
        let settings = Object.assign({}, this.state.settings)
        let errors = Object.assign({}, this.state.errors)
        errors.errorDices = false;
        addClass()

        dices.push({
            value: element,
            lastThrow: "",
        })

        settings.dices = dices;

        this.setState({
            settings,
            errors
        })

        e.target.className = 'clickedDice'
        setTimeout(addClass, 500)
    }

    handlePutName = (e) => {
        let errors = Object.assign({}, this.state.errors)
        let settings = Object.assign({}, this.state.settings)
        settings.nameRoll = e.target.value
        if (settings.nameRoll.length < 1) errors.errorName = true;
        else errors.errorName = false
        this.setState({
            settings,
            errors
        })
    }

    handleCheckSubmit = (e) => {
        let settings = Object.assign({}, this.state.settings)
        let errors = Object.assign({}, this.state.errors)

        if (errors.errorName || errors.errorDices || errors.errorModifier) {
            errors.errorsActives = true
        } else {
            errors.errorsActives = false;
        }
        this.setState({
            errors
        })
        if (errors.errorsActives) return

        this.props.submit(settings)

        settings.nameRoll = "";
        settings.modifier = "";
        settings.criticAvaible = false;
        settings.dices = [];
        this.setState({
            settings,
            errors
        })

    }

    handleDelete = (element) => {
        let dices = [...this.state.settings.dices]
        let errors = Object.assign({}, this.state.errors)
        let settings = Object.assign({}, this.state.settings)
        dices = dices.filter(dice => dice !== element)
        settings.dices = dices
        if (dices.length === 0) errors.errorDices = true;
        this.setState({
            settings,
            errors
        })
    }

    dices = [4, 6, 8, 10, 12, 20]

    render() {
        let dicesToPick = [...this.dices]

        dicesToPick = dicesToPick.map((element, index) => <div key={index} className="containerDicesToPick"><img id={'keyId' + index} onClick={(e) => this.handleCheck(e, element)} src={require('../../img/d' + element + '-icon.png')} alt="dice" /></div >
        )
        let dicesToShow = [...this.state.settings.dices];
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
                            <input placeholder="What's the throw name?" type="text" id="name" value={this.state.settings.nameRoll} onChange={this.handlePutName} />
                            {this.state.errors.errorName && this.state.errors.errorsActives ? <p className="errors">Wpisz nazwe rzutu</p> : null}
                        </div>
                        <div>
                            <h4>Kości:</h4>
                            <div className="containerPickedDices">{this.state.settings.dices.length ? dicesToShow : <p>Brak wybranych kości</p>}
                                {this.state.errors.errorDices && this.state.errors.errorsActives ? <p className="errors">Dodaj przynajmniej jedną kość</p> : null}
                            </div>
                        </div>
                        <div>
                            <h4><label htmlFor="modifier">Modyfikator: </label></h4>
                            <input type="number" id="modifier" value={this.state.settings.modifier} onChange={this.handleCheckModifier} />
                            {this.state.errors.errorModifier && this.state.errors.errorsActives ? <p className="errors">Wpisz modyfikator rzutu</p> : null}
                        </div>
                        <div className="criticalAvaible">
                            <h4>Czy możliwy krytyk:</h4>
                            <input type="checkbox" checked={this.state.settings.criticAvaible} onChange={this.handleCritic}></input>
                        </div>

                        <button onClick={(e) => { this.handleCheckSubmit(e) }}>Dodaj parametry rzutu</button>
                    </div>


                </div>
            </div >
        );
    }
}
// errors: {
//     errorName: true,
//         errorDices: false,
//             errorModifier: false,
//                 errorsActives: true,
// }
export default PickPage;