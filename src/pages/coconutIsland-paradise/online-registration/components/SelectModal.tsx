import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SelectLgb from './SelectLgb';

const SelectModal = ({ actionRef }) => {
  const [activityId, setActivityId] = useState();
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const showModal = item => {
    setActivityId(item.id);
    setSelectModalVisible(true);
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
    setSelectModalVisible(false);
  };

  return (
    <Modal
      title="选择人员/单位"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={selectModalVisible}
      maskClosable={false}
      footer={[]}
      destroyOnClose
      onCancel={hideModal}
    >
      <SelectLgb id={activityId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(SelectModal);
