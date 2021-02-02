import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import { encrypt } from '@/utils/format';
import BasicInfoForm from './form/BasicInfoForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = BasicInfoForm.useForm();
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
        const params = values;
        if (values.idCard) {
          params.idCard = encrypt(values.idCard);
        }
        return new Promise(resolve => {
          dispatch({
            type: `vcBasicInfo/addLgb`,
            payload: params,
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增老干部"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <BasicInfoForm name="add" form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(AddModal);
