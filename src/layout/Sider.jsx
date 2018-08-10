import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Card, Avatar } from 'antd';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
const { Sider } = Layout;
const { Meta } = Card;

class SiderApp extends Component {
  render() {
    const { items } = this.props
    return (
      <div>
        <Sider breakpoint='lg' collapsedWidth='0' style={{ height: '100%' }} >
          <div className="logo" ><img src={logo} alt="SPA"/></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${items.length}`]}>
            {items.map((item, key) => (
              <Menu.Item key={key + 1}>
                <Link to={item.path} >
                  <Icon type={item.icon} />
                  <span className="nav-text">{item.text}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </div>
    )
  }
}

SiderApp.propTypes = {
  items: PropTypes.array.isRequired,
}

export default SiderApp