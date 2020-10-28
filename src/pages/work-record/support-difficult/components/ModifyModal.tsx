import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import SupportDifficultForm from './form/SupportDifficultForm';

const ModifyModal = ({ dispatch, loading, actionRef, tableType }) => {
  const [form] = SupportDifficultForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [visitId, setSupportDifficultId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setSupportDifficultId(item.id);
    setUserId(item.userId);
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `wrSupportDifficult/updateSupportDifficult`,
            payload: {
              ...values,
              id: visitId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };
  return (
    <Modal
      title={`编辑${tableType === '1' ? '特困补助申请' : '遗孀补助申请'}`}
      centered
      destroyOnClose
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
      <LgbBasicInfo userId={userId} />
      <Descriptions title="困难帮扶" size="middle" />
      <SupportDifficultForm form={form} id={visitId} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ wrSupportDifficult, loading }) => ({
  modifyModalVisible: wrSupportDifficult.modifyModalVisible,
  loading: loading.effects['wrSupportDifficult/updateSupportDifficult'],
}))(ModifyModal);
