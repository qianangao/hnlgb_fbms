import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SpecialtyForm from './form/SpecialtyForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = SpecialtyForm.useForm();
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
            type: `specialty/addSpecialty`,
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
        console.error('新增报错', info);
      });
  };

  return (
    <Modal
      title="新增银发人才"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SpecialtyForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(AddModal);
