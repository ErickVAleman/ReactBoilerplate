import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

class HeaderApp extends Component {
  render() {
    return (
      <div>
        <Header style={{ background: '#faad14', textAlign: 'center' }} >
          <h1 style={{ color: '#FFF' }} > Super Promociones Acayucan </h1>
        </Header>
      </div>
    )
  }
}

export default HeaderApp
