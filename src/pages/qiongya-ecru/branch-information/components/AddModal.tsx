import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import BranchInformationForm from './form/BranchInformationForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = BranchInformationForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'branchInformation/save',
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
      type: 'branchInformation/save',
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
          type: `branchInformation/addBranchInformation`,
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
      title="新增支部信息"
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
      <BranchInformationForm form={form} />
    </Modal>
  );
};

export default connect(({ branchInformation, loading }) => ({
  addModalVisible: branchInformation.addModalVisible,
  loading: loading.models.branchInformation,
}))(AddModal);
