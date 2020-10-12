import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const ActivityModifyModal = ({ dispatch, activityModifyModalVisible, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [activityId, setActivityId] = useState('');
  const showModal = id => {
    setActivityId(id);
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        activityModifyModalVisible: true,
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
  }, [activityId]);

  const hideModal = () => {
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        activityModifyModalVisible: false,
      },
    });
  };
  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaVolunteerTeam/updateActivity`,
          payload: {
            ...values,
            id: activityId,
            publishState: publishStatus ? 0 : 1,
          },
        });
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
  activityModifyModalVisible: oaVolunteerTeam.activityModifyModalVisible,
  activityDetailData: oaVolunteerTeam.activityDetailData,
  loading: loading.models.oaVolunteerTeam,
}))(ActivityModifyModal);
