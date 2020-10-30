import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import LicenseRegisterForm from './form/LicenseRegisterForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = LicenseRegisterForm.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const showModal = () => {
    setAddModalVisible(true);
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
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `licenseRegister/addLicenseRegisterInfo`,
            payload: {
              ...values,
              passCheckPhotoId: values.passCheckPhoto && values.passCheckPhoto.uid,
              passportPhotoId: values.passportPhoto && values.passportPhoto.uid,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <LicenseRegisterForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.licenseRegister,
}))(AddModal);
