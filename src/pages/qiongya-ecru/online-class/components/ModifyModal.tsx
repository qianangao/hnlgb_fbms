import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import OnlineClassForm from './form/OnlineClassForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = OnlineClassForm.useForm();
  const [onlineClassId, setOnlineClassId] = useState('');
  const showModal = item => {
    setOnlineClassId(item.id);
    dispatch({
      type: 'onlineClass/save',
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
      type: 'onlineClass/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `onlineClass/updateOnlineClass`,
          payload: {
            id: onlineClassId,
            name: values.name,
            type: values.type,
            url: values.url,
            photoAttachmentId: values.picAttachmentInfo ? values.picAttachmentInfo.uid : undefined,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改网络课堂"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
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
        <OnlineClassForm form={form} id={onlineClassId} />
      </div>
    </Modal>
  );
};

export default connect(({ onlineClass, loading }) => ({
  modifyModalVisible: onlineClass.modifyModalVisible,
  loading: loading.models.onlineClass,
}))(ModifyModal);
