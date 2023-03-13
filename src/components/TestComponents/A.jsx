import React, { Component } from 'react'

import wrapWithUsername from './WrappedComponent'

class Welcome extends Component {
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
            <div>welcome {this.props.username}</div>
        )
    }
}
Welcome = wrapWithUsername(Welcome);

export default Welcome;