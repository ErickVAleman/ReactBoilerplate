import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import { HeaderApp, FooterApp, SiderApp } from './layout';
import { AskArticulos } from './components';
import Home from './Home.jsx';
import NoMatch from './404.jsx';
import './assets/styles.css'

const { Content } = Layout;
const ItemMenu = [
  { icon: 'home', text: 'Inicio', path: '/'},
  { icon: 'user', text: 'Articulos', path: '/Articulos' },
]

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SiderApp items={ItemMenu} />
          <Layout>
            {/* Header */}
            {/* <HeaderApp /> */}
            {/* Body */}
            <Content style={{ padding: 10 }} >
              <div style={{ padding: 10, minHeight: '86vh' }}>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/Articulos' component={AskArticulos} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Content>
            {/* Footer */}
            <FooterApp />
          </Layout>
        </Layout>
      </div>
    )
  }
}


export default App