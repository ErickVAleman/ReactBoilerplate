import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterApp extends Component {
  render() {
    return (
      <div>
        <Footer style={{ textAlign: 'center' }}>
          Desarrollado por Erick Villalobos Aleman para Super Promociones
        </Footer>
      </div>
    )
  }
}

export default FooterApp