import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TopicForm from './form/TopicForm';

const TopicModifyModal = ({ dispatch, topicModifyModal, loading, actionRef }) => {
  const [form] = TopicForm.useForm();
  const [topicId, setTopicId] = useState();
  const showModal = item => {
    setTopicId(item.id);
    dispatch({
      type: 'healthAssessment/save',
      payload: {
        topicModifyModal: true,
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
        topicModifyModal: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.content = values.context;
        dispatch({
          type: `healthAssessment/updateHealthAssessmentTopic`,
          payload: {
            ...values,
            id: topicId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改健康测评题目"
      centered
      width="700px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={topicModifyModal}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <TopicForm form={form} id={topicId} />
    </Modal>
  );
};

export default connect(({ healthAssessment, loading }) => ({
  topicModifyModal: healthAssessment.topicModifyModal,
  loading: loading.models.healthAssessment,
}))(TopicModifyModal);
