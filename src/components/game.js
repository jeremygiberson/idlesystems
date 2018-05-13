import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import classnames from 'classnames';
import { TabContent, TabPane,
  Nav, NavItem, NavLink,
  Button,
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardImg,
  Container, Row, Col,
  ListGroup, ListGroupItem
} from 'reactstrap';
import Directed from './graphs/directed';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '/game'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.history.push(tab);
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    let match = this.props.match;
    return (
      <div>
        <Card outline color="secondary">
          <CardHeader>
            <Nav tabs className="card-header-tabs bg-dark">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '/game' })}
                  onClick={() => { this.toggle('/game'); }}
                >
                  System
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '/game/inventory' })}
                  onClick={() => { this.toggle('/game/inventory'); }}
                >
                  Inventory
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '/game/store' })}
                  onClick={() => { this.toggle('/game/store'); }}
                >
                  Store
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className={"border-secondary"}>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane>
                <Route path={`${match.url}/:topicId`} component={Topic} />
                <Route
                  exact
                  path={match.url}
                  render={() => <h3>Please select a topic.</h3>}
                />
              </TabPane>
            </TabContent>
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



const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);





