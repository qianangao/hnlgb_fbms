import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import FlowPartyFrom from './form/FlowPartyFrom';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = FlowPartyFrom.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setId(item.id);
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
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `flowParty/updateFlowParty`,
            payload: {
              ...values,
              id,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(() => {});
  };
  return (
    <Modal
      title="修改流动党员登记"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk()}>
          保存
        </Button>,
      ]}
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
        <LgbBasicInfo userId={userId} />
        <FlowPartyFrom form={form} id={id} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.flowParty,
}))(ModifyModal);
