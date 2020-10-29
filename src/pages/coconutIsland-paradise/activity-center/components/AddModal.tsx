import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityCenterInfoForm from './form/ActivityCenterInfoForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ActivityCenterInfoForm.useForm();
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

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `activityCenter/addActivityCenterInfo`,
            payload: {
              title: values.title,
              coreAdd: values.coreAdd,
              context: values.context,
              phoneNumber: values.phoneNumber,
              fileId: values.attachmentInfo.uid,
              urlId: values.attachmentInfo2.uid,
              pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增活动中心"
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
      <ActivityCenterInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(AddModal);
