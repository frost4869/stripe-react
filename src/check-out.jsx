import React, { Component, Text } from 'react'
import { Header, Container, Card, Divider, Button } from 'semantic-ui-react';
import CardList from './card-list';

export default class CheckOut extends Component {

    render() {

        const { cards, onCharge, handleCustomCard } = this.props;

        return (
            <Container>
                <Header as='h1' className="stripe-header">Checkout</Header>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            Choose your card
                            <Button floated='right' basic color='green' onClick={handleCustomCard}>Custom Card</Button>
                        </Card.Header>
                        <Divider style={styles.divider}/>
                        <CardList cards={cards} onCharge={onCharge} />
                    </Card.Content>
                </Card>
            </Container>
        )
    }
}

const styles = {
    divider: {
        marginTop: '25px'
    }
}
