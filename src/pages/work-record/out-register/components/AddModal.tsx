import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OutRegisterForm from './form/OutRegisterForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = OutRegisterForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'outRegister/save',
      payload: {
        addModalVisible: true,
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
      type: 'outRegister/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `outRegister/addOutRegisterInfo`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增外出登记"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OutRegisterForm form={form} />
    </Modal>
  );
};

export default connect(({ outRegister, loading }) => ({
  addModalVisible: outRegister.addModalVisible,
  loading: loading.models.outRegister,
}))(AddModal);
