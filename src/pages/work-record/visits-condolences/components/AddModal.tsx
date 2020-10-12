import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import VisitForm from './form/VisitForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading, tableType }) => {
  const [form] = VisitForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'wrVisitsCondolences/save',
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
      type: 'wrVisitsCondolences/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    let visitType = '';
    if (tableType === '生日慰问') {
      visitType = 'e2stg89000k9991';
    } else if (tableType === '住院慰问') {
      visitType = 'e2stg89000k9992';
    } else if (tableType === '节日慰问') {
      visitType = 'e2stg89000k9993';
    } else if (tableType === '日常走访') {
      visitType = 'e2stg89000k9994';
    } else if (tableType === '易地安置人员慰问') {
      visitType = 'e2stg89000k9995';
    } else if (tableType === '遗属慰问') {
      visitType = 'e2stg89000k9996';
    }

    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `wrVisitsCondolences/addVisit`,
          payload: {
            ...values,
            type: visitType,
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
      title={`新增${tableType}`}
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
      <VisitForm form={form} tableType={tableType} />
    </Modal>
  );
};

export default connect(({ wrVisitsCondolences, loading }) => ({
  addModalVisible: wrVisitsCondolences.addModalVisible,
  loading: loading.effects['wrVisitsCondolences/addVisit'],
}))(AddModal);
