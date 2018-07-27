import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterApp extends Component {
  render() {
    return (
      <div>
        <Footer style={{ textAlign: 'center' }}>
          Super Promociones de Acayucan
        </Footer>
      </div>
    )
  }
}

export default FooterApp