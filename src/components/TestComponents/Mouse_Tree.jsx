import React from "react";
import Mouse from "./Mouse.jsx";
import img from "../../assets/gengerMan.png"

class Mouse_Cat extends React.Component {
    render() {
        return (
            <div>
                <Mouse render={mouse => {
                    return (
                        <p>X坐标为：{mouse.x} Y坐标为：{mouse.y}</p>
                    )
                }} />
                <Mouse render={mouse => {
                    return (
                        <img src={img} alt="树" style={{
                            position: 'absolute',
                            top: mouse.y,
                            left: mouse.x
                        }} />
                    )
                }} />
                {/* <Mouse>
                    {
                        mouse => {
                            return (
                                <p>X坐标为：{mouse.x} Y坐标为：{mouse.y}</p>
                            )
                        }
                    }
                </Mouse>
                <Mouse>
                    {
                        mouse => {
                            return (
                                <img src={img} alt="姜饼人" style={{
                                    position: 'absolute',
                                    top: mouse.y,
                                    left: mouse.x
                                }} />
                            )
                        }
                    }
                </Mouse> */}
            </div>
        )
    }
}

export default Mouse_Cat;