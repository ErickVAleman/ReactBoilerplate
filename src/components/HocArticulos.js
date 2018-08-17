import React, { Component } from 'react';
import ViewArticulos from './ViewArticulos.jsx';
const columns = [
  { title: 'Nombre', dataIndex: 'Nombre', width: '20%',},
  { title: 'Articulo', dataIndex: 'Articulo', width: '10%' },
  { title: 'CodigoBarras', dataIndex: 'CodigoBarras', width: '20%' },
  { title: 'Descripcion', dataIndex: 'Descripcion', width: '20%' },
  { title: 'Relacion', dataIndex: 'Relacion', width: '20%' },
  { title: 'Ver', width: '20%', fixed: 'rigth',}
]
class HocArticulos extends Component {
  render(){
    return <div><ViewArticulos 
      ColumnsArticulos={columns} 
      Scroll={{x: 800, y: 400}}
      Pagination={{ pageSize: 100 }}
      Size='small'
      LoadingTablePrincipal={false}
      /></div>
  }
}
export default HocArticulos