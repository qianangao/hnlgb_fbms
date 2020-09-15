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

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `activityCenter/updateActivityCenterInfo`,
          payload: {
            ...values,
            id: lgbId,
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
        <Button key="cancel" onClick={hideModal}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          保存
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
          overflow: 'auto',
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
