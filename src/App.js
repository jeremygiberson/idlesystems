import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameMenu from './components/gameMenu';
import Game from './components/game';
import Layout from './components/layouts/dark';
import { gameFactory } from './game/factory';

import './App.css';

// start game by scheduling ticks


class App extends Component {
  constructor(props, context) {
    super(props, context);

    // load state
    this.state = {game: this._load()};

    this.interval = setInterval(this._tick.bind(this), 1000);
  }

  _load() {
    let saveGame = localStorage.getItem('game');
    // TODO
    //saveGame = saveGame ? JSON.parse(saveGame) : gameFactory();
    saveGame = gameFactory();
    console.log('loaded',saveGame);
    return saveGame;
  }

  _save() {
    let saveGame = JSON.stringify(this.game);
    localStorage.setItem('game', saveGame);
    console.log('saved', saveGame);
  }

  _tick() {
    if(this.state.game && this.state.game.tick){
      this.state.game.tick.bind(this.state.game);
      this._save();
    }
  }

  quit(){

  }

  newGame() {
    this.game = gameFactory();
    this._save();
  }

  render() {
    return (
      <Layout>
        <Router>
          <div>
            <Route exact path="/" component={GameMenu} />
            <Route path="/about" component={About} />
            <Route path="/game" render={() => {
              return <Game game={this.state.game}/>
            }} />
          </div>
        </Router>
      </Layout>
    );
  }
}

export default App;



const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);