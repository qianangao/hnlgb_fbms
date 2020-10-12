import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import SupportDifficultForm from './form/SupportDifficultForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef, tableType }) => {
  const [form] = SupportDifficultForm.useForm();
  const [visitId, setSupportDifficultId] = useState('');
  const [userId, setUserId] = useState('');
  const showModal = item => {
    setSupportDifficultId(item.id);
    setUserId(item.userId);
    dispatch({
      type: 'wrSupportDifficult/save',
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
      type: 'wrSupportDifficult/save',
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
          type: `wrSupportDifficult/updateSupportDifficult`,
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
      title={`编辑${tableType === '1' ? '特困补助申请管理' : '遗孀补助申请管理'}`}
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
      <Descriptions title="困难帮扶" size="middle" />
      <SupportDifficultForm form={form} id={visitId} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ wrSupportDifficult, loading }) => ({
  modifyModalVisible: wrSupportDifficult.modifyModalVisible,
  loading: loading.effects['wrSupportDifficult/updateSupportDifficult'],
}))(ModifyModal);
