import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
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

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `activityCenter/addActivityCenterInfo`,
          payload: {
            ...values,
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
      onOk={handleOk}
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
