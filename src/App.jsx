import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import { HeaderApp, FooterApp, SiderApp } from './layout';
import { Articulos, AskArticulos } from './components';
import Home from './Home.jsx';
import NoMatch from './404.jsx';
import './assets/styles.css'

const { Content } = Layout;
const ItemMenu = [
  { icon: 'home', text: 'Inicio', path: '/'},
  { icon: 'user', text: 'Articulos', path: '/Articulos' },
  { icon: 'user', text: 'test', path: '/test' },
]

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SiderApp items={ItemMenu} />
          <Layout>
            {/* Header */}
            <HeaderApp />
            {/* Body */}
            <Content style={{ padding: '0' }} >
              <div style={{ padding: 24, background: '#fff', minHeight: '86vh' }}>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/Articulos' component={Articulos} />
                  <Route path='/test' component={AskArticulos} />
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