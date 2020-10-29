import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MedicalGuideForm from './form/MedicalGuideForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = MedicalGuideForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'medicalGuide/save',
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
      type: 'medicalGuide/save',
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
          type: `medicalGuide/addMedicalGuideInfo`,
          payload: {
            ...values,
            address: values.addressData.address,
            longitude: values.addressData.longitude,
            latitude: values.addressData.latitude,
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增就医指南"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MedicalGuideForm form={form} />
    </Modal>
  );
};

export default connect(({ medicalGuide, loading }) => ({
  addModalVisible: medicalGuide.addModalVisible,
  loading: loading.models.medicalGuide,
}))(AddModal);
