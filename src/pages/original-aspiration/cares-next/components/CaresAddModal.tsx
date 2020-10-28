import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CaresForm from './CaresForm';

const CaresAddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = CaresForm.useForm();
  const [caresAddModalVisible, setCaresAddModalVisible] = useState(false);
  const showModal = () => {
    form.resetFields();
    setCaresAddModalVisible(true);
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
    setCaresAddModalVisible(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCaresNext/addCares`,
            payload: {
              ...values,
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
      title="新增关工组织"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={caresAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <CaresForm size="middle" column={1} form={form} caresFormData={{}} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCaresNext/addCares'],
}))(CaresAddModal);
