import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

const ModifyModal = ({ dispatch, loading, actionRef, enums }) => {
  const [lgbId, setLgbId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const { tableRef } = actionRef;

  const showModal = id => {
    setLgbId(id);
    setModifyModalVisible(true);
  };
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '积分', width: 64, align: 'center', dataIndex: 'integral', hideInSearch: true },
    {
      title: '积分类型',
      align: 'center',
      width: 100,
      dataIndex: 'dictIntegralType',
      valueEnum: enums.dictIntegralType,
    },

    { title: '说明', align: 'center', dataIndex: 'remarks', hideInSearch: true },
    {
      title: '记录添加人',
      width: 100,
      align: 'center',
      dataIndex: 'createUserName',
      hideInSearch: true,
    },
    {
      title: '记录时间',
      width: 120,
      align: 'center',
      dataIndex: 'integralTime',
      hideInSearch: true,
    },
  ];

  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcPointsMgt/pointsRecords',
        payload: { ...params, userId: lgbId },
        resolve,
      });
    });

  const hideModal = () => {
    setLgbId('');
    setModifyModalVisible(false);
  };

  return (
    <Modal
      title="查看积分记录"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      destroyOnClose
      visible={modifyModalVisible}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <ProTable
          headerTitle="积分记录"
          actionRef={tableRef}
          options={false}
          // search={false}
          scroll={{ x: 'max-content' }}
          request={async params => getList(params)}
          columns={columns}
        />
      </div>
    </Modal>
  );
};
export default connect(({ loading, global }) => ({
  loading: loading.models.specialty,
  enums: global.enums,
}))(ModifyModal);
