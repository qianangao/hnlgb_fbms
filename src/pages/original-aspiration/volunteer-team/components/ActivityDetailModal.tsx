import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DetailFormPage from '@/components/DetailFormPage';

const ActivityDetailModal = ({
  dispatch,
  activityDetailModalVisible,
  activityDetailData,
  actionRef,
}) => {
  const [activityId, setActivityId] = useState('');
  const showModal = id => {
    setActivityId(id);
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        activityDetailModalVisible: true,
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

    if (activityId) {
      dispatch({
        type: 'oaVolunteerTeam/getActivityDetail',
        payload: { id: activityId },
      });
    }
  }, [activityId]);

  const hideModal = () => {
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        activityDetailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="活动详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={activityDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <DetailFormPage
        title={activityDetailData.activityName}
        orgName={activityDetailData.releaseOrganizationName}
        releaseTime={activityDetailData.releaseTime}
        content={activityDetailData.context}
      />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  activityDetailModalVisible: oaVolunteerTeam.activityDetailModalVisible,
  activityDetailData: oaVolunteerTeam.activityDetailData,
  loading: loading.models.oaVolunteerTeam,
}))(ActivityDetailModal);
