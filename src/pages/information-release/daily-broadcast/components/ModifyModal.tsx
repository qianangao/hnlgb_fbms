import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DailyBroadcastForm from './form/DailyBroadcastForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = DailyBroadcastForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'dailyBroadcast/save',
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
      type: 'dailyBroadcast/save',
      payload: {
        modifyModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = status => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `dailyBroadcast/updateDailyBroadcast`,
          payload: {
            ...values,
            id: lgbId,
            status: status ? 0 : 1,
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改每日播报"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <DailyBroadcastForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ dailyBroadcast, loading }) => ({
  modifyModalVisible: dailyBroadcast.modifyModalVisible,
  loading: loading.models.dailyBroadcast,
}))(ModifyModal);
