import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Container, Header, Card, Modal, Button } from 'semantic-ui-react'
import CurrencyFormatter from 'react-currency-formatter';
import { Popup, Icon, Label, Menu } from 'semantic-ui-react'
import { TableMenu } from './tab-menu'
import { RefundForm } from './charge-form'

export default class ChargeList extends Component {
    render() {
        const { data, onRefund, refund, onViewDetails, isOpenRefundModal, isOpenPaymentDetailsModal, onModalClose, handleRefresh } = this.props

        const columns = [
            {
                id: 'chargeAmount',
                Header: 'Amount',
                accessor: a => {
                    let currency = a.currency;
                    let amount = currency === 'usd' ? (a.amount / 100) : a.amount;
                    return (
                        <div style={{ color: '#3297d3', fontWeight: 700 }}>
                            <CurrencyFormatter
                                quantity={amount}
                                currency={currency}
                            />
                        </div>
                    )
                },
                maxWidth: 120
            },
            {
                accessor: 'currency',
                maxWidth: 40
            },
            {
                id: 'refundPopup',
                accessor: a => {
                    if (a.amount_refunded > 0) {
                        let currency = a.currency;
                        let refund = currency === 'usd' ? (a.amount_refunded / 100) : a.amount_refunded;
                        let refund_amount = (
                            <div style={{ color: '#3297d3', fontWeight: 700 }}>
                                <CurrencyFormatter
                                    quantity={refund}
                                    currency={currency}
                                />
                            </div>
                        )
                        return (
                            <div style={{ textAlign: 'center' }}>
                                <Popup
                                    trigger={
                                        <Label>
                                            PARTIAL REFUND <Icon style={{ marginLeft: 10 }} name="info circle" />
                                        </Label>
                                    }
                                    content={refund_amount} />
                            </div>

                        )
                    } else {
                        return null
                    }
                },
                width: 164
            },
            {
                id: 'DesId',
                Header: 'Description',
                accessor: d => {
                    let des = d.description;
                    let id = d.id;
                    return (
                        <span>
                            <p>{des} - </p>
                            <p>{id}</p>
                        </span>
                    )
                },
                minWidth: 230
            },
            {
                Header: 'Customer',
                accessor: 'customer',
            },
            {
                Header: 'Time',
                accessor: 'created',
                Cell: props => {
                    let t = new Date(1970, 0, 1);
                    t.setSeconds(props.value);
                    return t.toLocaleString();
                }
            },
            {
                id: 'actions',
                accessor: a => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <Popup
                                flowing
                                hoverable
                                trigger={
                                    <Label><Icon style={styles.icon} name="ellipsis horizontal" /></Label>
                                }>
                                <TableMenu onRefund={onRefund} onViewDetails={onViewDetails}
                                    charge={{ id: a.id, currency: a.currency }} />
                            </Popup>
                        </div>
                    )
                },
                minWidth: 77
            }
        ]
        return (
            <Container>
                <Header as='h1' className="stripe-header">
                    Payments
                    <Button floated='right'  color='blue' onClick={handleRefresh}>Refresh</Button>
                </Header>

                <Card fluid>
                    <Card.Content>
                        <ReactTable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            style={{ height: '500px' }}
                        />
                    </Card.Content>
                </Card>

                <Modal open={isOpenRefundModal} closeOnDimmerClick onClose={onModalClose} size='tiny'>
                    <Modal.Header>Refund</Modal.Header>
                    <Modal.Content>
                        <RefundForm refund={refund} />
                    </Modal.Content>
                </Modal>

                <Modal open={isOpenPaymentDetailsModal} closeOnDimmerClick onClose={onModalClose} size='tiny'>
                    <Modal.Header>Payment Details</Modal.Header>
                    <Modal.Content>
                        <p>Function currentlly developing...</p>
                    </Modal.Content>
                </Modal>
            </Container>

        )
    }
}

const styles = {
    icon: {
        fontSize: '17px',
        margin: 0
    }
}