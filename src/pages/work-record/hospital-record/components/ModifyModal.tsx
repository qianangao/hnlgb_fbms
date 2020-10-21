import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import HospitalRegistrationForm from './form/HospitalRegistrationForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = HospitalRegistrationForm.useForm();
  const [lgbId, setLgbId] = useState();
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'hospitalRegistration/save',
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
      type: 'hospitalRegistration/save',
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
        values.addressCode = values.address.value;
        values.address = values.address.label;
        dispatch({
          type: `hospitalRegistration/updateHospitalRegistrationInfo`,
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
      title="修改住院登记"
      centered
      width="95vw"
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
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <LgbBasicInfo userId={lgbId} />
        <Descriptions title="住院登记" size="middle" />
        <HospitalRegistrationForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ hospitalRegistration, loading }) => ({
  modifyModalVisible: hospitalRegistration.modifyModalVisible,
  loading: loading.models.hospitalRegistration,
}))(ModifyModal);
