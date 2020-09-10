import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import BasicInfoForm from './form/BasicInfoForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = BasicInfoForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'vcBasicInfo/save',
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
      type: 'vcBasicInfo/save',
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
          type: `vcBasicInfo/addLgb`,
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
      title="新增老干部"
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
      <BasicInfoForm name="add" form={form} />
    </Modal>
  );
};

export default connect(({ vcBasicInfo, loading }) => ({
  addModalVisible: vcBasicInfo.addModalVisible,
  loading: loading.models.vcBasicInfo,
}))(AddModal);
