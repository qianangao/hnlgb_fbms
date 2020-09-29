import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ExperienceForm from './form/ExperienceForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ExperienceForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'oaExperienceIntroduction/save',
      payload: {
        addModalVisible: true,
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
      type: 'oaExperienceIntroduction/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaExperienceIntroduction/addExperience`,
          payload: {
            ...values,
            isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增经验介绍"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
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
      <ExperienceForm form={form} />
    </Modal>
  );
};

export default connect(({ oaExperienceIntroduction, loading }) => ({
  addModalVisible: oaExperienceIntroduction.addModalVisible,
  loading: loading.effects['oaExperienceIntroduction/addExperience'],
}))(AddModal);
