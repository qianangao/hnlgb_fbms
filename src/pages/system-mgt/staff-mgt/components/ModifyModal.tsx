import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import StaffForm from './StaffForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = StaffForm.useForm();
  const [staffInfoData, setStaffInfoData] = useState(null);
  const [modifyModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setStaffInfoData(items || null);
    setModalVisible(true);
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
    setModalVisible(false);
    setStaffInfoData(null);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smStaffMgt/${staffInfoData ? 'updateStaff' : 'addStaff'}`,
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
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={staffInfoData ? '编辑工作人员信息' : '新增工作人员'}
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <StaffForm form={form} staffInfoData={staffInfoData} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smStaffMgt,
}))(ModifyModal);
