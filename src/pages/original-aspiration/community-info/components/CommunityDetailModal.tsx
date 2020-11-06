import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableMembers from './TableMembers';

const CommunityDetail = ({ dispatch, communityDetailData, actionRef, enums }) => {
  const [communityId, setCommunityId] = useState('');
  const [communityDetailModalVisible, setCommunityDetailModalVisible] = useState(false);
  const showModal = id => {
    if (id) {
      dispatch({
        type: 'oaCommunity/getCommunityDetail',
        payload: { id },
      });
    }
    setCommunityId(id);
    setCommunityDetailModalVisible(true);
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
    setCommunityDetailModalVisible(false);
    setCommunityId('');
  };

  return (
    <Modal
      title="社团详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={communityDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="社团名称">{communityDetailData.clubName}</Descriptions.Item>
        <Descriptions.Item label="社团类型">
          {enums.dictClubType && enums.dictClubType[communityDetailData.dictClubType]}
        </Descriptions.Item>
        <Descriptions.Item label="社团简介">
          <pre> {communityDetailData.clubIntroduction}</pre>
        </Descriptions.Item>
      </Descriptions>
      <TableMembers id={communityId} />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading, global }) => ({
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
  enums: global.enums,
}))(CommunityDetail);
