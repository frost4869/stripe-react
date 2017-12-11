import React, { Component } from 'react'
import { Form, TextArea, Button, Dropdown, Loader, Dimmer } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

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

        const { onCharge, currencies } = this.props

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
                <Loader inverted={true} />
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

        const { onCustomCharge, currencies } = this.props

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
            </Form>
        )
    }
}

const styles = {
    loader: {
        position: 'fixed',
        top: '40%',
        right: 0,
        zIndex: 100000,
        color: 'black'
    }
}