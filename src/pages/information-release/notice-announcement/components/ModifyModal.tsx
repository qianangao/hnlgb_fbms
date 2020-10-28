import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NoticeAnnouncementForm from './form/NoticeAnnouncementForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = NoticeAnnouncementForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
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
        return new Promise(resolve => {
          const payload = {
            ...values,
            id: lgbId,
            attachmentId: values.attachmentinfo && values.attachmentinfo.uid,
            dictPublishStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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

export default connect(({ loading }) => ({
  loading: loading.models.noticeAnnouncement,
}))(ModifyModal);
