import { Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import BranchActivityForm from './form/BranchActivityForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = BranchActivityForm.useForm();
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

  // 获取userIds
  const changeFormat = params => {
    const userArr = [];
    params.forEach(item => {
      if (item) {
        userArr.push(item.id);
      }
    });
    return userArr;
  };

  const handleOk = publishState => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          ...values,
          publishState: publishState ? 0 : 1, // 状态 0：保存 1：发布
          photoAttachmentId: values.picAttachmentInfo && values.picAttachmentInfo.uid,
          fileId: values.attachmentInfo && values.attachmentInfo.uid,
        };
        if (values.isUser === 1) {
          payload.userIds = changeFormat(values.userIds);
        }
        return new Promise(resolve => {
          dispatch({
            type: `branchActivity/addBranchActivity`,
            payload,
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
      title="新增支部活动"
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
      <BranchActivityForm form={form} />
    </Modal>
  );
};

export default connect(({ loading, branchActivity }) => ({
  loading: loading.models.branchActivity,
  branchActivity,
}))(AddModal);
