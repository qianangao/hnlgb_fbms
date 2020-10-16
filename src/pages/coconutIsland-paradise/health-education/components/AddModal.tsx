import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import HealthEducationFrom from './form/HealthEducationForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = HealthEducationFrom.useForm();
  const showModal = () => {
    dispatch({
      type: 'healthEducation/save',
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
      type: 'healthEducation/save',
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
          type: `healthEducation/addHealthEducationInfo`,
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
      title="新增保健教育"
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
      <HealthEducationFrom form={form} />
    </Modal>
  );
};

export default connect(({ healthEducation, loading }) => ({
  addModalVisible: healthEducation.addModalVisible,
  loading: loading.models.healthEducation,
}))(AddModal);
