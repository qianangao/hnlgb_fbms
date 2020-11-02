import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import UnitForm from './form/UnitForm';

const ModifyUnitModal = ({ dispatch, actionRef, loading }) => {
  const [form] = UnitForm.useForm();
  const [modifyUnitModalVisible, setModifyUnitModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState();
  const showModal = item => {
    setLgbId(item.id);
    setModifyUnitModalVisible(true);
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
    setModifyUnitModalVisible(false);
    setLgbId('');
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // 转化单位数据格式
        const orgArrId = [];
        values.orgList &&
          values.orgList.forEach(item => {
            if (item) {
              orgArrId.push(item.id);
            }
          });
        return new Promise(resolve => {
          dispatch({
            type: `activityCenter/updateActivityCenterUnitInfo`,
            payload: {
              id: lgbId,
              ids: orgArrId,
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
      title="编辑活动中心单位信息"
      centered
      width="600px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        overflow: 'auto',
      }}
      visible={modifyUnitModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
      maskClosable={false}
      destroyOnClose
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <UnitForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(ModifyUnitModal);
