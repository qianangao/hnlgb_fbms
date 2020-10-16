import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import VisitForm from './form/VisitForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef, tableType }) => {
  const [form] = VisitForm.useForm();
  const [visitId, setVisitId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setVisitId(item.id);
    setUserId(item.userId);
    dispatch({
      type: 'wrVisitsCondolences/save',
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
      type: 'wrVisitsCondolences/save',
      payload: {
        modifyModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `wrVisitsCondolences/updateVisit`,
          payload: {
            ...values,
            id: visitId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title={`编辑${tableType}`}
      centered
      destroyOnClose
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <LgbBasicInfo userId={userId} />
      <Descriptions title="慰问详情" size="middle" />
      <VisitForm form={form} id={visitId} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ wrVisitsCondolences, loading }) => ({
  modifyModalVisible: wrVisitsCondolences.modifyModalVisible,
  loading: loading.effects['wrVisitsCondolences/updateVisit'],
}))(ModifyModal);
