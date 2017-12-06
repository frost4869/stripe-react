import React, { Component } from 'react';
import './App.css';
import { Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { TabMenu, Tab } from './tab-menu';
import Checkout from './check-out';

class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>Stripe React</Header>

        <TabMenu>
          <Tab default title="Checkout">
            <Checkout />
          </Tab>
          <Tab title="Payments">
            <h1>Payments</h1>
          </Tab>
          <Tab title="Dispute">
            <h1>Dispute</h1>
          </Tab>
        </TabMenu>

      </Container>
    );
  }
}


export default App;
