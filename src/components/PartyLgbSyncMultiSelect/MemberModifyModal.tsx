import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const MemberModifyModal = ({
  dispatch,
  actionRef,
  loading,
  addLgbOuter,
  updateLgbOuter,
  reloadDataHandler,
}) => {
  const [form] = MemberForm.useForm();
  const [formData, setformData] = useState();
  const [type, setType] = useState();
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);
  const showModal = (formValues, typeValues) => {
    setformData(formValues);
    setType(typeValues);
    setMemberModifyModalVisible(true);
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
    setMemberModifyModalVisible(false);
    form.resetFields();
  };
  const addMemberOuter = params => {
    // console.log('addMemberOuter-params', params);
    addLgbOuter &&
      addLgbOuter(params).then(_ => {
        hideModal();
        reloadDataHandler();
      });
  };
  const updateMemberOuter = info => {
    // console.log('updateLgbOuter-params', params);
    const params = { ...info, id: formData.id };
    updateLgbOuter &&
      updateLgbOuter(params).then(_ => {
        hideModal();
        reloadDataHandler();
      });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          // console.log('type', type);
          if (type === 1) {
            dispatch({
              type: `branchInformation/updateBranchMembers`,
              payload: {
                ...values,
                partyId: formData.partyId,
                userId: formData.userId,
              },
              resolve,
            });
          } else if (type === 2) {
            addMemberOuter(values);
          } else if (type === 3) {
            updateMemberOuter(values);
          }
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  return (
    <Modal
      title={`${type !== 2 ? '编辑' : '新增'}人员信息`}
      centered
      width="400px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: '400px',
        overflow: 'auto',
      }}
      visible={memberModifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MemberForm size="middle" column={1} form={form} formData={{ formData }} type={type} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCaresNext/addCares'],
}))(MemberModifyModal);
