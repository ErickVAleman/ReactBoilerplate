import React, { Component } from 'react';
import { Table, Button, Modal, Alert, Input } from 'antd';
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
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      render: (text) => {
        const { SearchText } = this.state;
        return SearchText ? (<span> { text.split(new RegExp(`(<=${SearchText})|(=${SearchText})`, 'i')).map((fragment, i)=>(
          fragment.toLowerCase() === SearchText.toLowerCase()
            ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
        )) } </span>) : text
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
        this.setState({ Lista: null })
      }
    } catch (error) {
      this.setState({ Lista: null })
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
        { this.state.Lista.length 
          ? <Table columns={this.columns} dataSource={this.state.Lista} bordered /> 
          : <span>{this.state.Lista.message}</span> }
      </div>
    )
  }
}
export default ListaArticulos