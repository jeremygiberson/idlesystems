import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const GameMenu = () => (
  <ListGroup>
    <ListGroupItem>
      <Link to="/game/"><Button color="primary" block type="button" className="btn btn-primary">New Game</Button></Link>
    </ListGroupItem>
    <ListGroupItem>
      <Button type="button" block disabled className="btn btn-secondary">Load Game</Button>
    </ListGroupItem>
  </ListGroup>
);

export default GameMenu;



