import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import VisitForm from './form/VisitForm';

const ModifyModal = ({ dispatch, loading, actionRef, tableType }) => {
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [form] = VisitForm.useForm();
  const [visitId, setVisitId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setVisitId(item.id);
    setUserId(item.userId);
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
            type: `wrVisitsCondolences/updateVisit`,
            payload: {
              ...values,
              photoAttachmentId: values.picAttachmentInfo && values.picAttachmentInfo.uid,
              id: visitId,
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
      title={`编辑${tableType}`}
      centered
      destroyOnClose
      width="90%"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <LgbBasicInfo userId={userId} />
      <Descriptions title="慰问详情" size="middle" />
      <VisitForm form={form} id={visitId} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['wrVisitsCondolences/updateVisit'],
}))(ModifyModal);
