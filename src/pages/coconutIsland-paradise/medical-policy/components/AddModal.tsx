import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MedicalPolicyFrom from './form/MedicalPolicyForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = MedicalPolicyFrom.useForm();
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
        values.content = values.context;
        return new Promise(resolve => {
          dispatch({
            type: `medicalPolicy/addMedicalPolicyInfo`,
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

export default connect(({ loading }) => ({
  loading: loading.models.medicalPolicy,
}))(AddModal);
