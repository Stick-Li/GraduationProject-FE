import React, { Component } from 'react'

export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: ''
            }
        }

        componentDidMount() {
            let username = localStorage.getItem('user_key').slice(0, 10);
            this.setState({
                username: username
            })
        }

        render() {
            return (
                <WrappedComponent username={this.state.username} />
            )
        }
    }
    return NewComponent
}
