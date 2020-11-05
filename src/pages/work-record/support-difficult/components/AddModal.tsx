import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SupportDifficultForm from './form/SupportDifficultForm';

const AddModal = ({ dispatch, actionRef, loading, tableType }) => {
  const [form] = SupportDifficultForm.useForm();
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
          const payload = {
            ...values,
            helpType: tableType,
          };
          // 新增遗孀补助申请时，values.userId 携带数据为所选老干部所有数据对象，当新增为特困补助申请时，values.userId为所选老干部的userId
          if (tableType === '2') {
            payload.userId = values.userId.userId;
          }
          dispatch({
            type: `wrSupportDifficult/addSupportDifficult`,
            payload,
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
      title={`新增${tableType === '1' ? '特困补助申请' : '遗孀补助申请'}`}
      centered
      width="80%"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SupportDifficultForm form={form} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['wrSupportDifficult/addSupportDifficult'],
}))(AddModal);
