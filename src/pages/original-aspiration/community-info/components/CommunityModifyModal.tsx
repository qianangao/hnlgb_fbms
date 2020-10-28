import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CommunityForm from './CommunityForm';

const CommunityModifyModal = ({ dispatch, actionRef }) => {
  const [form] = CommunityForm.useForm();
  const [communityId, setCommunityId] = useState('');
  const [communityModifyModalVisible, setCommunityModifyModalVisible] = useState(false);

  const showModal = id => {
    setCommunityId(id);
    setCommunityModifyModalVisible(true);
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
    setCommunityModifyModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCommunity/updateCommunity`,
            payload: {
              ...values,
              id: communityId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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
  communityDetailData: oaCommunity.communityDetailData,
  loading: loading.models.oaCommunity,
}))(CommunityModifyModal);
