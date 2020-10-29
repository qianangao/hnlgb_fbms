import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DifferentLivingPlacesFrom from './form/DifferentLivingPlacesFrom';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DifferentLivingPlacesFrom.useForm();
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
        values.addressCode = values.address.value;
        values.address = values.address.label;
        return new Promise(resolve => {
          dispatch({
            type: `differentLivingPlaces/addDifferentLivingInfo`,
            payload: {
              ...values,
            },
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
      title="新增异地居住"
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
      <DifferentLivingPlacesFrom form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.differentLivingPlaces,
}))(AddModal);
