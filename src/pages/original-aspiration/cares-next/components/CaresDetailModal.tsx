import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableCaresMember from './TableCaresMember';

const CaresDetailModal = ({ dispatch, caresDetailModalVisible, caresDetailData, actionRef }) => {
  const [caresId, setCaresId] = useState('');
  const showModal = id => {
    setCaresId(id);
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        caresDetailModalVisible: true,
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
    if (caresId) {
      dispatch({
        type: 'oaCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        caresDetailModalVisible: false,
      },
    });
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
        <Descriptions.Item label="简介">{caresDetailData.introduction}</Descriptions.Item>
      </Descriptions>
      <TableCaresMember id={caresDetailData.id} />
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  caresDetailModalVisible: oaCaresNext.caresDetailModalVisible,
  caresDetailData: oaCaresNext.caresDetailData,
  loading: loading.models.oaCaresNext,
}))(CaresDetailModal);
