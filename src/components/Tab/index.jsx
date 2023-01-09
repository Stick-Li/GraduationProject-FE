import React, { useState } from 'react';


const Index = (props) => {
    const { tabInfo } = props
    const tabKeys = Object.keys(tabInfo)
    const [selected, setSelected] = useState(tabKeys[0])
    const chooseBtn = (index) => {
        setSelected(index)
    }
    return (
        <>
            <div>
                {
                    tabKeys.map((value) => {
                        console.log(value === selected)
                        return <button key={value}
                            style={value === selected ? { backgroundColor: 'white' } : { backgroundColor: '#ccc' }}
                            onClick={() => chooseBtn(value)}>{value}</button>
                    })
                }
            </div>
            {tabInfo[selected]}
        </>
    );
}

export default Index;
