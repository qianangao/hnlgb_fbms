import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import HomeDetailForm from './form/HomeDetailForm';

const HomeDetailModal = ({ loading, actionRef }) => {
  const [detailId, setDetailId] = useState(''); // id
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [blockTypeName, setBlockTypeName] = useState(''); // 区域类型名
  const [blockTypeUrl, setBlockTypeUrl] = useState(''); // 分区域请求详情Url
  const showModal = (item, blockType) => {
    if (blockType === '图片新闻') {
      setDetailId(item);
    } else {
      setDetailId(item.id);
    }
    setBlockTypeName(blockType);
    switch (blockType) {
      case '图片新闻':
        setBlockTypeUrl('detailPicture');
        break;
      case '通知公告':
        setBlockTypeUrl('detailNoticeAnnouncement');
        break;
      case '五老风采':
        setBlockTypeUrl('detailElegantDemeanor');
        break;
      case '成果展台':
        setBlockTypeUrl('detailAchievement');
        break;
      case '涉老政策':
        setBlockTypeUrl('detailElderlyPolicy');
        break;
      default:
        setBlockTypeUrl('');
    }
    setDetailModalVisible(true);
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
    setDetailModalVisible(false);
  };

  return (
    <Modal
      title={blockTypeName}
      centered
      width="70vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      footer={null}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <HomeDetailForm id={detailId} blockTypeUrl={blockTypeUrl} />
      </div>
    </Modal>
  );
};

export default connect(({ home, loading }) => ({
  detailModalVisible: home.detailModalVisible,
  loading: loading.models.home,
}))(HomeDetailModal);
