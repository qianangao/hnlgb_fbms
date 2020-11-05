import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import BranchInformationForm from './form/BranchInformationForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = BranchInformationForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [id, setId] = useState('');
  const showModal = item => {
    setId(item.id);
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
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `branchInformation/updateBranchInformation`,
            payload: {
              ...values,
              id,
            },
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
      title="修改支部信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk()}>
          保存
        </Button>,
      ]}
      forceRender
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
        <BranchInformationForm form={form} id={id} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.branchInformation,
}))(ModifyModal);
