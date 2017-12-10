import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Container, Header, Card } from 'semantic-ui-react'

export default class ChargeList extends Component {
    render() {
        const { data } = this.props
        const columns = [
            {
                Header: 'Id',
                accessor: 'id'
            },
            {
                Header: 'Amount',
                accessor: 'amount'
            },
            {
                Header: 'Currency',
                accessor: 'currency'
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'Time',
                accessor: 'created',
                Cell: props => { new Date(props.value).toDateString() }
            },
        ]
        return (
            <Container>
                <Header as='h1' className="stripe-header">Payments</Header>
                <Card fluid>
                    <Card.Content>
                        <ReactTable
                            data={data}
                            columns={columns}
                        />
                    </Card.Content>
                </Card>
            </Container>

        )
    }
}
