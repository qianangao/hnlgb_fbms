import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import BranchInformationForm from './form/BranchInformationForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = BranchInformationForm.useForm();
  const [id, setId] = useState('');
  const showModal = item => {
    setId(item.id);
    dispatch({
      type: 'branchInformation/save',
      payload: {
        modifyModalVisible: true,
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
      type: 'branchInformation/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `branchInformation/updateBranchInformation`,
          payload: {
            ...values,
            id,
          },
        });
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

export default connect(({ branchInformation, loading }) => ({
  modifyModalVisible: branchInformation.modifyModalVisible,
  loading: loading.models.branchInformation,
}))(ModifyModal);
