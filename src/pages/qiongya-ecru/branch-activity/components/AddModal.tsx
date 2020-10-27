import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
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

  const handleOk = publishState => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `branchActivity/addBranchActivity`,
            payload: {
              activityAdd: values.activityAdd,
              activityDate: values.activityDate,
              activityName: values.activityName,
              dictActivityChildType: values.dictOrgLife,
              context: values.context,
              host: values.host,
              partyId: values.partyId,
              publishState: publishState ? 0 : 1, // 状态 0：保存 1：发布
              photoAttachmentId: values.picAttachmentInfo
                ? values.picAttachmentInfo.uid
                : undefined,
              fileId: values.attachmentInfo ? values.attachmentInfo.uid : undefined,
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

export default connect(({ loading }) => ({
  loading: loading.models.branchActivity,
}))(AddModal);
