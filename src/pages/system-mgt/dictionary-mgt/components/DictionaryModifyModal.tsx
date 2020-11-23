import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DictionaryForm from './DictionaryForm';

const DictionaryModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DictionaryForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  const showModal = (items, status) => {
    setType(status);
    setModalVisible(true);
    setData(items);
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
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smDictionaryMgt/updateRemarks`,
            payload: {
              code: data.code,
              remarks: values.remarks,
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
      title="编辑字段"
      centered
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <DictionaryForm form={form} type={type} data={data} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(DictionaryModifyModal);
