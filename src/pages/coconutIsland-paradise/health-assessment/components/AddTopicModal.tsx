import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TopicForm from './form/TopicForm';

const AddTopicModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = TopicForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'healthAssessment/save',
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
      type: 'healthAssessment/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `healthAssessment/addHealthAssessmentTopic`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增健康测评题目"
      centered
      width="700px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <TopicForm form={form} />
    </Modal>
  );
};

export default connect(({ healthAssessment, loading }) => ({
  addModalVisible: healthAssessment.addModalVisible,
  loading: loading.models.healthAssessment,
}))(AddTopicModal);
