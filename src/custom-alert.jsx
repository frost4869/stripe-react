import React, { Component } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

export class SuccessAlert extends Component {
    render() {
        return (
            <SweetAlert title={this.props.title}
                success
                confirmBtnBsStyle='positive'
                show={this.props.onShow}
                onConfirm={this.props.onConfirm}>
              
                {this.props.message}
            
            </SweetAlert>
        )
    }
}

export class ErrorAlert extends Component {
    render() {
        return (
            <SweetAlert title={this.props.title}
                danger
                confirmBtnBsStyle='negative'
                show={this.props.onShow}
                onConfirm={this.props.onConfirm}
                showCancel={this.props.showCancel}>
              
                {this.props.message}
            
            </SweetAlert>
        )
    }
}