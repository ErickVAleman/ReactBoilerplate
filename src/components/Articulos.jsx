import React, { Component } from 'react';
import { Table, Button, Modal, Alert, Input } from 'antd';
import Item from '../../node_modules/antd/lib/list/Item';
const { Search } = Input
const apiList = `http://127.0.0.1:3001/api/v1/consulta/articulos`;


class ListaArticulos extends Component {
  state = {
    Lista: [],
    Modal: false,
    SearchText: '',
  }

  columns = [
    { title: 'Articulo', dataIndex: 'Articulo', width: '20%' },
    { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '20%' },
    { 
      title: 'Nombre', 
      dataIndex: 'Nombre', 
      width: '20%',
      render: (text) => {
        const { SearchText } = this.state;
        return SearchText ? (<span> { text.split(new RegExp(`(?${SearchText})|(?${SearchText})`, 'i')).map((item, index)=>{console.log(item,index)}) } </span>) : 0
      }
    },
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

  onSearch = (SearchText) => {
    this.setState({SearchText})
  }

  onModal() {
    this.setState({ Modal: !this.state.Modal })
  }

  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={(data) => this.onSearch(data)}
          style={{ width: 200 }}
        />
        <br/>
        <br/>
        <Table columns={this.columns} dataSource={this.state.Lista} bordered />
      </div>
    )
  }
}
export default ListaArticulos