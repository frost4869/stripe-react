import React, { Component } from 'react'
import {Header, Container, Card, Divider} from 'semantic-ui-react';

export default class CheckOut extends Component {
    render() {
        return (
            <Container>
                <Header as='h1' className="stripe-header">Checkout</Header>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Choose your card</Card.Header>
                        <Divider/>

                        

                    </Card.Content>
                </Card>
            </Container>
        )
    }
}
