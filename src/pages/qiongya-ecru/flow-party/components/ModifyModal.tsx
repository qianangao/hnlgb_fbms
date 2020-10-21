import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import FlowPartyFrom from './form/FlowPartyFrom';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = FlowPartyFrom.useForm();
  const [id, setId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setId(item.id);
    setUserId(item.userId);
    dispatch({
      type: 'flowParty/save',
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
      type: 'flowParty/save',
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
        dispatch({
          type: `flowParty/updateFlowParty`,
          payload: {
            ...values,
            id,
          },
        });
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

export default connect(({ flowParty, loading }) => ({
  modifyModalVisible: flowParty.modifyModalVisible,
  loading: loading.models.flowParty,
}))(ModifyModal);
