import { Input } from 'antd';
import React from 'react';
const { TextArea } = Input;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const App = () => (
  <TextArea
    showCount
    maxLength={500}
    style={{
      height: 120,
    }}
    onChange={onChange}
  />
);

export default App;