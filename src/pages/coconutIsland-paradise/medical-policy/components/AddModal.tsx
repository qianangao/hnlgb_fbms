import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MedicalPolicyFrom from './form/MedicalPolicyForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = MedicalPolicyFrom.useForm();
  const showModal = () => {
    dispatch({
      type: 'medicalPolicy/save',
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
      type: 'medicalPolicy/save',
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
        values.content = values.context;
        dispatch({
          type: `medicalPolicy/addMedicalPolicyInfo`,
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
      title="新增医疗政策"
      centered
      width="900px"
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
      <MedicalPolicyFrom form={form} />
    </Modal>
  );
};

export default connect(({ medicalPolicy, loading }) => ({
  addModalVisible: medicalPolicy.addModalVisible,
  loading: loading.models.medicalPolicy,
}))(AddModal);
