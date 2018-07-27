import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
const { Sider } = Layout;

class SiderApp extends Component {
  render() {
    const { items } = this.props
    return (
      <div>
        <Sider breakpoint='lg' collapsedWidth='0' style={{ height: '100%' }} >
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