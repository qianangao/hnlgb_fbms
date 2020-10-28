import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ActivityForm from './ActivityForm';

const ActivityAddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [clubId, setClubId] = useState('');
  const [activityAddModalVisible, setActivityAddModalVisible] = useState(false);
  const showModal = id => {
    form.resetFields();
    setClubId(id);
    setActivityAddModalVisible(true);
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
    setActivityAddModalVisible(false);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCommunity/addActivity`,
            payload: {
              ...values,
              clubId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  return (
    <Modal
      title="发布活动"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={activityAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ActivityForm size="middle" column={1} form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCommunity/addActivity'],
}))(ActivityAddModal);
