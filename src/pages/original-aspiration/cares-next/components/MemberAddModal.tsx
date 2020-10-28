import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const MemberAddModal = ({ dispatch, actionRef, loading, id }) => {
  const [form] = MemberForm.useForm();
  const [memberAddModalVisible, setMemberAddModalVisible] = useState(false);
  const showModal = () => {
    setMemberAddModalVisible(true);
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
    setMemberAddModalVisible(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCaresNext/addMember`,
            payload: {
              ...values,
              mechanismId: id,
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

  return (
    <Modal
      title="新增成员信息"
      centered
      width="400px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: '400px',
        overflow: 'auto',
      }}
      visible={memberAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MemberForm size="middle" column={1} form={form} formData={{}} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCaresNext/addCares'],
}))(MemberAddModal);
