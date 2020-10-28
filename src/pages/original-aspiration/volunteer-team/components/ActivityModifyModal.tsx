import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const ActivityModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [activityId, setActivityId] = useState('');
  const [activityModifyModalVisible, setActivityModifyModalVisible] = useState(false);
  const showModal = id => {
    setActivityId(id);
    setActivityModifyModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, [activityId]);

  const hideModal = () => {
    setActivityModifyModalVisible(false);
    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaVolunteerTeam/updateActivity`,
            payload: {
              ...values,
              id: activityId,
              publishState: publishStatus ? 0 : 1,
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
      title="编辑团队活动"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={activityModifyModalVisible}
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

export default connect(({ oaVolunteerTeam, loading }) => ({
  activityDetailData: oaVolunteerTeam.activityDetailData,
  loading: loading.models.oaVolunteerTeam,
}))(ActivityModifyModal);
