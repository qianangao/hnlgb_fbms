import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import PartyRecordForm from './form/PartyRecordForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = PartyRecordForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [id, setId] = useState('');
  const showModal = item => {
    setId(item.id);
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
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          const payload = { ...values };
          delete payload.partyId;
          dispatch({
            type: `partyRecord/updatePartyRecord`,
            payload: {
              ...payload,
              id,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
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
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.partyRecord,
}))(ModifyModal);
