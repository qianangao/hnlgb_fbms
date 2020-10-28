import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CommunityForm from './CommunityForm';

const CommunityAddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = CommunityForm.useForm();
  const [communityAddModalVisible, setCommunityAddModalVisible] = useState(false);
  const showModal = () => {
    form.resetFields();
    setCommunityAddModalVisible(true);
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
    setCommunityAddModalVisible(false);
    form.resetFields();
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
        return new Promise(resolve => {
          dispatch({
            type: `oaCommunity/addCommunity`,
            payload: {
              clubName: values.clubName,
              dictClubType: values.dictClubType,
              clubIntroduction: values.clubIntroduction,
              userIds,
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

export default connect(({ loading }) => ({
  loading: loading.effects['oaCommunity/addCommunity'],
}))(CommunityAddModal);
