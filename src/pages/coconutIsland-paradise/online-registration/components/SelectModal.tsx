import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SelectLgb from './SelectLgb';

const SelectModal = ({ dispatch, selectModalVisible, actionRef }) => {
  const [activityId, setActivityId] = useState();
  const showModal = item => {
    setActivityId(item.id);
    dispatch({
      type: 'onlineRegistration/save',
      payload: {
        selectModalVisible: true,
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
      type: 'onlineRegistration/save',
      payload: {
        selectModalVisible: false,
      },
    });
  };

  const handleOk = () => {
    // form
    //   .validateFields()
    //   .then(values => {
    //     dispatch({
    //       type: `onlineRegistration/updateOnlineRegistrationInfo`, // 选择人员接口待确定
    //       payload: {
    //         ...values,
    //         id: lgbId,
    //       },
    //     });
    //   })
    //   .catch(info => {
    //     console.error('Validate Failed:', info);
    //   });
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
      onOk={handleOk}
      maskClosable={false}
      destroyOnClose
      onCancel={hideModal}
    >
      <SelectLgb id={activityId} />
    </Modal>
  );
};

export default connect(({ onlineRegistration, loading }) => ({
  selectModalVisible: onlineRegistration.selectModalVisible,
  loading: loading.models.onlineRegistration,
}))(SelectModal);