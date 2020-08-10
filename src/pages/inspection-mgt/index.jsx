import React, { useRef } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import ModifyModal from './components/ModifyModal';

// import styles from './style.less';

const InspectionList = ({ inspectionMgt, dispatch }) => {
  const modifyRef = useRef({});
  const { tableRef } = inspectionMgt;

  const deleteInspection = ids => {
    dispatch({
      type: 'inspectionMgt/deleteInspection',
      payload: {
        ids,
      },
    });
  };

  const openModal = item => {
    modifyRef.current.showModal(item);
  };

  const getInspectionList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'inspectionMgt/getList',
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
    { title: '巡检姓名', dataIndex: 'name', align: 'center' },
    { title: '联系电话', dataIndex: 'phone', align: 'center' },
    { title: '登录凭证', dataIndex: 'password', align: 'center', hideInSearch: true },
    {
      title: '添加时间',
      valueType: 'dateTime',
      align: 'center',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      align: 'center',
      width: 98,
      fixed: 'right',
      render: (id, item) => [
        <a
          key={`${id}up`}
          onClick={() => {
            openModal(item);
          }}
        >
          修改
        </a>,

        <Popconfirm
          title="确认删除该巡检?"
          placement="leftTop"
          onConfirm={() => {
            deleteInspection([id]);
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
        request={params => getInspectionList(params)}
        columns={colunms}
        rowSelection={{}}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            type="primary"
            onClick={() => {
              openModal();
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认删除选择巡检？',
                  content: '一旦确定将无法恢复',
                  onOk: () => {
                    deleteInspection(selectedRowKeys);
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
    </PageHeaderWrapper>
  );
};

export default connect(({ inspectionMgt, loading }) => ({
  inspectionMgt,
  loading: loading.effects['inspectionMgt/getList'],
}))(InspectionList);
