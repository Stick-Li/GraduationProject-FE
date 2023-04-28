import { Button } from 'antd';
import React, { useContext, createContext, useState, useEffect } from 'react';

const TestContext = createContext();

const Navbar = () => {
  const { username } = useContext(TestContext)

  return (
    <div className="navbar">
      <p>Navbar:{username}</p>
      <Messages />
    </div>
  )
}

const Messages = () => {
  const { username } = useContext(TestContext)
  console.log('触发渲染', username)
  useEffect(() => {
    console.log('触发执行')
  }, [username]);
  return (
    <div className="messages">
      <p>1 message for :{username}</p>
    </div>
  )
}


const Index = () => {

  // if (Math.random() > 0.5) {
  //   useState(10000) // eslint-disable-line no-unused-vars
  // }
  // if (Math.random() > 0.5) {
  //   useState(10000, 'key1');
  // }

  const [value, setValue] = useState(0);

  const [useName, setUseName] = useState('superawesome');



  return (
    // <>
    //   <TestContext.Provider
    //     value={{
    //       username: useName,
    //     }}
    //   >
    //     <div className="test">
    //       <Navbar />
    //       <Button onClick={() => setUseName('🍩')}>点击改变context</Button>
    //     </div>
    //   </TestContext.Provider>
    // </>
    <div>
      <button onClick={() => setValue(value + 1)}>+</button>
      {value}
    </div>
  )
}

export default Index;
