import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Modal, Card, Input, Row, Col, Spin } from 'antd';
const { Search } = Input

class Articulos extends Component {
  render() {
    const {
      TableArticulos, ColumnsArticulos,
      Scroll, Pagination, Size,
      LoadingTableP, SearchTextP,
      OnInputChangeP, OnSearchText,
      TitleModal, VisibleModal,
      OkModal, CancelModal, WithModal,
      LoadCard, LoadTable, TableComprasModal,
      TableExistModal, ColComprasModal,
      ColExistenciasModal, TitleComprasModal,
      TitleExistModal, ScrollTableComprasModal,
      ScrollTableExistModal, DataCard
    } = this.props;
    console.log({ ...this.props })
    return (
      <div>
        <div><Modal
          title={TitleModal}
          closable
          centered
          visible={VisibleModal}
          onOk={OkModal}
          onCancel={CancelModal}
          width={WithModal}
        >
          <div style={{ background: '#ECECEC', padding: '10px' }} >
            <Card loading={LoadCard}>
                <Row>
                  <Col span={12} >
                    <p>Articulo: <span className="highlight">{DataCard.Articulo}</span></p>
                    <p>Nombre: <span className="highlight">{DataCard.Nombre}</span></p>
                    <p>Relacion: <span className="highlight">{DataCard.Relacion}</span></p>
                    <p>CostoExistActual: <span className="highlight">{DataCard.CostoExistActual}</span></p>
                  </Col>
                  <Col span={12} >
                    <p>CostoNetUCBO: <span className="highlight">{DataCard.CostoNetUCBO}</span></p>
                    <p>ExistActualUC: <span className="highlight">{DataCard.ExistActualUC}</span></p>
                    <p>Stock30UC: <span className="highlight">{DataCard.Stock30UC}</span></p>
                  </Col>
                </Row>
            </Card>
          </div>
          <div>
            <br />
            <Table 
              rowKey={(record) => record.uid}
              dataSource={TableComprasModal}
              columns={ColComprasModal}
              bordered
              scroll={{ ...ScrollTableComprasModal }}
              title={TitleComprasModal}
              loading={LoadTable}
              size="small"
            />
            <Table
              rowKey={(record) => record.uid} 
              dataSource={TableExistModal}
              columns={ColExistenciasModal}
              bordered
              scroll={{ ...ScrollTableExistModal }}
              title={TitleExistModal}
              loading={LoadTable}
              size="small"
            />
          </div>
        </Modal>
        </div>
        <Search
          placeholder="Buscar Articulo"
          enterButton="Buscar"
          size="large"
          value={SearchTextP}
          onChange={OnInputChangeP}
          onPressEnter={OnSearchText}
          onSearch={OnSearchText}
        />
        <br />
        <br />
        <Table
          size={Size}
          rowKey={(record) => record.uid}
          columns={ColumnsArticulos}
          dataSource={TableArticulos}
          scroll={{ ...Scroll }}
          pagination={{ ...Pagination }}
          loading={LoadingTableP}
          bordered
          size="middle"
          
        />
      </div>
    )
  }
}

Articulos.propType = {
  SearchTextP: PropType.string,
  TableArticulos: PropType.array.isRequired,
  ColumnsArticulos: PropType.object.isRequired,
  TableCompras: PropType.array.isRequired,
  ColumnsCompras: PropType.array.isRequired,
  TableExistencias: PropType.array.isRequired,
  ColumnsExistencias: PropType.array.isRequired,
  Scroll: PropType.object.isRequired,
  Pagination: PropType.object,
  Size: PropType.string,
  LoadingTableP: PropType.bool,
  OnInputChangeP: PropType.func.isRequired,
  OnPressEnterP: PropType.func.isRequired,
  OnSearchP: PropType.func.isRequired,
  OnSearchText: PropType.func.isRequired,
  //Modal Props
  TitleModal: PropType.string.isRequired,
  VisibleModal: PropType.bool.isRequired,
  OkModal: PropType.func.isRequired,
  CancelModal: PropType.func.isRequired,
  WithModal: PropType.string,
  TableComprasModal: PropType.array.isRequired,
  TableExistModal: PropType.array.isRequired,
  ColComprasModal: PropType.array.isRequired,
  ColExistenciasModal: PropType.array.isRequired,
  TitleComprasModal: PropType.func.isRequired,
  TitleExistModal: PropType.func.isRequired,
  ScrollTableComprasModal: PropType.object.isRequired,
  ScrollTableExistModal: PropType.object.isRequired,
  LoadCard: PropType.bool.isRequired,
  LoadTable: PropType.bool.isRequired,
  DataCard: PropType.object.isRequired,
}

export default Articulos