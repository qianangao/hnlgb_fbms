import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NewsDynamicForm from './form/NewsDynamicForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = NewsDynamicForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'pictureNews/save',
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
      type: 'pictureNews/save',
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
          type: `pictureNews/addNewsDynamic`,
          payload: {
            type: 1, // 类型 1: 图片新闻  2: 新闻动态
            status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
            headline: values.headline,
            context: values.context,
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

export default connect(({ pictureNews, loading }) => ({
  addModalVisible: pictureNews.addModalVisible,
  loading: loading.models.pictureNews,
}))(AddModal);
