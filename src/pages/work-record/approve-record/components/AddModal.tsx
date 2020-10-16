import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ApproveRecordForm from './form/ApproveRecordForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ApproveRecordForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'wrApproveRecord/save',
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
      type: 'wrApproveRecord/save',
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
          type: `wrApproveRecord/addApproveRecord`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('新增报错', info);
      });
  };

  return (
    <Modal
      title="新增审批备案"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ApproveRecordForm form={form} />
    </Modal>
  );
};

export default connect(({ wrApproveRecord, loading }) => ({
  addModalVisible: wrApproveRecord.addModalVisible,
  loading: loading.models.wrApproveRecord,
}))(AddModal);
