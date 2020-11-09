import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import PhysicalExaminationForm from './form/PhysicalExaminationForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = PhysicalExaminationForm.useForm();
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
  // 获取userList
  const changeFormat = params => {
    const userArr = [];
    params.forEach(item => {
      if (item) {
        userArr.push(item.id);
      }
    });
    return userArr;
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          const payload = {
            ...values,
          };
          if (values.receivedType === 1) {
            payload.userList = changeFormat(values.userList);
            payload.orgList = [];
          }
          if (values.receivedType === 0) {
            payload.orgList = changeFormat(values.orgList);
          }
          dispatch({
            type: `opPhysicalExamination/addPhysicalExamination`,
            payload,
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('新增报错', info);
      });
  };

  return (
    <Modal
      title="新增体检管理"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <PhysicalExaminationForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.opPhysicalExamination,
}))(AddModal);
