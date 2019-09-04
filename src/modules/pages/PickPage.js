import React from 'react';
import '../../styles/PickPage.css'
import select from '../../img/select.png'
import unselect from '../../img/unselect.png'
class PickPage extends React.Component {
    state = {
        settings: {
            nameRoll: "",
            modifier: 0,
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

        if (settings.modifier < 0) errors.errorModifier = true;
        else errors.errorModifier = false;
        //delete 0 from begin number
        if (settings.modifier.length > 1) {
            settings.modifier *= 1
            settings.modifier = parseInt(settings.modifier, 10)
        }
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
        if (errors.errorName || errors.errorDices || errors.errorModifier < 0) {
            errors.errorsActives = true
        } else {
            errors.errorsActives = false;
        }
        this.setState({
            errors
        })
        if (errors.errorsActives) return
        //emove first 0 if egsist

        this.props.submit(settings)

        settings.nameRoll = "";
        settings.modifier = 0;
        settings.criticAvaible = false;
        settings.dices = [];

        errors.errorName = true
        errors.errorDices = true
        errors.errorModifier = true
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
        const errorStyle = {
            backgroundColor: '#ED1C1C',
        }
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
                            <input style={this.state.errors.errorName && this.state.errors.errorsActives ? errorStyle : null} placeholder="What's the throw name?" type="text" id="name" value={this.state.settings.nameRoll} onChange={this.handlePutName} />
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
                            <input style={this.state.errors.errorModifier < 0 && this.state.errors.errorsActives ? errorStyle : null} type="number" id="modifier" value={this.state.settings.modifier} onChange={this.handleCheckModifier} />
                            {this.state.errors.errorModifier < 0 && this.state.errors.errorsActives ? <p className="errors">Wpisz modyfikator rzutu</p> : null}
                        </div>
                        <div className="criticalAvaible">
                            <h4>Czy możliwy krytyk:</h4>
                            <div>
                                <input type="checkbox" checked={this.state.settings.criticAvaible} onChange={this.handleCritic}></input>
                                <img src={this.state.settings.criticAvaible ? select : unselect} alt="" />
                            </div>
                        </div>

                        <button className="submit" onClick={(e) => { this.handleCheckSubmit(e) }}>Dodaj parametry rzutu<span></span></button>
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