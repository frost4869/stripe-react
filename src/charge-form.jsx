import React, { Component } from 'react'
import { Form, TextArea, Button, Dropdown } from 'semantic-ui-react'
import Spinner from 'react-spinkit'

export class ChargeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            currency: '',
            description: ''
        }

        this.handleInputChanges = this.handleInputChanges.bind(this)
        this.handleCurrencyChanges = this.handleCurrencyChanges.bind(this);
    }

    handleInputChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCurrencyChanges = (e, { value }) => {
        this.setState({
            currency: value
        })
    }

    render() {

        const { onCharge, currencies, isCharging } = this.props
        let spinner = null;
        if (isCharging) {
            spinner = <Spinner fadeIn='none' style={styles.loader} name="line-scale" color="steelblue" />
        }
        return (
            <Form>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' name="amount" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <Dropdown search selection placeholder='Currency' name="currency" options={currencies} onChange={this.handleCurrencyChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description' name="description" onChange={this.handleInputChanges} />
                </Form.Field>
                <Button type='button' primary onClick={(e) => { onCharge(this.state) }}>Charge</Button>
                {spinner}
            </Form>
        )
    }
}


export class CardDetailChargeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardNumber: '',
            expireMonth: 0,
            expireYear: 0,
            amount: '',
            currency: '',
            description: ''
        }

        this.handleInputChanges = this.handleInputChanges.bind(this)
        this.handleCurrencyChanges = this.handleCurrencyChanges.bind(this);
    }

    handleInputChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCurrencyChanges = (e, { value }) => {
        this.setState({
            currency: value
        })
    }

    render() {

        const { onCustomCharge, currencies, isCharging } = this.props
        let spinner = null;
        if (isCharging) {
            spinner = <Spinner fadeIn='none' style={styles.loader} name="line-scale" color="steelblue" />
        }
        return (
            <Form>
                <Form.Field>
                    <label>Card Number</label>
                    <input placeholder='Card Number' name="cardNumber" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Expire Month</label>
                    <input placeholder='Expire Month' name="expireMonth" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Expire Year</label>
                    <input placeholder='Expire Year' name="expireYear" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' name="amount" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <Dropdown search selection placeholder='Currency' name="currency" options={currencies} onChange={this.handleCurrencyChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description' name="description" onChange={this.handleInputChanges} />
                </Form.Field>
                <Button type='button' primary onClick={(e) => { onCustomCharge(this.state) }}>Charge</Button>
                {spinner}
            </Form>
        )
    }
}

export class RefundForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amountl: '',
            reason: '',
            description: '',
            reason_options: [
                { value: 'duplicate', text: 'Duplicate' },
                { value: 'fraudulent', text: 'Fraudulent' },
                { value: 'requested_by_customer', text: 'Requested by Customer' },
            ]
        }
        this.handleCurrencyChanges = this.handleCurrencyChanges.bind(this)
        this.handleInputChanges = this.handleInputChanges.bind(this)
    }

    handleInputChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCurrencyChanges = (e, { value }) => {
        this.setState({
            reason: value
        })
    }

    render() {
        const { refund, isRefunding } = this.props
        let spinner = null;
        if (isRefunding) {
            spinner = <Spinner fadeIn='none' style={styles.loader} name="line-scale" color="steelblue" />
        }
        return (
            <Form>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' name="amount" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Reason</label>
                    <Dropdown search selection placeholder='Reason' name="reason" options={this.state.reason_options} onChange={this.handleCurrencyChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description' name="description" onChange={this.handleInputChanges} />
                </Form.Field>
                <Button type='button' primary onClick={(e) => { refund(this.state) }}>Charge</Button>
                {spinner}
            </Form>
        )
    }
}

const styles = {
    loader: {
        display: 'inline-block',
        position: 'absolute',
        right: 0,
    }
}