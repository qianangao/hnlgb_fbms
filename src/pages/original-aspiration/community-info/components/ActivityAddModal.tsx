import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ActivityForm from './ActivityForm';

const ActivityAddModal = ({ dispatch, activityAddModalVisible, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [clubId, setClubId] = useState('');
  const showModal = id => {
    form.resetFields();
    setClubId(id);
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        activityAddModalVisible: true,
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
      type: 'oaCommunity/save',
      payload: {
        activityAddModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaCommunity/addActivity`,
          payload: {
            ...values,
            clubId,
          },
        });
      })
      .catch();
  };

  return (
    <Modal
      title="发布活动"
      centered
      width="80vw"
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

export default connect(({ oaCommunity, loading }) => ({
  activityAddModalVisible: oaCommunity.activityAddModalVisible,
  loading: loading.effects['oaCommunity/addActivity'],
}))(ActivityAddModal);
