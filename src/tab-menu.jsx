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
            visible: false
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name,
            visible: !this.state.visible
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
                    <Grid.Column width={4}>
                        <Menu vertical>
                            {Tab}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
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
