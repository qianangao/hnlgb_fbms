import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CommunityForm from './CommunityForm';

const CommunityModifyModal = ({
  dispatch,
  communityModifyModalVisible,
  communityDetailData,
  actionRef,
}) => {
  const [form] = CommunityForm.useForm();
  const [communityId, setCommunityId] = useState('');

  const showModal = id => {
    setCommunityId(id);
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        communityModifyModalVisible: true,
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
        communityModifyModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const userIds = [];
        values.memberItems &&
          values.memberItems.forEach(item => {
            userIds.push(item.id);
          });
        dispatch({
          type: `oaCommunity/updateCommunity`,
          payload: {
            clubName: values.clubName,
            dictClubType: values.dictClubType,
            clubIntroduction: values.clubIntroduction,
            id: communityId,
            userIds,
          },
        });
      })
      .catch();
  };
  return (
    <Modal
      title="编辑社团信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={communityModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      onOk={handleOk}
    >
      <CommunityForm size="middle" column={1} form={form} communityFormData={communityDetailData} />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  communityModifyModalVisible: oaCommunity.communityModifyModalVisible,
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
}))(CommunityModifyModal);
