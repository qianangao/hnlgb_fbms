import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import HomeDetailForm from './form/HomeDetailForm';

const HomeDetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [DetailId, setDetailId] = useState(''); // id
  const [BlockType, setBlockType] = useState(''); // 区域类型
  const [BlockTypeUrl, setBlockTypeUrl] = useState(''); // 分区域请求详情Url
  const showModal = (item, blockType) => {
    if (blockType === '图片新闻') {
      setDetailId(item);
    } else {
      setDetailId(item.id);
    }
    setBlockType(blockType);
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
    dispatch({
      type: 'home/save',
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
      type: 'home/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title={BlockType}
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
        <HomeDetailForm id={DetailId} blockTypeUrl={BlockTypeUrl} />
      </div>
    </Modal>
  );
};

export default connect(({ home, loading }) => ({
  detailModalVisible: home.detailModalVisible,
  loading: loading.models.home,
}))(HomeDetailModal);
