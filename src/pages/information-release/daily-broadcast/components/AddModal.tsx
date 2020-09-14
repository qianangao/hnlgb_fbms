import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DailyBroadcastForm from './form/DailyBroadcastForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = DailyBroadcastForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'dailyBroadcast/save',
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
      type: 'dailyBroadcast/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `dailyBroadcast/addDailyBroadcast`,
          payload: {
            ...values,
            status: publishStatus ? 0 : 1,
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增每日播报"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
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
      <DailyBroadcastForm form={form} />
    </Modal>
  );
};

export default connect(({ dailyBroadcast, loading }) => ({
  addModalVisible: dailyBroadcast.addModalVisible,
  loading: loading.models.dailyBroadcast,
}))(AddModal);
