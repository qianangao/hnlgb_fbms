import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, message } from 'antd';
import PhysicalExaminationForm from './form/PhysicalExaminationForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = PhysicalExaminationForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const showModal = item => {
    setLgbId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
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
          id: lgbId,
          userList: userIds, // 人员列表
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
          throw new Error('请传入接收单位或接收个人');
        }
        return new Promise(resolve => {
          dispatch({
            type: `opPhysicalExamination/updatePhysicalExamination`,
            payload,
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改体检管理"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <PhysicalExaminationForm
          form={form}
          id={lgbId}
          getUserId={getUserId}
          receivedTypeFn={receivedTypeFn}
          openStatus="modify"
        />
      </div>
    </Modal>
  );
};
export default connect(({ loading }) => ({
  loading: loading.models.opPhysicalExamination,
}))(ModifyModal);
