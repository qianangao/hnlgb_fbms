import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ReceiveFileForm from './form/ReceiveFileForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ReceiveFileForm.useForm();
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

  // 获取userList
  const changeFormat = params => {
    const userArr = [];
    params.forEach(item => {
      if (item) {
        userArr.push(item.id);
      }
    });
    return userArr;
  };
  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          ...values,
          isRelease: publishStatus ? 0 : 1,
          enclosureId: values.attachmentInfo && values.attachmentInfo.uid,
        };
        if (payload.userList) {
          payload.strList = changeFormat(payload.userList);
        }
        if (payload.receiveList) {
          payload.strList = changeFormat(payload.receiveList);
        }
        dispatch({
          type: `receiveFile/addReceiveFile`,
          payload,
        });
        form.resetFields();
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

export default connect(({ loading }) => ({
  loading: loading.models.receiveFile,
}))(AddModal);
