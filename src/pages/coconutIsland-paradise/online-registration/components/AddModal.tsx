import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OnlineRegistrationForm from './form/OnlineRegistrationForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OnlineRegistrationForm.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const showModal = () => {
    setAddModalVisible(true);
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
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
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
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(AddModal);
