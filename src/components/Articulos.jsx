import React, { Component } from 'react';
import { Table, Button, Modal, Alert, Input } from 'antd';
const { Search } = Input
const apiList = `http://127.0.0.1:3001/api/v1/consulta/articulos`;


class ListaArticulos extends Component {
  state = {
    Lista: [],
    Modal: false
  }

  columns = [
    { title: 'Articulo', dataIndex: 'Articulo', width: '20%' },
    { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '20%' },
    { title: 'Nombre', dataIndex: 'Nombre', width: '20%' },
    { title: 'Descripcion', dataIndex: 'Descripcion', width: '20%' },
    { title: 'Relacion', dataIndex: 'Relacion', width: '20%' },
    { title: 'Ver', width: '20%', fixed: 'rigth', render: (key) => <Button key={key} type="dashed" >Ver</Button> }
  ]

  async componentWillMount() {
    try {
      const req = await fetch(`${apiList}`);
      try {
        const Lista = await req.json();
        this.setState({ Lista })
        console.log(this.state.Lista)
      } catch (error) {
        this.setState({ Lista: [] })
      }
    } catch (error) {
      this.setState({ Lista: [] })
    }
  }

  onModal() {
    this.setState({ Modal: !this.state.Modal })
  }

  render() {
    return (
      <div>
        <Modal
          title="Vertically centered modal dialog"
          wrapClassName="vertical-center-modal"
          visible={this.state.visible}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br/>
        <br/>
        <Table columns={this.columns} dataSource={this.state.Lista} />
      </div>
    )
  }
}
export default ListaArticulos