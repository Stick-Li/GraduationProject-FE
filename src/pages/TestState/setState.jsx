import React, { Component } from 'react';

class SetState extends Component {
    state = {
        num: 0,
        num2: 10
    }
    // 18版本后和之前不一样，下面这个2号函数里setState本来应该是同步的
    changeNum = () => {
        console.log('setNum前', this.state.num)
        this.setState({ num: this.state.num + 1 })
        console.log('setNum前', this.state.num)
    }
    changeNum2 = () => {
        console.log('setNum2前', this.state.num2)
        setTimeout(() => {
            this.setState({ num2: this.state.num2 + 10 })
            console.log('setNum2前', this.state.num2)
        },1000);
    }
    render() {
        return (
            <div>
                <button onClick={() => { this.changeNum() }}>{this.state.num}</button>
                <button onClick={() => { this.changeNum2() }}>{this.state.num2}</button>
            </div>
        );
    }
}

export default SetState;
