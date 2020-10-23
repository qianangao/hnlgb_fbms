import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CommunityForm from './CommunityForm';

const CommunityModifyModal = ({ dispatch, communityModifyModalVisible, actionRef }) => {
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
        dispatch({
          type: `oaCommunity/updateCommunity`,
          payload: {
            ...values,
            id: communityId,
          },
        });
      })
      .catch();
  };
  return (
    <Modal
      title="编辑社团信息"
      centered
      width="900px"
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
      <CommunityForm size="middle" column={1} form={form} id={communityId} />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  communityModifyModalVisible: oaCommunity.communityModifyModalVisible,
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
}))(CommunityModifyModal);
