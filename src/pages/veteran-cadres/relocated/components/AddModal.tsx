import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import RelocatedForm from './form/RelocatedForm';

const AddModal = ({ dispatch, addModalVisible, loading, actionRef }) => {
  const [form] = RelocatedForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'relocated/save',
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
      type: 'relocated/save',
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
          type: `relocated/addRelocated`,
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
      title="新增异地安置"
      centered
      width="95vw"
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
      <RelocatedForm form={form} />
    </Modal>
  );
};
export default connect(({ relocated, loading }) => ({
  addModalVisible: relocated.addModalVisible,
  loading: loading.models.relocated,
}))(AddModal);
