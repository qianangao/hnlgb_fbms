import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ReceiveFileForm from './form/ReceiveFileForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ReceiveFileForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'receiveFile/save',
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
      type: 'receiveFile/save',
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
          type: `receiveFile/addReceiveFile`,
          payload: {
            ...values,
            isRelease: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title="新增收发文件"
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
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ReceiveFileForm form={form} />
    </Modal>
  );
};

export default connect(({ receiveFile, loading }) => ({
  addModalVisible: receiveFile.addModalVisible,
  loading: loading.models.receiveFile,
}))(AddModal);
