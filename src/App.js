import React, { Component } from 'react';
import './App.css';
import { Container, Header, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { TabMenu, Tab } from './tab-menu';
import Checkout from './check-out';
import Keys from './keys.json';
import ChargeModal from './charge-modal';

//create keys.json in /src to import your own keys
const customer_id = Keys.customer_id;
const secret_key = Keys.secret_key;
const public_key = Keys.public_key;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      loading: true,
      status: '',
      isOpenChargeModal: false,
      chargeType: 'normal',
    }

    this.handleNormalCharge = this.handleNormalCharge.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleCustomCard = this.handleCustomCard.bind(this);
    this.onNormalCharge = this.onNormalCharge.bind(this);
    this.onCustomCharge = this.onCustomCharge.bind(this);
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

  handleNormalCharge(card_id) {
    this.setState({
      chargeType: 'normal',
      isOpenChargeModal: true
    })
  }

  async componentDidMount() {
    await this.fetchCard();
  }

  onModalClose() {
    this.setState({
      isOpenChargeModal: false
    })
  }

  handleCustomCard() {
    this.setState({
      chargeType: 'custom',
      isOpenChargeModal: true
    })
  }

  onNormalCharge(form) {
    console.log(form)
  }

  onCustomCharge(form) {
    console.log(form)
  }

  render() {

    let Content;
    if (this.state.loading) {
      Content = <Loader inline='centered' active style={styles.loader} size='large'>{this.state.status}</Loader>
    } else {
      Content = (
        <TabMenu>
          <Tab default title="Checkout">
            <Checkout cards={this.state.cards} onCharge={this.handleNormalCharge} handleCustomCard={this.handleCustomCard} />
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
        <ChargeModal isOpen={this.state.isOpenChargeModal}
          onClose={this.onModalClose}
          type={this.state.chargeType}
          onNormalCharge={this.onNormalCharge}
          onCustomCharge={this.onCustomCharge} />
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
