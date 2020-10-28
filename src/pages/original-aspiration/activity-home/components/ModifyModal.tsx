import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = ActivityForm.useForm();
  const [activityId, setActivityId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const showModal = item => {
    setActivityId(item.id);
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

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaActivityHome/updateActivity`,
            payload: {
              ...values,
              isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
              id: activityId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };
  return (
    <Modal
      title="编辑活动信息"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      destroyOnClose
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <ActivityForm form={form} id={activityId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaActivityHome/updateActivity'],
}))(ModifyModal);
