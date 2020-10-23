import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityCenterInfoForm from './form/ActivityCenterInfoForm';

const ModifyModal = ({ dispatch, modifyModalVisible, actionRef, loading }) => {
  const [form] = ActivityCenterInfoForm.useForm();
  const [lgbId, setLgbId] = useState();
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'activityCenter/save',
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
      type: 'activityCenter/save',
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
          type: `activityCenter/updateActivityCenterInfo`,
          payload: {
            title: values.title,
            coreAdd: values.coreAdd,
            context: values.context,
            phoneNumber: values.phoneNumber,
            fileId: values.attachmentInfo.uid,
            urlId: values.attachmentInfo2.uid,
            id: lgbId,
            pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="修改活动中心信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      forceRender
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      maskClosable={false}
      destroyOnClose
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
        <ActivityCenterInfoForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ activityCenter, loading }) => ({
  modifyModalVisible: activityCenter.modifyModalVisible,
  loading: loading.models.activityCenter,
}))(ModifyModal);
