import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const PointsAdd = ({ visible, setAddPonitsVisible, selectedRowKeys, dispatch }) => {
  // console.log('selectedRowKeys', selectedRowKeys);
  const [form] = MemberForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      setModalVisible(visible);
    }
  }, [visible]);
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `vcPointsMgt/addPoints`,
            payload: {
              ...values,
              integral: values.integral >= 0 ? `+${values.integral}` : values.integral,
              userIds: selectedRowKeys,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  const hideModal = () => {
    setModalVisible(false);
    setAddPonitsVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title="添加积分"
      centered
      width="400px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: '400px',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      // forceRender
      // confirmLoading={loading}
      onCancel={hideModal}
    >
      <MemberForm size="middle" column={1} form={form} />
    </Modal>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(PointsAdd);
