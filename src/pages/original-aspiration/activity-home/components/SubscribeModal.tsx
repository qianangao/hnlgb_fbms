import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import SubscribeForm from './SubscribeForm';

const SubscribeModal = ({ dispatch, loading, actionRef, oaActivityHome }) => {
  const { tableRef } = oaActivityHome;
  const [form] = SubscribeForm.useForm();
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [actId, setActId] = useState('');

  const showModal = id => {
    setActId(id);
    setSubModalVisible(true);
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
    setActId('');
    setSubModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const params = { ...values };
        params.time = params.timeId.substring(0, 10);
        params.amOrPm = params.timeId.substring(10);
        delete params.timeId;
        return new Promise(resolve => {
          dispatch({
            type: `branchActivity/setSite`,
            payload: {
              activityId: actId,
              ...params,
            },
            resolve,
          });
        });
      })
      .then(() => {
        tableRef.current && tableRef.current.reloadAndRest();
        hideModal();
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="活动场地预约"
      centered
      width={680}
      style={{ paddingBottom: 0 }}
      visible={subModalVisible}
      forceRender
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SubscribeForm form={form} id={actId} />
    </Modal>
  );
};

export default connect(({ loading, oaActivityHome }) => ({
  loading: loading.models.branchActivity,
  oaActivityHome,
}))(SubscribeModal);
