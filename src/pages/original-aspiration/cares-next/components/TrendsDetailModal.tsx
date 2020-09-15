import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const TrendsDetailModal = ({ dispatch, trendsDetailModalVisible, trendsDetailData, actionRef }) => {
  const [trendsId, setTrendsId] = useState('');
  const showModal = id => {
    setTrendsId(id);
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        trendsDetailModalVisible: true,
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

    if (trendsId) {
      dispatch({
        type: 'oaCaresNext/getTrendsDetail',
        payload: { id: trendsId },
      });
    }
  }, [trendsId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        trendsDetailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="关工动态详情"
      centered
      width="50vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={trendsDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="主题">{trendsDetailData.theme}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{trendsDetailData.createTime}</Descriptions.Item>
        <Descriptions.Item label="发布单位">{trendsDetailData.organizationName}</Descriptions.Item>
        <Descriptions.Item label="内容">{trendsDetailData.content}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  trendsDetailModalVisible: oaCaresNext.trendsDetailModalVisible,
  trendsDetailData: oaCaresNext.trendsDetailData,
  loading: loading.models.oaCaresNext,
}))(TrendsDetailModal);
