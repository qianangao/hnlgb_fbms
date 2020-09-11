import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DifferentLivingPlacesFrom from './form/differentLivingPlacesFrom';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = DifferentLivingPlacesFrom.useForm();
  const showModal = () => {
    dispatch({
      type: 'differentLivingPlaces/save',
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
      type: 'differentLivingPlaces/save',
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
          type: `differentLivingPlaces/addDifferentLivingInfo`,
          payload: {
            ...values,
          },
        });
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

export default connect(({ differentLivingPlaces, loading }) => ({
  addModalVisible: differentLivingPlaces.addModalVisible,
  loading: loading.models.differentLivingPlaces,
}))(AddModal);
