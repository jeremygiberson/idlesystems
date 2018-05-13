import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameMenu from './components/gameMenu';
import Game from './components/game';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Layout from './components/layouts/dark';

import './App.css';
const gameFactory = require('./src/game/factory').gameFactory;
const game = gameFactory();
// start game by scheduling ticks
let interval = setInterval(game.tick.bind(game), 1000);

class App extends Component {
  constructor(props, context) {
    super(props, context);

    // load state
    this.state = Object.assign({}, localStorage.getItem('game'));

  }
  render() {
    // save state
    localStorage.setItem('game', this.state);

    return (
      <Layout>
        <Router>
          <div>
            <Route exact path="/" component={GameMenu} />
            <Route path="/about" component={About} />
            <Route path="/game" component={Game} />
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