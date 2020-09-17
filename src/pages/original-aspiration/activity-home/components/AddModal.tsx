import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ActivityForm from './form/ActivityForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ActivityForm.useForm();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const showModal = () => {
    dispatch({
      type: 'oaActivityHome/save',
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
      type: 'oaActivityHome/save',
      payload: {
        addModalVisible: false,
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
          type: `oaActivityHome/addActivity`,
          payload: {
            ...values,
            isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增活动信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
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
      <ActivityForm form={form} />
    </Modal>
  );
};

export default connect(({ oaActivityHome, loading }) => ({
  addModalVisible: oaActivityHome.addModalVisible,
  loading: loading.effects['oaActivityHome/addActivity'],
}))(AddModal);
