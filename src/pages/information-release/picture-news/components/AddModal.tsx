import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NewsDynamicForm from './form/NewsDynamicForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = NewsDynamicForm.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const showModal = () => {
    setAddModalVisible(true);
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
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `pictureNews/addNewsDynamic`,
            payload: {
              ...values,
              type: 1, // 类型 1: 图片新闻  2: 新闻动态
              status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
              attachmentId: values.attachmentInfo && values.attachmentInfo.uid,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增图片新闻"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
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

export default connect(({ loading }) => ({
  loading: loading.models.pictureNews,
}))(AddModal);
