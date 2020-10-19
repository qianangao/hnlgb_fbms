import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import HealthEducationFrom from './form/HealthEducationForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = HealthEducationFrom.useForm();
  const [lgbId, setLgbId] = useState();
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'healthEducation/save',
      payload: {
        modifyModalVisible: true,
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
        modifyModalVisible: false,
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
          type: `healthEducation/updateHealthEducationInfo`,
          payload: {
            ...values,
            id: lgbId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改保健教育"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <HealthEducationFrom form={form} id={lgbId} />
    </Modal>
  );
};

export default connect(({ healthEducation, loading }) => ({
  modifyModalVisible: healthEducation.modifyModalVisible,
  loading: loading.models.healthEducation,
}))(ModifyModal);
