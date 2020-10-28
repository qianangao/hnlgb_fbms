import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const ActivityAddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [activityId, setActivityId] = useState('');
  const [activityAddModalVisible, setActivityAddModalVisible] = useState(false);
  const showModal = id => {
    form.resetFields();
    setActivityId(id);
    setActivityAddModalVisible(true);
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
    setActivityAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = status => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaVolunteerTeam/addActivity`,
            payload: {
              ...values,
              teamId: activityId,
              publishState: status ? 0 : 1,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  return (
    <Modal
      title="发布活动"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={activityAddModalVisible}
      onOk={handleOk}
      forceRender
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <ActivityForm size="middle" column={1} form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaVolunteerTeam/addActivity'],
}))(ActivityAddModal);
