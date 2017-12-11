import React, { Component } from 'react'
import { Header, Container, Card, Divider, Button } from 'semantic-ui-react';
import CardList from './card-list';
import ChargeModal from './charge-modal'
import { ErrorAlert, SuccessAlert } from './custom-alert';

export default class CheckOut extends Component {

    render() {

        const { cards, onCharge, handleCustomCard, isOpenModal, onCloseModal, type, onNormalCharge, onCustomCharge, isCharging,
            alertTitle,  showSuccessAlert, showErrorAlert, onConfirmSuccessAlert, onConfimErrorAlert, alertMessage} = this.props;

        return (
            <Container>
                <Header as='h1' className="stripe-header">Checkout</Header>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            Choose your card
                            <Button floated='right' basic color='green' onClick={handleCustomCard}>Custom Card</Button>
                        </Card.Header>
                        <Divider style={styles.divider} />
                        <CardList cards={cards} onCharge={onCharge} />
                    </Card.Content>
                </Card>

                <ChargeModal isOpen={isOpenModal}
                    onClose={onCloseModal}
                    type={type}
                    onNormalCharge={onNormalCharge}
                    onCustomCharge={onCustomCharge}
                    isCharging={isCharging} />

                <SuccessAlert title={alertTitle} onShow={showSuccessAlert}
                    onConfirm={onConfirmSuccessAlert}
                    message={alertMessage} />

                <ErrorAlert title={alertTitle} onShow={showErrorAlert}
                    onConfirm={onConfimErrorAlert}
                    showCancel={true}
                    message={alertMessage} />
            </Container>
        )
    }
}

const styles = {
    divider: {
        marginTop: '25px'
    }
}
