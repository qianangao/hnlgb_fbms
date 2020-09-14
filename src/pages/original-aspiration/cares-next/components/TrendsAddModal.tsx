import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TrendsForm from './TrendsForm';

const TrendsAddModal = ({ dispatch, trendsAddModalVisible, actionRef, loading }) => {
  const [form] = TrendsForm.useForm();
  const [mechanismId, setMechanismId] = useState('');
  const showModal = id => {
    form.resetFields();
    setMechanismId(id);
    dispatch({
      type: 'vcCaresNext/save',
      payload: {
        trendsAddModalVisible: true,
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
      type: 'vcCaresNext/save',
      payload: {
        trendsAddModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `vcCaresNext/addTrends`,
          payload: {
            ...values,
            mechanismId,
          },
        });
      })
      .catch();
  };

  return (
    <Modal
      title="发布关工动态"
      centered
      width="80vw"
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

export default connect(({ vcCaresNext, loading }) => ({
  trendsAddModalVisible: vcCaresNext.trendsAddModalVisible,
  loading: loading.effects['vcCaresNext/addTrends'],
}))(TrendsAddModal);
