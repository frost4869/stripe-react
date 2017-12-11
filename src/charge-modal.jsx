import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { CardDetailChargeForm, ChargeForm } from './charge-form'
import SupportedCurrencies from './supported-currencies.json'

const currencies = SupportedCurrencies.map((c) => {
    return {
        key: c,
        value: c,
        text: c,
    }
})

console.log(currencies);

export default class ChargeModal extends Component {
    render() {
        const { isOpen, onClose, type, onNormalCharge, onCustomCharge, isCharging } = this.props;

        const Form = () => {
            if (type === 'normal') {
                return (
                    <ChargeForm onCharge={onNormalCharge} currencies={currencies} isCharging={isCharging}/>
                )
            } else {
                return (
                    <CardDetailChargeForm onCustomCharge={onCustomCharge} currencies={currencies} isCharging={isCharging}/>
                )
            }

        };


        return (
            <Modal open={isOpen} closeOnDimmerClick onClose={onClose} size='tiny'>
                <Modal.Header>Charge</Modal.Header>
                <Modal.Content>
                    <Form/>
                </Modal.Content>
            </Modal>
        )
    }
}
