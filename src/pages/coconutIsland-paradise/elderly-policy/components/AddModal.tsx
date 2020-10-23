import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ElderlyPolicyForm from './form/ElderlyPolicyForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ElderlyPolicyForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'elderlyPolicy/save',
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
      type: 'elderlyPolicy/save',
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
          type: `elderlyPolicy/addElderlyPolicyInfo`,
          payload: {
            title: values.title,
            context: values.context,
            fileId: values.attachmentInfo.uid,
            pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增涉老政策"
      centered
      width="70vw"
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
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ElderlyPolicyForm form={form} />
    </Modal>
  );
};

export default connect(({ elderlyPolicy, loading }) => ({
  addModalVisible: elderlyPolicy.addModalVisible,
  loading: loading.models.elderlyPolicy,
}))(AddModal);
