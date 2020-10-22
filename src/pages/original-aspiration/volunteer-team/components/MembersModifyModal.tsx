import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembers from './TableMembers';

const TeamModifyModal = ({ dispatch, memberModifyModalVisible, actionRef }) => {
  const [infoId, setInfoId] = useState('');

  const showModal = id => {
    setInfoId(id);
    dispatch({
      type: 'oaVolunteerTeam/save',
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

  const hideModal = () => {
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        memberModifyModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="查看志愿团队成员"
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
      <TableMembers id={infoId} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  memberModifyModalVisible: oaVolunteerTeam.memberModifyModalVisible,
  loading: loading.models.oaVolunteerTeam,
}))(TeamModifyModal);
