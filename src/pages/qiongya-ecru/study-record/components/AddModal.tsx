import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import StudyRecordForm from './form/StudyRecordForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = StudyRecordForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'studyRecord/save',
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
      type: 'studyRecord/save',
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
          type: `studyRecord/addStudyRecord`,
          payload: {
            ...values,
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
      title="新增学习记录"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk()}>
          保存
        </Button>,
      ]}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <StudyRecordForm form={form} />
    </Modal>
  );
};

export default connect(({ studyRecord, loading }) => ({
  addModalVisible: studyRecord.addModalVisible,
  loading: loading.models.studyRecord,
}))(AddModal);
