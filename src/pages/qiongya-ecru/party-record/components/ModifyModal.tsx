import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';
import PartyRecordForm from './form/PartyRecordForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = PartyRecordForm.useForm();
  const [id, setId] = useState('');
  const showModal = item => {
    setId(item.id);
    dispatch({
      type: 'partyRecord/save',
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
      type: 'partyRecord/save',
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
          type: `partyRecord/updatePartyRecord`,
          payload: {
            ...values,
            id,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改党费管理"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk()}>
          保存
        </Button>,
      ]}
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
        <PartyRecordForm form={form} id={id} />
        <LgbSyncMultiSelect getSelectLgbs={[]} />
      </div>
    </Modal>
  );
};

export default connect(({ partyRecord, loading }) => ({
  modifyModalVisible: partyRecord.modifyModalVisible,
  loading: loading.models.partyRecord,
}))(ModifyModal);
