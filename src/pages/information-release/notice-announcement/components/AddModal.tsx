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

  // 获取userList
  const changeFormat = params => {
    const userArr = [];
    params.forEach(item => {
      if (item) {
        userArr.push(item.id);
      }
    });
    return userArr;
  };
  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          subject: values.subject,
          dictNoticeType: values.dictNoticeType,
          content: values.content,
          attachmentId: values.attachmentId ? values.attachmentId.uid : undefined,
          dictPublishStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          receivedType: values.receivedType,
        };
        if (values.receivedType === 1) {
          payload.userList = changeFormat(values.userList);
          payload.orgList = [];
        }
        if (values.receivedType === 0) {
          payload.orgList = changeFormat(values.orgList);
        }
        dispatch({
          type: `noticeAnnouncement/addNoticeAnnouncement`,
          payload,
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
      <NoticeAnnouncementForm form={form} />
    </Modal>
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  addModalVisible: noticeAnnouncement.addModalVisible,
  loading: loading.models.noticeAnnouncement,
}))(AddModal);
