import React, { Component } from 'react';
import { Table, Button } from 'antd';

const apiList = `http://127.0.0.1:3001/api/v1/productos`;
const modal = () => (
  <Modal
    title="Vertically centered modal dialog"
    wrapClassName="vertical-center-modal"
    visible={this.state.modal2Visible}
    onOk={() => this.setModal2Visible(false)}
    onCancel={() => this.setModal2Visible(false)}
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </Modal>
)
const columns = [
  { title: 'Articulo', dataIndex: 'Articulo', width: '20%' },
  { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '20%' },
  { title: 'Nombre', dataIndex: 'Nombre', width: '20%' },
  { title: 'Descripcion', dataIndex: 'Descripcion', width: '20%' },
  { title: 'Relacion', dataIndex: 'Relacion', width: '20%' },
  { title: 'Ver', width: '20%', render: () => <Button type="dashed" onClick={modal}>Ver</Button> }
]

class ListaArticulos extends Component {
  state = {
    Lista: []
  }

  async componentWillMount() {
    try {
      const req = await fetch(`${apiList}?articulo=*cor*8*`);
      try {
        const Lista = await req.json();
        this.setState({ Lista: Lista.bo.data })
        console.log(this.state.Lista)
      } catch (error) {
        this.setState({ Lista: [] })
      }
    } catch (error) {
      this.setState({ Lista: [] })
    }
  }

  render() {
    return <Table columns={columns} dataSource={this.state.Lista} />
  }
}
export default ListaArticulos