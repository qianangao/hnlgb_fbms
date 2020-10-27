import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import PhysicalExaminationForm from './form/PhysicalExaminationForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = PhysicalExaminationForm.useForm();
  const [userIds, setUserIds] = useState([]);
  const [receivedType, setReceivedType] = useState(null);

  const showModal = () => {
    dispatch({
      type: 'opPhysicalExamination/save',
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
      type: 'opPhysicalExamination/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  // 获取-选择的成员id
  const getUserId = keys => {
    const getUserIds = [];
    keys.forEach(item => {
      if (item) {
        getUserIds.push(item.id);
      }
    });
    setUserIds(getUserIds);
  };
  // 获取-接收类型
  const receivedTypeFn = value => {
    setReceivedType(value);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          ...values,
          userList: userIds, // 人员列表
          receivedType,
        };

        // 转化单位数据格式
        const orgArrId = [];
        values.orgList &&
          values.orgList.forEach(item => {
            if (item) {
              orgArrId.push(item.id);
            }
          });
        payload.orgList = orgArrId;
        if (orgArrId.length === 0 && userIds.length === 0) {
          message.error('请传入接收单位或接收个人');
          return;
        }
        dispatch({
          type: `opPhysicalExamination/addPhysicalExamination`,
          payload,
        });
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
      <PhysicalExaminationForm form={form} getUserId={getUserId} receivedTypeFn={receivedTypeFn} />
    </Modal>
  );
};

export default connect(({ opPhysicalExamination, loading }) => ({
  addModalVisible: opPhysicalExamination.addModalVisible,
  loading: loading.models.opPhysicalExamination,
}))(AddModal);
