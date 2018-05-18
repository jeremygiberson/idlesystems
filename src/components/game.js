import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import {
  Nav, NavItem, NavLink,
  Button,
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardImg,
  Container, Row, Col,
  ListGroup, ListGroupItem
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let game = this.props.game;
    console.log('game', game);
    let match = this.props.match;
    return (
      <div>
        <Card outline color="secondary">
          <CardHeader>
            <CardText>
              <span>Make more &nbsp;</span>
              <FontAwesome name='money-check-alt' className="text-success"/> <span className="text-success">{game.getPrimaryCurrencyName()}</span>!
            </CardText>
          </CardHeader>
          <CardBody className="text-center text-success">
            <h1>{game.getPrimaryCurrencyValue()}</h1>
            <p className=""><FontAwesome name='money-check-alt'/> {game.getPrimaryCurrencyName()}</p>
          </CardBody>
          <CardBody className={"border-secondary"}>
            asdf
          </CardBody>
          <CardFooter>
            foot
          </CardFooter>
        </Card>
<br/>
        <ListGroup>
          <ListGroupItem>
            <Button block color="primary" disabled>Save Game</Button>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/"><Button block color="danger">Quit</Button></Link>
          </ListGroupItem>
        </ListGroup>


      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
};


