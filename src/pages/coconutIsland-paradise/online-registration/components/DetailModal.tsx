import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import DetailForm from './form/OnlineRegistrationDetailForm';

const DetailModal = ({
  dispatch,
  detailModalVisible,
  loading,
  actionRef,
  detailOnlineRegistrationData,
}) => {
  const [DetailId, setDetailId] = useState('');
  const [registrationMembers, setRegistrationMembers] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'onlineRegistration/save',
      payload: {
        detailModalVisible: true,
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
    if (DetailId) {
      dispatch({
        type: 'onlineRegistration/detailOnlineRegistrationInfo',
        payload: { id: DetailId },
      });
      const membersArray =
        detailOnlineRegistrationData.memberItems &&
        detailOnlineRegistrationData.memberItems.map((Item, index) => {
          return ` ${index + 1}、${Item.realName}`;
        });
      const members = membersArray && membersArray.join();
      setRegistrationMembers(members);
    }
  }, [DetailId]);
  const hideModal = () => {
    dispatch({
      type: 'onlineRegistration/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="网络报名详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      footer={null}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <DetailForm id={DetailId} detailOnlineRegistrationData={detailOnlineRegistrationData} />
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="已选成员">{registrationMembers}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ onlineRegistration, loading }) => ({
  detailModalVisible: onlineRegistration.detailModalVisible,
  detailOnlineRegistrationData: onlineRegistration.detailOnlineRegistrationData,
  loading: loading.models.onlineRegistration,
}))(DetailModal);
