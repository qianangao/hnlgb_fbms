import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import OutRegisterForm from './form/OutRegisterForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = OutRegisterForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const [outRegisterId, setOutRegisterId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const showModal = item => {
    setLgbId(item.userId);
    setOutRegisterId(item.id);
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
    setOutRegisterId('');
    setLgbId('');
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `outRegister/updateOutRegisterInfo`,
            payload: {
              ...values,
              id: lgbId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改外出登记"
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
        <Descriptions title="外出登记" size="middle" />
        <OutRegisterForm form={form} id={outRegisterId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.outRegister,
}))(ModifyModal);
