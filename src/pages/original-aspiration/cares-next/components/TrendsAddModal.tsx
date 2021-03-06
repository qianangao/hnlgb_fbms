import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TrendsForm from './TrendsForm';

const TrendsAddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = TrendsForm.useForm();
  const [mechanismId, setMechanismId] = useState('');
  const [trendsAddModalVisible, setTrendsAddModalVisible] = useState(false);
  const showModal = id => {
    form.resetFields();
    setMechanismId(id);
    setTrendsAddModalVisible(true);
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
    form.resetFields();
    setMechanismId('');
    setTrendsAddModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCaresNext/addTrends`,
            payload: {
              ...values,
              mechanismId,
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
      title="发布关工动态"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={trendsAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <TrendsForm size="middle" column={1} form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCaresNext/addTrends'],
}))(TrendsAddModal);
