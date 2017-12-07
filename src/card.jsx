import React, { Component } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import visa_logo from './VISA.jpg';
import mastercard_logo from './mastercard.png';

export default class CreditCard extends Component {
    render() {
        const { card } = this.props;
        const card_logo = card.brand === 'Visa' ? visa_logo : mastercard_logo;
        return (
            <Card>
                <Card.Content>
                    <Image floated='right' size='small' src={card_logo} />
                    <Card.Header>
                        {card.name}
                    </Card.Header>
                    <Card.Meta>
                        ...{card.last4} - {card.country}
                    </Card.Meta>
                    <Card.Description>
                        <strong>Expires: {card.exp_month} / {card.exp_year}</strong>
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <div className='ui buttons'>
                        <Button basic color='blue'>Charge</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}
