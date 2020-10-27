import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SupportDifficultForm from './form/SupportDifficultForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading, tableType }) => {
  const [form] = SupportDifficultForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'wrSupportDifficult/save',
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
      type: 'wrSupportDifficult/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `wrSupportDifficult/addSupportDifficult`,
          payload: {
            ...values,
            helpType: tableType,
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title={`新增${tableType === '1' ? '特困补助申请' : '遗孀补助申请'}`}
      centered
      width="80%"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SupportDifficultForm form={form} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ wrSupportDifficult, loading }) => ({
  addModalVisible: wrSupportDifficult.addModalVisible,
  loading: loading.effects['wrSupportDifficult/addSupportDifficult'],
}))(AddModal);
