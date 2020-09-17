import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = ActivityForm.useForm();
  const [activityId, setActivityId] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const showModal = item => {
    setActivityId(item.id);
    dispatch({
      type: 'oaActivityHome/save',
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
      type: 'oaActivityHome/save',
      payload: {
        modifyModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        setLoadingStatus(publishStatus);
        dispatch({
          type: `oaActivityHome/updateActivity`,
          payload: {
            ...values,
            isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
            id: activityId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="编辑活动信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loadingStatus && loading} type="primary" onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={!loadingStatus && loading} type="primary" onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <ActivityForm form={form} id={activityId} />
    </Modal>
  );
};

export default connect(({ oaActivityHome, loading }) => ({
  modifyModalVisible: oaActivityHome.modifyModalVisible,
  loading: loading.effects['oaActivityHome/updateActivity'],
}))(ModifyModal);
