import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Modal, Card, Input, Row, Col, Spin } from 'antd';
const { Search } = Input

class Articulos extends Component {
  render() {
    const {
      TableArticulos,
      ColumnsArticulos,
      Scroll,
      Pagination,
      Size,
      LoadingTablePrincipal,
      SearchText
    } = this.props;
    console.log({ ...this.props })
    return (
      <div>
        <Search
          placeholder="Buscar Articulo"
          enterButton="Buscar"
          size="large"
          value={SearchText}
          // onChange={}
          // onPressEnter={}
          // onSearch={}
        />
        <br />
        <br />
        <Table
          size={Size}
          rowKey={(i) => i}
          columns={ColumnsArticulos}
          dataSource={TableArticulos}
          scroll={{ ...Scroll }}
          pagination={{ ...Pagination }}
          loading={LoadingTablePrincipal}
          bordered
        />
      </div>
    )
  }
}

Articulos.propType = {
  SearchText: PropType.string,
  TableArticulos: PropType.array.isRequired,
  ColumnsArticulos: PropType.object.isRequired,
  TableCompras: PropType.array.isRequired,
  ColumnsCompras: PropType.array.isRequired,
  TableExistencias: PropType.array.isRequired,
  ColumnsExistencias: PropType.array.isRequired,
  Scroll: PropType.object.isRequired,
  Pagination: PropType.object,
  Size: PropType.string,
  LoadingTablePrincipal: PropType.bool,
}

export default Articulos