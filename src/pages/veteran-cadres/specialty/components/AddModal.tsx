import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SpecialtyForm from './form/SpecialtyForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = SpecialtyForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'specialty/save',
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
      type: 'specialty/save',
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
          type: `specialty/addSpecialty`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('新增报错', info);
      });
  };

  return (
    <Modal
      title="新增银色人才"
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
      <SpecialtyForm form={form} />
    </Modal>
  );
};

export default connect(({ specialty, loading }) => ({
  addModalVisible: specialty.addModalVisible,
  loading: loading.models.specialty,
}))(AddModal);
