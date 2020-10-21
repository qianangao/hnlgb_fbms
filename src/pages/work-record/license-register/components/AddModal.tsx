import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import LicenseRegisterForm from './form/LicenseRegisterForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = LicenseRegisterForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'licenseRegister/save',
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
      type: 'licenseRegister/save',
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
        values.addressCode = values.address.value;
        values.address = values.address.label;
        dispatch({
          type: `licenseRegister/addLicenseRegisterInfo`,
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
      title="新增证照登记"
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
      <LicenseRegisterForm form={form} />
    </Modal>
  );
};

export default connect(({ licenseRegister, loading }) => ({
  addModalVisible: licenseRegister.addModalVisible,
  loading: loading.models.licenseRegister,
}))(AddModal);
