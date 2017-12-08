import React, { Component } from 'react'
import { Modal, Header } from 'semantic-ui-react'
import { CardDetailChargeForm, ChargeForm } from './charge-form'

export default class ChargeModal extends Component {
    render() {
        const { isOpen, onClose, type, onNormalCharge, onCustomCharge } = this.props;

        const Form = () => {
            if (type === 'normal') {
                return (
                    <ChargeForm onCharge={onNormalCharge} />
                )
            } else {
                return (
                    <CardDetailChargeForm onCustomCharge={onCustomCharge}/>
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
