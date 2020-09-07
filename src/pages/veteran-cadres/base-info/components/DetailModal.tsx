import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';

const DetailModal = ({ dispatch, detailModalVisible, actionRef }) => {
  const showModal = () => {
    dispatch({
      type: 'vcBasicInfo/save',
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

  const hideModal = () => {
    dispatch({
      type: 'vcBasicInfo/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="老干部详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      detail
    </Modal>
  );
};

export default connect(({ vcBasicInfo, loading }) => ({
  detailModalVisible: vcBasicInfo.detailModalVisible,
  loading: loading.models.vcBasicInfo,
}))(DetailModal);
