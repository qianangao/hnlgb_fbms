import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import BranchActivityForm from './form/BranchActivityForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = BranchActivityForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
  };

  const handleOk = publishState => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `branchActivity/updateBranchActivity`,
            payload: {
              id: lgbId,
              activityAdd: values.activityAdd,
              activityDate: values.activityDate,
              activityName: values.activityName,
              context: values.context,
              host: values.host,
              partyName: values.partyName,
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
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改支部活动"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
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
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <BranchActivityForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ branchActivity, loading }) => ({
  modifyModalVisible: branchActivity.modifyModalVisible,
  loading: loading.models.branchActivity,
}))(ModifyModal);
