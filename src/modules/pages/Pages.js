import React from 'react';
import '../../styles/Pages.css'
import { Route, Switch } from 'react-router-dom'
import StartPage from './StartPage'
import PickPage from './PickPage'
import RollPage from './RollPage'
import HistoryPage from './HistoryPage'
import ErrorPage from './ErrorPage'


class Pages extends React.Component {
    state = {
        dicesPicked: [],
        history: [],
        actuallyIdPickPage: 1,
    }

    handleDelete = (id) => {
        const index = this.state.dicesPicked.findIndex(element => element.id === id)
        let dicesPicked = [...this.state.dicesPicked];
        dicesPicked.splice(index, 1)
        this.setState({
            dicesPicked
        })
    }
    handleAdd = (object) => {

        let dicesPicked = [...this.state.dicesPicked]
        const newObject = {};
        newObject.nameRoll = object.nameRoll
        newObject.modifier = object.modifier
        newObject.criticAvaible = object.criticAvaible
        newObject.dices = object.dices
        newObject.id = this.state.actuallyIdPickPage
        console.log(newObject)
        dicesPicked.push(newObject)
        this.setState({
            dicesPicked,
            actuallyIdPickPage: this.state.actuallyIdPickPage + 1,
        })


    }
    handleRoll = (id) => {
        //flag to critical check
        let critic = false;
        //roll

        const index = this.state.dicesPicked.findIndex(element => element.id === id)
        let dicesPicked = [...this.state.dicesPicked];
        let throwScoreSum = 0;
        for (let i = 0; i < dicesPicked[index].dices.length; i++) {
            const value = dicesPicked[index].dices[i].value;
            dicesPicked[index].dices[i].lastThrow = Math.floor((Math.random() * value) + 1)
            console.log(dicesPicked[index])
            if (dicesPicked[index].criticAvaible && dicesPicked[index].dices[i].lastThrow === value) {
                console.log('weszło')
                const App = document.querySelector('.App');
                console.log(App)
                App.classList.add('critic')
                setTimeout(() => {
                    App.classList.remove('critic')
                }, 2000)
            }
            throwScoreSum += dicesPicked[index].dices[i].lastThrow
            //if math ===max and critic is avaible change flag
            if (dicesPicked[index].dices[i].lastThrow === value && dicesPicked[index].critAvaible === true) { critic = true }
        }

        //add score to history
        let history = [...this.state.history]
        throwScoreSum += dicesPicked[index].modifier
        const newHistoryElement = this.handleAddToHistory(dicesPicked[index], throwScoreSum)
        history.push(newHistoryElement)

        //if critic flag==true add classname to shake
        if (critic) this.handleCritic()

        this.setState({
            dicesPicked,
            history,
        })

    }

    handleCritic = () => {
        document.querySelector('.App').classList.add('critic')
        setTimeout(() => { document.querySelector('.App').classList.remove('critic') }, 600)
    }

    handleAddToHistory = (object, sumValue) => {

        return {
            nameRoll: object.nameRoll,
            modifier: object.modifier,
            value: sumValue,
        }
    }
    handleToggleNav = (e) => {
        document.querySelector('.mainMenu').classList.toggle('hide')
        document.querySelector('.pages').classList.toggle('hide')
    }
    render() {

        return (
            <div className="pages" >
                <div onClick={this.handleToggleNav} className="switchNav"><span></span><span></span><span></span></div>
                <>
                    <Switch>
                        <Route exact path="/" component={StartPage} />
                        <Route exact path="/pick"><PickPage submit={this.handleAdd} /></Route>
                        <Route exact path="/roll"><RollPage dicesPicked={this.state.dicesPicked} delete={this.handleDelete} roll={this.handleRoll} /></Route>
                        <Route exact path="/history"><HistoryPage history={this.state.history} /></Route>
                        <Route component={ErrorPage} />
                    </Switch>

                </>


            </div >
        );
    }

}

export default Pages;