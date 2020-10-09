import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembersModify from './TableMembersModify';

const CommunityModifyModal = ({
  dispatch,
  memberModifyModalVisible,
  communityDetailData,
  actionRef,
}) => {
  const [communityId, setCommunityId] = useState('');

  const showModal = id => {
    setCommunityId(id);
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        memberModifyModalVisible: true,
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
    }
  }, [communityId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        memberModifyModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="编辑社团成员信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={memberModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[]}
    >
      <TableMembersModify id={communityDetailData.id} />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  memberModifyModalVisible: oaCommunity.memberModifyModalVisible,
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
}))(CommunityModifyModal);
