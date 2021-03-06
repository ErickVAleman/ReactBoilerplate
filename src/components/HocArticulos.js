import React, { Component } from 'react';
import { Button } from 'antd'
import ViewArticulos from './ViewArticulos.jsx';
const api = `https://api-superpromociones-spa.herokuapp.com/api/v1/consulta/articulos`;

class HocArticulos extends Component {
  state = {
    search: '',
    articulo: '',
    data: [],
    dataSelected: [],
    artData: {},
    visibleModal: false,
    loadcard: true,
    loadtable: true,
    loadtablep: true

  }
  fetch = async url => {
    try {
      const objeto = await fetch(url);
      const json = await objeto.json();
      return json;
    } catch (e) {
      console.error(e)
    }
  }
  onSearchPrincipal = (i) => {
    this.setState({search: i.target.value})
  }
  onSearch = () => {
    const { search } = this.state;
    const reg = new RegExp(search, 'mgi');
    let data = JSON.parse(localStorage.getItem('data'))
    this.setState({
      filterDropdownVisible: false,
      data: data.map((record) => {
        const match = record.Nombre.match(reg);
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

  getSearchArticle = async url => {
    this.setState({visibleModal: true})
    const artData = await this.fetch(url)
    if(artData) this.setState({artData,loadcard: false, loadtable: false})
    return;
  }

  switchModalState = () => {
    this.setState(
      {
        visibleModal: !this.state.visibleModal, 
        artData: {},
        loadcard: true,
        loadtable: true,

      }
    )
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      ...record  // Column configuration not to be checked
    }),
  };
  

  async componentDidMount() {
    const data = await this.fetch(api)
    localStorage.removeItem('data')
    localStorage.setItem('data', JSON.stringify(data))
    this.setState({data, loadtablep: false})
  }
  render(){
    const columns = [
      { key: 1 ,title: 'Nombre', dataIndex: 'Nombre', width: '180', fixed: 'left',},
      { key: 2 ,title: 'Articulo', dataIndex: 'Articulo', width: '12%' },
      { key: 3 ,title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '15%' },
      { key: 4 ,title: 'Descripcion', dataIndex: 'Descripcion', width: '30%' },
      { key: 5 ,title: 'Relacion', dataIndex: 'Relacion', width: '12%' },
      {
        key: 6,
        title: 'Ver',
        width: '5%',
        fixed: 'rigth',
        render: (e) => {
          return <Button type="primary" shape="circle" icon="search" onClick={() => this.getSearchArticle(e.URL)} />
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
    const { artData } = this.state
    const { compras, existencias, ...dataC } = artData
    return <div>
      <ViewArticulos 
        ColumnsArticulos={columns}
        TableArticulos={this.state.data} 
        Scroll={{x: 1200, y: 400}}
        Pagination={{ pageSize: 100 }}
        LoadingTableP={this.state.loadtablep}
        SearchTextP={this.state.search}
        OnInputChangeP={this.onSearchPrincipal}
        OnSearchText={this.onSearch}
        OkModal={this.switchModalState}
        CancelModal={this.switchModalState}
        WithModal={800}

        TitleModal='Ver Articulo'
        VisibleModal={this.state.visibleModal}
        ColComprasModal={columnsCompras}
        TableComprasModal={compras}
        ScrollTableComprasModal={{x:800}}
        ColExistenciasModal={columnsExistencias}
        TableExistModal={existencias}
        ScrollTableExistModal={{x:800}}
        LoadCard={this.state.loadcard}
        LoadTable={this.state.loadtable} 
        DataCard={dataC}
        TitleComprasModal={() => 'Compras'}
        TitleExistModal={() => 'Existencias'}
        RowSelectionProp= {this.rowSelection}
      /></div>
  }
}
export default HocArticulos