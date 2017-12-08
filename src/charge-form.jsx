import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'

export class ChargeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            currency: '',
            description: ''
        }

        this.handleInputChanges = this.handleInputChanges.bind(this)
    }

    handleInputChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { onCharge } = this.props

        return (
            <Form>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' name="amount" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <input placeholder='Currency' name="currency" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description' name="description" onChange={this.handleInputChanges} />
                </Form.Field>
                <Button type='button' primary onClick={(e) => { onCharge(this.state) }}>Charge</Button>
            </Form>
        )
    }
}


export class CardDetailChargeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardNumber: '',
            expireMont: 0,
            expireYear: 0,
            amount: '',
            currency: '',
            description: ''
        }

        this.handleInputChanges = this.handleInputChanges.bind(this)
    }

    handleInputChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { onCustomCharge } = this.props

        return (
            <Form>
                <Form.Field>
                    <label>Card Number</label>
                    <input placeholder='Card Number' name="cardNumber" onChange={this.handleInputChanges} />
                </Form.Field>
                <Form.Field>
                    <label>Expire Month</label>
                    <input placeholder='Expire Month' name="expireMont" onChange={this.handleInputChanges} />
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
                    <input placeholder='Currency' name="currency" onChange={this.handleInputChanges} />
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
