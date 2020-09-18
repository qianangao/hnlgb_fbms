import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CommunityForm from './CommunityForm';

const CommunityAddModal = ({ dispatch, communityAddModalVisible, actionRef, loading }) => {
  const [form] = CommunityForm.useForm();
  const showModal = () => {
    form.resetFields();
    dispatch({
      type: 'oaCommunity/save',
      payload: {
        communityAddModalVisible: true,
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
        communityAddModalVisible: false,
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
          type: `oaCommunity/addCommunity`,
          payload: {
            clubName: values.clubName,
            dictClubType: values.dictClubType,
            clubIntroduction: values.clubIntroduction,
            userIds,
          },
        });
      })
      .catch();
  };

  return (
    <Modal
      title="新增社团"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={communityAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <CommunityForm size="middle" column={1} form={form} communityFormData={{}} />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  communityAddModalVisible: oaCommunity.communityAddModalVisible,
  loading: loading.effects['oaCommunity/addCommunity'],
}))(CommunityAddModal);
