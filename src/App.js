import React, { Component } from 'react';
import './App.css';
import { Container, Header, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { TabMenu, Tab } from './tab-menu';
import Checkout from './check-out';

//kill me plz
const customer_id = `cus_BtheIaqB5sLKFs`;
const secret_key = `sk_test_qGlg5kMzEsl6fxOt8V155Mgg`;
const public_key = `pk_test_DOMo8Imqw2zQshxw63WlKy3h`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      loading: true,
      status: ''
    }
  }

  async fetchCard() {
    const cards_uri = `https://api.stripe.com/v1/customers/${customer_id}/sources?object=card`;
    this.setState({
      status: 'Loading Cards...'
    })
    await fetch(cards_uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret_key}`,
      }
    })
      .then((data) => data.json())
      .then((cards) => {
        console.log(cards)
        this.setState({
          cards,
          loading: false,
          status: ''
        })
      })
  }

  async componentDidMount() {
    await this.fetchCard();
  }


  render() {

    let Content;
    if (this.state.loading) {
      Content = <Loader inline='centered' active style={styles.loader} size='large'>{this.state.status}</Loader>
    } else {
      Content = (
        <TabMenu>
          <Tab default title="Checkout">
            <Checkout cards={this.state.cards} />
          </Tab>
          <Tab title="Payments">
            <h1>Payments</h1>
          </Tab>
          <Tab title="Dispute">
            <h1>Dispute</h1>
          </Tab>
        </TabMenu>
      )
    }

    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>Stripe React</Header>
        {Content}
      </Container>
    );
  }
}

const styles = {
  loader: {
    position: 'fixed',
    top: '40%',
    right: 0,
    zIndex: 1000
  }
}


export default App;
