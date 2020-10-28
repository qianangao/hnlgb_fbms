import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ExperienceForm from './form/ExperienceForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = ExperienceForm.useForm();
  const [experienceId, setExperienceId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const showModal = item => {
    setExperienceId(item.id);
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
            type: `oaExperienceIntroduction/updateExperience`,
            payload: {
              ...values,
              isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
              id: experienceId,
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
      title="编辑经验介绍"
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
      <ExperienceForm form={form} id={experienceId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaExperienceIntroduction/updateExperience'],
}))(ModifyModal);
