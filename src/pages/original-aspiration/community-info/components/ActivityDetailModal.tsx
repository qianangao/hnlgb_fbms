import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

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
      type: 'oaCommunity/save',
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
        type: 'oaCommunity/getActivityDetail',
        payload: { id: activityId },
      });
    }
  }, [activityId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCommunity/save',
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
      <Descriptions size="middle">
        <div style={{ margin: '5px' }}>
          <h2 style={{ textAlign: 'center' }}>{activityDetailData.theme}</h2>
          <div style={{ textAlign: 'center' }}>
            发布单位：{activityDetailData.organizationName}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
            {activityDetailData.createTime}
          </div>
          <hr style={{ color: '#CCCCCC' }} />
          <div
            dangerouslySetInnerHTML={{
              __html: activityDetailData.content,
            }}
          />
        </div>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  activityDetailModalVisible: oaCommunity.activityDetailModalVisible,
  activityDetailData: oaCommunity.activityDetailData,
  loading: loading.models.oaCommunity,
}))(ActivityDetailModal);
