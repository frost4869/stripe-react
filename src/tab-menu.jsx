import React, { Component } from 'react'
import { Container, Menu, Grid, Transition } from 'semantic-ui-react';

export class TabMenu extends Component {

    constructor(props) {
        super(props)

        //this is so wrong, Change later !
        let defaultTab;
        React.Children.map(this.props.children, (child) => {
            if (child.props.default) {
                defaultTab = child.props.title
            }
        })
        this.state = {
            activeItem: defaultTab,
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name,
        })
    }

    render() {

        const Tab = React.Children.map(this.props.children, (child) => {
            const tabName = child.props.title;
            const activeTab = this.state.activeItem === tabName;
            return (
                <Menu.Item name={tabName} active={activeTab} onClick={this.handleItemClick}>
                    {tabName}
                </Menu.Item>
            )
        })

        let TabContent;
        React.Children.map(this.props.children, (child) => {
            if (child.props.title === this.state.activeItem) {
                TabContent = child;
            }
        })

        return (
            <Container>
                <Grid>
                    <Grid.Column width={3}>
                        <Menu vertical>
                            {Tab}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={13}>
                        <Transition animation='fade' duration={5000}>
                            {TabContent}
                        </Transition>
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

export class Tab extends Component {
    render() {
        return this.props.children;
    }
}

export class TableMenu extends Component {
    render() {
        const {onRefund, onViewDetails, charge} = this.props;
        return (
            <Menu vertical>
                <Menu.Item>
                    <Menu.Header>Actions</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='refund' onClick={() => onRefund(charge)}/>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Connections</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='detail' onClick={() => onViewDetails(charge)}>
                            Payment Details
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }
}
