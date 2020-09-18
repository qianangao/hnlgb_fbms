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
      width="900px"
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
      <Descriptions size="middle">
        <div style={{ margin: '5px' }}>
          <h2 style={{ textAlign: 'center' }}>{trendsDetailData.theme}</h2>
          <div style={{ textAlign: 'center' }}>
            发布单位：{trendsDetailData.organizationName}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
            {trendsDetailData.createTime}
          </div>
          <hr style={{ color: '#CCCCCC' }} />
          <div
            dangerouslySetInnerHTML={{
              __html: trendsDetailData.content,
            }}
          />
        </div>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  trendsDetailModalVisible: oaCaresNext.trendsDetailModalVisible,
  trendsDetailData: oaCaresNext.trendsDetailData,
  loading: loading.models.oaCaresNext,
}))(TrendsDetailModal);
