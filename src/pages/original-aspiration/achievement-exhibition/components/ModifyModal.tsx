import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import AchievementForm from './form/AchievementForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = AchievementForm.useForm();
  const [achievementId, setAchievementId] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const showModal = item => {
    setAchievementId(item.id);
    dispatch({
      type: 'oaAchievementExhibition/save',
      payload: {
        modifyModalVisible: true,
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
      type: 'oaAchievementExhibition/save',
      payload: {
        modifyModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        setLoadingStatus(publishStatus);
        dispatch({
          type: `oaAchievementExhibition/updateAchievement`,
          payload: {
            ...values,
            isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
            id: achievementId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="编辑成果信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loadingStatus && loading} type="primary" onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={!loadingStatus && loading} type="primary" onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <AchievementForm form={form} id={achievementId} />
    </Modal>
  );
};

export default connect(({ oaAchievementExhibition, loading }) => ({
  modifyModalVisible: oaAchievementExhibition.modifyModalVisible,
  loading: loading.effects['oaAchievementExhibition/updateAchievement'],
}))(ModifyModal);
