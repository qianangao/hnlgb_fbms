import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OnlineRegistrationForm from './form/OnlineRegistrationForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = OnlineRegistrationForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'onlineRegistration/save',
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
      type: 'onlineRegistration/save',
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
          type: `onlineRegistration/addOnlineRegistrationInfo`,
          payload: {
            title: values.title,
            context: values.context,
            coreAdd: values.coreAdd,
            fileId: values.attachmentInfo.uid,
            urlId: values.attachmentInfo2.uid,
            pushStatus: 0,
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增网络报名"
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
      <OnlineRegistrationForm form={form} />
    </Modal>
  );
};

export default connect(({ onlineRegistration, loading }) => ({
  addModalVisible: onlineRegistration.addModalVisible,
  loading: loading.models.onlineRegistration,
}))(AddModal);
