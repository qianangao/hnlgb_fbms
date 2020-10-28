import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import AchievementForm from './form/AchievementForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = AchievementForm.useForm();
  const [achievementId, setAchievementId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const showModal = item => {
    setAchievementId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaAchievementExhibition/updateAchievement`,
            payload: {
              ...values,
              isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
              id: achievementId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };
  return (
    <Modal
      title="编辑成果信息"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      destroyOnClose
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <AchievementForm form={form} id={achievementId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaAchievementExhibition/updateAchievement'],
}))(ModifyModal);
