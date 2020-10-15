import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import OnlineClassForm from './form/OnlineClassForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = OnlineClassForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'onlineClass/save',
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
      type: 'onlineClass/save',
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
          type: `onlineClass/addOnlineClass`,
          payload: {
            name: values.name,
            type: values.type,
            url: values.url,
            photoAttachmentId: values.picAttachmentInfo ? values.picAttachmentInfo.uid : undefined,
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
      title="新增网络课堂"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
      ]}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OnlineClassForm form={form} />
    </Modal>
  );
};

export default connect(({ onlineClass, loading }) => ({
  addModalVisible: onlineClass.addModalVisible,
  loading: loading.models.onlineClass,
}))(AddModal);
