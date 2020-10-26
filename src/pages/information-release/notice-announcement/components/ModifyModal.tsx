import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NoticeAnnouncementForm from './form/NoticeAnnouncementForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = NoticeAnnouncementForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'noticeAnnouncement/save',
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
      type: 'noticeAnnouncement/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  // 获取-接收类型
  const receivedTypeFn = value => {
    setReceivedType(value);
  };

  // 获取userList
  const changeFormat = parms => {
    const userArr = [];
    parms.forEach(item => {
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
          id: lgbId,
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
          type: `noticeAnnouncement/updateNoticeAnnouncement`,
          payload,
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改通知公告"
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
        <NoticeAnnouncementForm form={form} id={lgbId} receivedTypeFn={receivedTypeFn} />
      </div>
    </Modal>
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  modifyModalVisible: noticeAnnouncement.modifyModalVisible,
  loading: loading.models.noticeAnnouncement,
}))(ModifyModal);
