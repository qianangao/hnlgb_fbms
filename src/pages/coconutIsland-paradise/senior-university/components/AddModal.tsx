import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
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

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `seniorUniversity/addSeniorUniversityInfo`,
          payload: {
            ...values,
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
      onOk={handleOk}
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
