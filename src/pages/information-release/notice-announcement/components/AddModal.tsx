import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, message } from 'antd';
import NoticeAnnouncementForm from './form/NoticeAnnouncementForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = NoticeAnnouncementForm.useForm();
  const [userIds, setUserIds] = useState([]);
  const [receivedType, setReceivedType] = useState(null);
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

  // 获取-选择的成员id
  const getUserId = keys => {
    const getUserIds = [];
    keys.forEach(item => {
      if (item) {
        getUserIds.push(item.id);
      }
    });
    setUserIds(getUserIds);
  };
  // 获取-接收类型
  const receivedTypeFn = value => {
    setReceivedType(value);
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
          userList: userIds, // 人员列表
          receivedType,
        };
        // 转化单位数据格式
        const orgArrId = [];
        values.orgList &&
          values.orgList.forEach(item => {
            if (item) {
              orgArrId.push(item.id);
            }
          });
        payload.orgList = orgArrId;
        if (orgArrId.length === 0 && userIds.length === 0) {
          message.error('请传入接收单位或接收个人');
          return;
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
      <NoticeAnnouncementForm form={form} getUserId={getUserId} receivedTypeFn={receivedTypeFn} />
    </Modal>
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  addModalVisible: noticeAnnouncement.addModalVisible,
  loading: loading.models.noticeAnnouncement,
}))(AddModal);
