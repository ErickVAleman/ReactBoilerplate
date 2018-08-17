import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Modal, Card, Input, Row, Col, Spin } from 'antd';
const { Search } = Input
const apiList = `http://192.168.123.63:3001/api/v1/consulta/articulos`;


class ListaArticulos extends Component {
  state = {
    data: [],
    filterDropdownVisible: false,
    searchText: '',
    loading: false,
    loadingSearch: false,
    pagination: {},
    itemdata: {},
    modal2Visible: false
  }

  componentDidMount () {
    this.setState({ loading: true });
    if (localStorage.getItem('data')) {
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
        if (lista) {
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
        }
        this.setState(
          {
            data: lista,
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
    this.setState({ searchText: e.target.value });
    console.log(this.state.searchText)
  }

  onClickChangeItem = (e) => {
    this.setState({ itemdata: e });
  }

  setModal2Visible() {
    this.setState({ modal2Visible: !this.state.modal2Visible, loadingSearch: !this.state.loadingSearch, itemdata: {} });
  }

  fetchArticulo = async (e) => {
    this.setModal2Visible()
    try {
      const metadata = await fetch(e.URL);
      try {
        const data = await metadata.json();
        this.setState({ itemdata: data, loadingSearch: !this.state.loadingSearch})
        console.log(this.state.itemdata)
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
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
      {
        title: 'Nombre',
        dataIndex: 'Nombre',
        width: '20%',
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      },
      { title: 'Articulo', dataIndex: 'Articulo', width: '10%' },
      { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '20%' },
      { title: 'Descripcion', dataIndex: 'Descripcion', width: '20%' },
      { title: 'Relacion', dataIndex: 'Relacion', width: '20%' },
      {
        title: 'Ver',
        width: '20%',
        fixed: 'rigth',
        render: (e) => {
          return <Button type="primary" shape="circle" icon="search" onClick={() => this.fetchArticulo(e)} />
        },
      }
    ]
    const columnsCompras = [
      {
        title: 'Cajas',
        dataIndex: 'CantidadRegularUC',
        key: 'CantidadRegularUC',
        with: '20%'
      },
      {
        title: 'Costo por caja',
        dataIndex: 'CostoUnitarioNetoUC',
        key: 'CostoUnitarioNetoUC',
        with: '20%'
      },
      {
        title: 'Fecha',
        dataIndex: 'Fecha',
        key: 'Fecha',
        with: '20%'
      },
      {
        title: 'NombreTercero',
        dataIndex: 'NombreTercero',
        key: 'NombreTercero',
        with: '20%'
      }];
    const columnsExistencias = [
      {
        title: 'Suc',
        dataIndex: 'Suc',
        key: 'Suc',
        with: '20%',
        fixed: 'left'
      },
      {
        title: 'CostoExist',
        dataIndex: 'CostoExist',
        key: 'CostoExist',
        with: '20%'
      },
      {
        title: 'CostoNet',
        dataIndex: 'CostoNet',
        key: 'CostoNet',
        with: '20%'
      },
      {
        title: 'CostoNetUC',
        dataIndex: 'CostoNetUC',
        key: 'CostoNetUC',
        with: '20%'
      },
      {
        title: 'ExistUC',
        dataIndex: 'ExistUC',
        key: 'ExistUC',
        with: '20%'
      },
      {
        title: 'ExistUV',
        dataIndex: 'ExistUV',
        key: 'ExistUV',
        with: '20%'
      },
      {
        title: 'Stock30',
        dataIndex: 'Stock30',
        key: 'Stock30',
        with: '20%'
      },
      {
        title: 'Stock30UC',
        dataIndex: 'Stock30UC',
        key: 'Stock30UC',
        with: '20%'
      },
    ]
    const { itemdata } = this.state;
    return (
      <div>
        {
          this.state.itemdata.length ? <h1>{this.state.itemdata.message}</h1>
            : <div><Modal
              title={itemdata.Nombre}
              closable
              centered
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible()}
              width="60%"
            >
              <Spin spinning={this.state.loadingSearch} tip="loading...." >
                <div style={{ background: '#ECECEC', padding: '10px' }} >
                  <Row gutter={16} >
                    <Col span={12} >
                      <Card >
                        <p>Articulo: <span className="highlight">{itemdata.Articulo}</span></p>
                        <p>Nombre: <span className="highlight">{itemdata.Nombre}</span></p>
                        <p>Relacion: <span className="highlight">{itemdata.Relacion}</span></p>
                        <p>CostoExistActual: <span className="highlight">{itemdata.CostoExistActual}</span></p>
                      </Card>
                    </Col>
                    <Col span={12} >
                      <Card >
                        <p>CostoNetUCBO: <span className="highlight">{itemdata.CostoNetUCBO}</span></p>
                        <p>ExistActualUC: <span className="highlight">{itemdata.ExistActualUC}</span></p>
                        <p>Stock30UC: <span className="highlight">{itemdata.Stock30UC}</span></p>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div>
                  <br />
                  <Table dataSource={itemdata.compras} columns={columnsCompras} bordered scroll={{ x: 500 }} title={() => 'Compras'} />
                  <Table dataSource={itemdata.existencias} columns={columnsExistencias} bordered scroll={{ x: 750 }} title={() => 'Existencias'} />
                </div>
              </Spin>
            </Modal>
            </div>
        }
        <Search
          placeholder="Buscar Articulo"
          enterButton="Buscar"
          size="large"
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
          onSearch={this.onSearch}
        />
        <br />
        <br />
        <Table
          rowKey={(record, i) => i}
          columns={columns}
          dataSource={this.state.data}
          bordered
          pagination={this.state.pagination}
          loading={this.state.loading}
          size='middle'
          scroll={{x:800, y:400}}
          pagination={{ pageSize: 100 }}
        />
      </div>
    )
  }
}
export default ListaArticulos
