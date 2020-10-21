import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LifeServiceForm from './form/LifeServiceForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = LifeServiceForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'lifeService/save',
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
      type: 'lifeService/save',
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
          type: `lifeService/addLifeServiceInfo`,
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
      title="新增生活服务"
      centered
      width="900px"
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
      <LifeServiceForm form={form} />
    </Modal>
  );
};

export default connect(({ lifeService, loading }) => ({
  addModalVisible: lifeService.addModalVisible,
  loading: loading.models.lifeService,
}))(AddModal);
