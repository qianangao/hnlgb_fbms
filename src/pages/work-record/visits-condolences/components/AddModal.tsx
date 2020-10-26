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
    if (tableType === '生日看望') {
      visitType = '402883ea73c687ef0173c687ef71';
    } else if (tableType === '住院看望') {
      visitType = '402883ea73c689120173c68912b9';
    } else if (tableType === '节日慰问') {
      visitType = '402883ea73c68c090173c68c09f4';
    } else if (tableType === '日常走访') {
      visitType = '402883ea73c68c5d0173c68c5da8';
    } else if (tableType === '易地安置人员慰问') {
      visitType = '402883ea73c68c7f0173c68c7f63';
    } else if (tableType === '遗属慰问') {
      visitType = '402883ea73c68c3e0173c68c3e22';
    }

    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `wrVisitsCondolences/addVisit`,
          payload: {
            ...values,
            photoAttachmentId: values.picAttachmentInfo && values.picAttachmentInfo.uid,
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
      destroyOnClose
      visible={addModalVisible}
      onOk={handleOk}
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
