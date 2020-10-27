import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import PartyRecordForm from './form/PartyRecordForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = PartyRecordForm.useForm();
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

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          // 获取userIds
          const payload = { ...values };
          const userIdsArr = [];
          payload.userIds.forEach(item => {
            userIdsArr.push(item.id);
          });
          payload.userIds = userIdsArr;
          dispatch({
            type: `partyRecord/addPartyRecord`,
            payload,
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增党费记录"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk()}>
          保存
        </Button>,
      ]}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <PartyRecordForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.partyRecord,
}))(AddModal);
