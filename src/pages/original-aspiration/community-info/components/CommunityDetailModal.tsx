import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const CommunityDetail = ({
  dispatch,
  communityDetailModalVisible,
  communityDetailData,
  actionRef,
  enums,
}) => {
  const [communityId, setCommunityId] = useState('');
  const [communityMembers, setCommunityMembers] = useState('');
  const showModal = id => {
    setCommunityId(id);
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        communityDetailModalVisible: true,
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
  }, []);
  useEffect(() => {
    if (communityId) {
      dispatch({
        type: 'oaCommunity/getCommunityDetail',
        payload: { id: communityId },
      });
      const membersArray =
        communityDetailData.memberItems &&
        communityDetailData.memberItems.map((Item, index) => {
          return ` ${index + 1}、${Item.realName}`;
        });
      const members = membersArray && membersArray.join();
      setCommunityMembers(members);
    }
  }, [communityId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        communityDetailModalVisible: false,
      },
    });
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
          {communityDetailData.clubIntroduction}
        </Descriptions.Item>
        <Descriptions.Item label="社团成员">{communityMembers}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ oaCommunity, loading, global }) => ({
  communityDetailModalVisible: oaCommunity.communityDetailModalVisible,
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
  enums: global.enums,
}))(CommunityDetail);
