import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NewsDynamicForm from './form/NewsDynamicForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = NewsDynamicForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'pictureNews/save',
      payload: {
        modifyModalVisible: true,
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
        modifyModalVisible: false,
      },
    });
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `pictureNews/updateNewsDynamic`,
          payload: {
            id: lgbId,
            headline: values.headline,
            context: values.context,
            type: 1, // 类型 1: 图片新闻  2: 新闻动态
            status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改图片新闻"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
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
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <NewsDynamicForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ pictureNews, loading }) => ({
  modifyModalVisible: pictureNews.modifyModalVisible,
  loading: loading.models.pictureNews,
}))(ModifyModal);
