import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import SeniorUniversityForm from './form/SeniorUniversityForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = SeniorUniversityForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'seniorUniversity/save',
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
      type: 'seniorUniversity/save',
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
          type: `seniorUniversity/addSeniorUniversityInfo`,
          payload: {
            ...values,
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
      title="新增老年大学"
      centered
      width="95vw"
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
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SeniorUniversityForm form={form} />
    </Modal>
  );
};

export default connect(({ seniorUniversity, loading }) => ({
  addModalVisible: seniorUniversity.addModalVisible,
  loading: loading.models.seniorUniversity,
}))(AddModal);
