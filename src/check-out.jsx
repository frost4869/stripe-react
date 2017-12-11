import React, { Component } from 'react'
import { Header, Container, Card, Divider, Button } from 'semantic-ui-react';
import CardList from './card-list';
import ChargeModal from './charge-modal'


export default class CheckOut extends Component {

    render() {

        const { cards, onCharge, handleCustomCard, isOpenModal, onCloseModal, type, onNormalCharge, onCustomCharge, isCharging} = this.props;

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
            </Container>
        )
    }
}

const styles = {
    divider: {
        marginTop: '25px'
    }
}
