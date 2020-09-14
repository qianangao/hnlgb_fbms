import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NewsDynamicForm from './form/NewsDynamicForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = NewsDynamicForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'newsDynamic/save',
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
      type: 'newsDynamic/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = status => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `newsDynamic/addNewsDynamic`,
          payload: {
            ...values,
            type: values.attachmentId ? 1 : 2, // 类型 1: 图片新闻  2: 工作动态
            status: status ? 0 : 1, // 状态 0：保存 1：发布
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
      title="新增新闻动态"
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
      <NewsDynamicForm form={form} />
    </Modal>
  );
};

export default connect(({ newsDynamic, loading }) => ({
  addModalVisible: newsDynamic.addModalVisible,
  loading: loading.models.newsDynamic,
}))(AddModal);
