import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DeedsForm from './form/DeedsForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef, deedsType }) => {
  const [form] = DeedsForm.useForm();
  const [achievementId, setAchievementId] = useState('');
  const showModal = item => {
    setAchievementId(item.id);
    dispatch({
      type: 'oaAdvancedDeeds/save',
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
      type: 'oaAdvancedDeeds/save',
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
        dispatch({
          type:
            deedsType === 'personal'
              ? 'oaAdvancedDeeds/updatePersonal'
              : 'oaAdvancedDeeds/updateCollective',
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

export default connect(({ oaAdvancedDeeds, loading }) => ({
  modifyModalVisible: oaAdvancedDeeds.modifyModalVisible,
  loading: loading.effects['oaAdvancedDeeds/updateAchievement'],
}))(ModifyModal);
