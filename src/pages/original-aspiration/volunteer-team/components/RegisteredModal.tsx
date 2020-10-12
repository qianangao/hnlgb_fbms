import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableRegistered from './TableRegistered';

const RegisteredModal = ({ dispatch, registeredModalVisible, actionRef }) => {
  const [infoId, setInfoId] = useState('');

  const showModal = id => {
    setInfoId(id);
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        registeredModalVisible: true,
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
        registeredModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="已报名人员"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      destroyOnClose
      footer={null}
      visible={registeredModalVisible}
      onCancel={hideModal}
    >
      <TableRegistered id={infoId} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam }) => ({
  registeredModalVisible: oaVolunteerTeam.registeredModalVisible,
}))(RegisteredModal);
