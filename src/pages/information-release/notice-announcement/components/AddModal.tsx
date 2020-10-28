import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import NoticeAnnouncementForm from './form/NoticeAnnouncementForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = NoticeAnnouncementForm.useForm();
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
        return new Promise(resolve => {
          const payload = {
            ...values,
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
            type: `noticeAnnouncement/addNoticeAnnouncement`,
            payload,
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

export default connect(({ loading }) => ({
  loading: loading.models.noticeAnnouncement,
}))(AddModal);
