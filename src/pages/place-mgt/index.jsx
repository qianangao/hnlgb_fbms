import React, { useRef } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ModifyModal from './components/ModifyModal';
import QRCodeModal from './components/QRCodeModal';

const PlaceList = ({ placeMgt, dispatch }) => {
  const modifyRef = useRef({});
  const qrcodeRef = useRef({});
  const { tableRef } = placeMgt;

  const deletePlace = ids => {
    dispatch({
      type: 'placeMgt/deletePlace',
      payload: {
        ids,
      },
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  const openQRCodeModal = item => {
    qrcodeRef.current.showModal(item);
  };

  const getPlaceList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'placeMgt/getList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  const colunms = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '地点名称', dataIndex: 'placeName', align: 'center' },
    { title: '位置', dataIndex: 'placePosition', align: 'center', hideInSearch: true },
    { title: '地点描述', dataIndex: 'describe', align: 'center', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      align: 'center',
      width: 180,
      fixed: 'right',
      render: (id, item) => [
        <a
          key={`${id}code`}
          onClick={() => {
            openQRCodeModal(item);
          }}
        >
          生成二维码
        </a>,
        <a
          key={`${id}up`}
          onClick={() => {
            openModifyModal(item);
          }}
        >
          修改
        </a>,

        <Popconfirm
          title="确认删除该地址?"
          placement="leftTop"
          onConfirm={() => {
            deletePlace([id]);
          }}
          key={`${id}del`}
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        actionRef={tableRef}
        rowKey="id"
        request={params => getPlaceList(params)}
        columns={colunms}
        rowSelection={{}}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            type="primary"
            onClick={() => {
              openModifyModal();
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认删除选择地址？',
                  content: '一旦确定将无法恢复',
                  onOk: () => {
                    deletePlace(selectedRowKeys);
                  },
                });
              }}
            >
              批量删除
            </Button>
          ),
        ]}
        pagination={{
          showSizeChanger: true,
        }}
      />

      <ModifyModal actionRef={modifyRef} />
      <QRCodeModal actionRef={qrcodeRef} />
    </PageHeaderWrapper>
  );
};

export default connect(({ placeMgt, loading }) => ({
  placeMgt,
  loading: loading.effects['placeMgt/getList'],
}))(PlaceList);
