import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableCaresMember from './TableCaresMember';

const CaresDetailModal = ({ dispatch, caresDetailModalVisible, caresDetailData, actionRef }) => {
  const [caresId, setCaresId] = useState('');
  const showModal = id => {
    setCaresId(id);
    dispatch({
      type: 'vcCaresNext/save',
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

    if (caresId) {
      dispatch({
        type: 'vcCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    dispatch({
      type: 'vcCaresNext/save',
      payload: {
        caresDetailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="关工组织详情"
      centered
      width="50vw"
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

export default connect(({ vcCaresNext, loading }) => ({
  caresDetailModalVisible: vcCaresNext.caresDetailModalVisible,
  caresDetailData: vcCaresNext.caresDetailData,
  loading: loading.models.vcCaresNext,
}))(CaresDetailModal);
