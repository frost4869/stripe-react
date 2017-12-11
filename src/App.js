import React, { Component } from 'react';
import './App.css';
import { Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { TabMenu, Tab } from './tab-menu';
import Checkout from './check-out';
import Keys from './keys.json';
import ChargeList from './charge-list';
import Spinner from 'react-spinkit';
import { ErrorAlert, SuccessAlert } from './custom-alert';

//create keys.json in /src to import your own keys
const customer_id = Keys.customer_id;
const secret_key = Keys.secret_key;
const public_key = Keys.public_key;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      charges: [],
      loading: true,
      status: '',
      isOpenChargeModal: false,
      chargeType: 'normal',
      card_id: '', //this is so wrong in so many level,
      charge: {},
      showSuccessAlert: false,
      showErrorAlert: false,
      alertTitle: '',
      alertMessage: '',
      isCharging: false,
      isRefunding: false,
      isOpenRefundModal: false,
      isOpenPaymentDetailsModal: false
    }

    this.handleNormalCharge = this.handleNormalCharge.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleCustomCard = this.handleCustomCard.bind(this);
    this.onNormalCharge = this.onNormalCharge.bind(this);
    this.onCustomCharge = this.onCustomCharge.bind(this);
    this.onRefund = this.onRefund.bind(this);
    this.onViewDetails = this.onViewDetails.bind(this);
    this.refund = this.refund.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  async fetchCard() {
    const charge_uri = `https://api.stripe.com/v1/customers/${customer_id}/sources?object=card`;
    this.setState({
      status: 'Loading Cards...'
    })
    await fetch(charge_uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret_key}`,
      }
    })
      .then((data) => data.json())
      .then((cards) => {
        this.setState({
          cards,
        })
      })
  }

  handleNormalCharge(card_id) {
    this.setState({
      chargeType: 'normal',
      isOpenChargeModal: true,
      card_id, // oh the humanity
    })
  }

  async componentDidMount() {
    await this.fetchCard();
    await this.fetchCharges();
    this.setState({
      loading: false,
      status: ''
    })
  }

  onModalClose() {
    this.setState({
      isOpenChargeModal: false,
      isOpenPaymentDetailsModal: false,
      isOpenRefundModal: false
    })
  }

  handleCustomCard() {
    this.setState({
      chargeType: 'custom',
      isOpenChargeModal: true
    })
  }

  async onNormalCharge(data) {
    const charge_uri = `https://api.stripe.com/v1/charges`;
    this.setState({
      status: 'Charging...',
      isCharging: true
    })

    await fetch(charge_uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `amount=${data.amount}&currency=${data.currency}&customer=${customer_id}&description=${data.description}&source=${this.state.card_id}`
    }).then((data) => data.json())
      .then((response) => {
        if (response.status === 'succeeded') {
          this.setState({
            showSuccessAlert: true,
            alertMessage: 'Charge id: ' + response.id,
            alertTitle: 'Done !',
            isCharging: false
          })
        } else {
          if (response.error) {
            this.setState({
              showErrorAlert: true,
              alertMessage: response.error.message,
              alertTitle: 'Error !'
            })
          }
        }
      })
  }

  async onCustomCharge(data) {
    const charge_uri = `https://api.stripe.com/v1/charges`;
    const tokens_uri = `https://api.stripe.com/v1/tokens`;
    this.setState({
      status: 'Charging...',
      isCharging: true
    })

    await fetch(tokens_uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${public_key}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `card[number]=${data.cardNumber}&card[exp_month]=${data.expireMonth}&card[exp_year]=${data.expireYear}`
    }).then((data) => data.json())
      .then((response) => {
        if (response.id) {
          fetch(charge_uri, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${secret_key}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `amount=${data.amount}&currency=${data.currency}&description=${data.description}&source=${response.id}`
          }).then((data) => data.json())
            .then((response) => {
              if (response.status === 'succeeded') {
                this.setState({
                  showSuccessAlert: true,
                  alertMessage: 'Charge id: ' + response.id,
                  alertTitle: 'Done !',
                  isCharging: false
                })
              } else {
                if (response.error) {
                  this.setState({
                    showErrorAlert: true,
                    alertMessage: response.error.message,
                    alertTitle: 'Error !'
                  })
                }
              }
            })
        } else {
          if (response.error) {
            this.setState({
              showErrorAlert: true,
              alertMessage: response.error.message,
              alertTitle: 'Error !'
            })
          }
        }
      })
  }

  async fetchCharges() {
    const charge_uri = `https://api.stripe.com/v1/charges?limit=100`;
    this.setState({
      status: 'Loading Charges...'
    })
    await fetch(charge_uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret_key}`,
      }
    })
      .then((data) => data.json())
      .then((charges) => {
        this.setState({
          charges,
        })
      })
  }

  onRefund(charge) {
    this.setState({
      isOpenRefundModal: true,
      charge
    })
  }

  async refund(data) {
    const charge = this.state.charge;
    const refund_uri = `https://api.stripe.com/v1/refunds`;
    this.setState({
      isRefunding: true
    })

    await fetch(refund_uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `charge=${charge.id}&amount=${data.amount}&reason=${data.reason}`
    }).then((data) => data.json())
      .then((response) => {
        if (response.status === 'succeeded') {
          this.setState({
            showSuccessAlert: true,
            alertMessage: 'Refund id: ' + response.id,
            alertTitle: 'Done !',
            isCharging: false
          })
        } else {
          if (response.error) {
            this.setState({
              showErrorAlert: true,
              alertMessage: response.error.message,
              alertTitle: 'Error !'
            })
          }
        }
      })
  }

  onViewDetails(charge) {
    this.setState({
      isOpenPaymentDetailsModal: true,
    })
  }

  handleRefresh(){
    this.setState({
      charges:[]
    }, async () => {
      await this.fetchCharges();
    })
  }

  render() {

    let Content;
    if (this.state.loading) {
      Content = (
        <div className="ui text" style={styles.loader}>
          <Spinner name="double-bounce" fadeIn='none' style={{ width: '60px', height: '60px', margin: 'auto' }}></Spinner>
          <p>
            {this.state.status}
          </p>
        </div>
      )
    } else {
      Content = (
        <TabMenu>
          <Tab default title="Checkout">
            <Checkout cards={this.state.cards}
              onCharge={this.handleNormalCharge}
              handleCustomCard={this.handleCustomCard}
              isOpenModal={this.state.isOpenChargeModal}
              onCloseModal={this.onModalClose}
              type={this.state.chargeType}
              onNormalCharge={this.onNormalCharge}
              onCustomCharge={this.onCustomCharge}
              isCharging={this.state.isCharging}
            />
          </Tab>
          <Tab title="Payments">
            <ChargeList data={this.state.charges.data} onRefund={this.onRefund} refund={this.refund}
              onViewDetails={this.onViewDetails}
              isOpenRefundModal={this.state.isOpenRefundModal}
              isOpenPaymentDetailsModal={this.state.isOpenPaymentDetailsModal}
              onModalClose={this.onModalClose} 
              handleRefresh={this.handleRefresh}/>
          </Tab>
        </TabMenu>
      )
    }

    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>Stripe React</Header>
        {Content}

        <SuccessAlert title={this.state.alertTitle} onShow={this.state.showSuccessAlert}
          onConfirm={() => this.setState({ showSuccessAlert: false })}
          message={this.state.alertMessage} />

        <ErrorAlert title={this.state.alertTitle} onShow={this.state.showErrorAlert}
          onConfirm={() => this.setState({ showErrorAlert: false })}
          showCancel={true}
          message={this.state.alertMessage} />
      </Container>
    );
  }
}

const styles = {
  loader: {
    position: 'fixed',
    top: '40%',
    right: 0,
    left: 0,
    zIndex: 1000,
    textAlign: 'center'
  }
}


export default App;
