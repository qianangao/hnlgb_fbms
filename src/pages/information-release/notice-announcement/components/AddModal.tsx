import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NoticeAnnouncementForm from './form/NoticeAnnouncementForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = NoticeAnnouncementForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'noticeAnnouncement/save',
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
      type: 'noticeAnnouncement/save',
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
          type: `noticeAnnouncement/addNoticeAnnouncement`,
          payload: {
            ...values,
            type: values.attachmentId ? 1 : 2, // 类型 1: 图片新闻  2: 工作动态
            status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title="新增通知公告"
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
      <NoticeAnnouncementForm form={form} />
    </Modal>
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  addModalVisible: noticeAnnouncement.addModalVisible,
  loading: loading.models.noticeAnnouncement,
}))(AddModal);
