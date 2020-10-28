import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import ApproveRecordForm from './form/ApproveRecordForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = ApproveRecordForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const [detailId, setDetailId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const showModal = item => {
    setLgbId(item.userId);
    setDetailId(item.id);
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `wrApproveRecord/updateApproveRecord`,
            payload: {
              ...values,
              id: detailId,
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
      title="修改审批备案"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
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
        <LgbBasicInfo userId={lgbId} />
        <Descriptions title="审批备案" size="middle" />
        <ApproveRecordForm form={form} id={detailId} />
      </div>
    </Modal>
  );
};
export default connect(({ loading }) => ({
  loading: loading.models.wrApproveRecord,
}))(ModifyModal);
