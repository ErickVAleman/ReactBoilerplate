import React, { Component } from 'react';
import { Table, Button, Modal, Alert, Input, Pagination } from 'antd';
const { Search } = Input
const apiList = `http://192.168.123.63:3001/api/v1/consulta/articulos`;


class ListaArticulos extends Component {
  state = {
    data : [],
    filterDropdownVisible: false,
    searchText: '',
    loading: false,
    pagination: {}
  }

  componentDidMount(){
    this.setState({ loading: true });
    if(localStorage.getItem('data')){
      const data = localStorage.getItem('data')
      const pagination = { ...this.state.pagination };
      pagination.position = 'both';
     
      this.setState(
        {
          data: JSON.parse(data),
          loading: false,
          pagination
        }
      )
      return;
    }
    fetch(apiList)
    .then(data => data.json())
    .then(lista => {
      const pagination = { ...this.state.pagination };
      pagination.position = 'both';
      localStorage.setItem('data', JSON.stringify(lista));
      console.log(lista)
      const data = localStorage.getItem('data')
      this.setState(
        {
          data: JSON.parse(data),
          loading: false,
          pagination
        }
      )
      return;
    })
    .catch(e => {
      console.log(e)
    })
  }

  onInputChange = (e) => {
    console.log()
    this.setState({ searchText: e.target.value });
  }


  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'mgi');
    let data = JSON.parse(localStorage.getItem('data'))
    this.setState({
      filterDropdownVisible: false,
      data: data.map((record) => {
        const match = record.Nombre.match(reg);
        console.log(reg)
        if (!match) {
          return null;
        }
        return {
          ...record,
          Nombre: (
            <span>
              {record.Nombre.split(reg).map((text, i) => {
                return (
                  i > 0 ? [<span key={i} className="highlight">{match[0]}</span>, text] : text
                )
              })}
            </span>
          ),
          Descripcion: (
            <span>
              {record.Descripcion.split(reg).map((text, i) => {
                return (
                  i > 0 ? [<span key={i} className="highlight">{match[0]}</span>, text] : text
                )
              })}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  render() {
    const columns = [
      { title: 'Articulo', dataIndex: 'Articulo', width: '10%' },
      { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '14%' },
      {
        title: 'Nombre',
        dataIndex: 'Nombre',
        width: '20%',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>Search</Button>
          </div>
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
  
      },
      { title: 'Descripcion', dataIndex: 'Descripcion', width: '30%' },
      { title: 'Relacion', dataIndex: 'Relacion', width: '20%' },
      {
        title: 'Ver', width: '20%', fixed: 'rigth',
      }
    ]
    return (
      <div>
        <Table 
          rowKey={(record, i) => i}
          columns={columns} 
          dataSource={this.state.data} 
          bordered 
          pagination={this.state.pagination}
          loading={this.state.loading}
          />
      </div>
    )
  }
}
export default ListaArticulos
