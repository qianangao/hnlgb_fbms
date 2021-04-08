import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import OnlineClassForm from './form/OnlineClassForm';

const AddModal = ({ dispatch, actionRef, loading, tableType }) => {
  const [form] = OnlineClassForm.useForm();
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
            type: `onlineClass/addOnlineClass`,
            payload: {
              name: values.name,
              type: values.type,
              url: values.url,
              photoAttachmentId: values.cephFileInfo && values.cephFileInfo.uid,
              fileId: values.fileInfo && values.fileInfo.uid,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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
      <OnlineClassForm form={form} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineClass,
}))(AddModal);
