import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';
import PartyRecordForm from './form/PartyRecordForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = PartyRecordForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'partyRecord/save',
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
      type: 'partyRecord/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `partyRecord/addPartyRecord`,
          payload: {
            ...values,
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  const addLgbFatch = () => {};

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
      <LgbSyncMultiSelect addLgb={addLgbFatch} />
    </Modal>
  );
};

export default connect(({ partyRecord, loading }) => ({
  addModalVisible: partyRecord.addModalVisible,
  loading: loading.models.partyRecord,
}))(AddModal);
