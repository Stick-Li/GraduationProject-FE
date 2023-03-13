import React from "react";

class Mouse extends React.Component {
    //复用的state
    state = {
        x: 0,
        y: 0
    }
    //操作state的方法
    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    //监听鼠标移动事件
    componentDidMount() {
        window.addEventListener("mousemove", this.handleMouseMove)
    }
    render() {
        return this.props.render(this.state)   //通过函数参数暴露组件内部的状态
        // return this.props.children(this.state)   //通过函数参数暴露组件内部的状态
    }
}

export default Mouse;