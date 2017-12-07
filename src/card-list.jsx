import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import CreditCard from './card'

export default class CardsList extends Component {
    render() {
        const {cards} = this.props

        return (
            <Card.Group itemsPerRow={2}>
                {cards.data.map((card) => <CreditCard card={card}/>)}                
            </Card.Group>
        )
    }
}
