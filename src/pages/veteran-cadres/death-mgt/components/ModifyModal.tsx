import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import DeathInfoForm from './DeathInfoForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DeathInfoForm.useForm();
  const [deathValues, setDeathValues] = useState();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const showModal = deathFormValues => {
    setDeathValues(deathFormValues);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
    setDeathValues(undefined);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `vcDeathInfo/updateLgb`,
            payload: {
              ...values,
              id: deathValues.id,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="编辑离世信息"
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
      <LgbBasicInfo userId={deathValues && deathValues.userId} />
      <Descriptions title="离世信息" size="middle" />
      <DeathInfoForm form={form} deathValues={deathValues} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.vcDeathInfo,
}))(ModifyModal);
