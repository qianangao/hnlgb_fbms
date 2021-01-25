import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import VisitForm from './form/VisitForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = VisitForm.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [info, setInfo] = useState();
  const showModal = data => {
    setInfo(data);
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
            photoAttachmentId: values.picAttachmentInfo && values.picAttachmentInfo.uid,
            type: '402883ea73c689120173c68912b9',
            userId: info.userId,
            hospitalId: info.id,
            isHospital: 1,
          };
          dispatch({
            type: `hospitalRegistration/addVisit`,
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
      title="新增住院看望"
      centered
      width="80%"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      destroyOnClose
      visible={addModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <VisitForm form={form} realName={info && info.realName} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['hospitalRegistration/addVisit'],
}))(AddModal);
