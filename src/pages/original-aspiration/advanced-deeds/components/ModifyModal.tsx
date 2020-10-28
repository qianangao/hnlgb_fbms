import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DeedsForm from './form/DeedsForm';

const ModifyModal = ({ dispatch, loading, actionRef, deedsType }) => {
  const [form] = DeedsForm.useForm();
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
            type: `oaAdvancedDeeds/${
              deedsType === 'personal' ? 'updatePersonal' : 'updateCollective'
            }`,
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
      title={deedsType === 'personal' ? '编辑个人先进事迹' : '编辑集体先进事迹'}
      centered
      destroyOnClose
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
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
      <DeedsForm form={form} id={achievementId} deedsType={deedsType} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaAdvancedDeeds/updateAchievement'],
}))(ModifyModal);
