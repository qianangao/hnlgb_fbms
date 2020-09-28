import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import StaffDirectoryForm from './form/StaffDirectoryForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = StaffDirectoryForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'staffDirectory/save',
      payload: {
        modifyModalVisible: true,
      },
    });
  };
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'staffDirectory/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };
  return (
    <Modal
      title="工作人员电话簿详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
      footer={null}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <StaffDirectoryForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ staffDirectory, loading }) => ({
  modifyModalVisible: staffDirectory.modifyModalVisible,
  loading: loading.models.staffDirectory,
}))(ModifyModal);
