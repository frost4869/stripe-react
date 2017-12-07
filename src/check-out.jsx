import React, { Component } from 'react'
import {Header, Container, Card, Divider} from 'semantic-ui-react';
import CardList from './card-list';

export default class CheckOut extends Component {

    render() {

        const {cards} = this.props;

        return (
            <Container>
                <Header as='h1' className="stripe-header">Checkout</Header>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Choose your card</Card.Header>
                        <Divider/>
                        <CardList cards={cards}/>
                    </Card.Content>
                </Card>
            </Container>
        )
    }
}
