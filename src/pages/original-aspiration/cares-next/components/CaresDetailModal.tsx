import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableCaresMember from './TableCaresMember';

const CaresDetailModal = ({ dispatch, caresDetailData, actionRef }) => {
  const [caresId, setCaresId] = useState('');
  const [caresDetailModalVisible, setCaresDetailModalVisible] = useState(false);
  const showModal = id => {
    setCaresId(id);
    setCaresDetailModalVisible(true);
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
    if (caresId) {
      dispatch({
        type: 'oaCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    setCaresDetailModalVisible(false);
    setCaresId('');
  };

  return (
    <Modal
      title="关工组织详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={caresDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="组织名称">{caresDetailData.mechanismName}</Descriptions.Item>
        <Descriptions.Item label="联系人">{caresDetailData.contactPerson}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{caresDetailData.contactInformation}</Descriptions.Item>
        <Descriptions.Item label="简介">
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {caresDetailData.introduction}
          </pre>
        </Descriptions.Item>
      </Descriptions>
      <TableCaresMember id={caresId} />
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  caresDetailData: oaCaresNext.caresDetailData,
  loading: loading.models.oaCaresNext,
}))(CaresDetailModal);
