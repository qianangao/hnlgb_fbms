import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import SpecialtyForm from './form/SpecialtyForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = SpecialtyForm.useForm();
  const [infoId, setInfoId] = useState('');
  const [lgbId, setLgbId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const showModal = item => {
    setInfoId(item.id);
    setLgbId(item.userId);
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
    setInfoId('');
    setLgbId('');
    setModifyModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `specialty/updateSpecialty`,
            payload: {
              ...values,
              id: infoId,
              userId: lgbId,
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
      title="修改银发人才"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
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
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <LgbBasicInfo userId={lgbId} />
        <Descriptions title="银发人才" size="middle" />
        <SpecialtyForm form={form} id={infoId} />
      </div>
    </Modal>
  );
};
export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(ModifyModal);
