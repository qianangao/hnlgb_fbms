import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityCenterInfoForm from './form/ActivityCenterInfoForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ActivityCenterInfoForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'activityCenter/save',
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
      type: 'activityCenter/save',
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
          type: `activityCenter/addActivityCenterInfo`,
          payload: {
            ...values,
            pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增活动中心"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ActivityCenterInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ activityCenter, loading }) => ({
  addModalVisible: activityCenter.addModalVisible,
  loading: loading.models.activityCenter,
}))(AddModal);
