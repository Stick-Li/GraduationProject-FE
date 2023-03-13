import React, { Component } from 'react'

import wrapWithUsername from './WrappedComponent'

class Goodbye extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: ''
    //     }
    // }

    // componentDidMount() {
    //     let username = localStorage.getItem('user_key');
    //     this.setState({
    //         username: username
    //     })
    // }

    render() {
        return (
            <div>goodbye {this.props.username}</div>
        )
    }
}

Goodbye = wrapWithUsername(Goodbye);

export default Goodbye;