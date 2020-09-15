import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CaresForm from './CaresForm';

const CaresAddModal = ({ dispatch, caresAddModalVisible, actionRef, loading }) => {
  const [form] = CaresForm.useForm();
  const showModal = () => {
    form.resetFields();
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        caresAddModalVisible: true,
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
      type: 'oaCaresNext/save',
      payload: {
        caresAddModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaCaresNext/addCares`,
          payload: {
            ...values,
          },
        });
      })
      .catch();
  };

  return (
    <Modal
      title="新增关工组织"
      centered
      width="50vw"
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

export default connect(({ oaCaresNext, loading }) => ({
  caresAddModalVisible: oaCaresNext.caresAddModalVisible,
  loading: loading.effects['oaCaresNext/addCares'],
}))(CaresAddModal);
