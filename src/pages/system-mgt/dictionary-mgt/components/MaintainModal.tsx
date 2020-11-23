import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DictionaryForm from './DictionaryForm';
import DictionaryTable from './DictionaryTable';
import DictionaryModifyModal from './dictionaryModifyModal';
import DictionaryAddModal from './DictionaryAddModal';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DictionaryForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [chineseName, setChineseName] = useState('');
  const [addData, setAddData] = useState({});
  const modifyRef = useRef({});
  const addRef = useRef({});

  const showModal = items => {
    setChineseName(items.chineseName);
    setAddData(items);
    setModalVisible(true);
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
    setChineseName('');
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smDictionaryMgt/${staffInfoData ? 'updateStaff' : 'addStaff'}`,
            payload: {
              ...values,
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

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  const openAddModal = item => {
    addRef.current.showModal(item);
  };

  return (
    <Modal
      title="维护"
      centered
      style={{ paddingBottom: 0 }}
      width="900px"
      bodyStyle={{
        height: 'calc(95vh - 408px)',
        overflow: 'auto',
      }}
      destroyOnClose
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <DictionaryTable
        chineseName={chineseName}
        openModifyModal={openModifyModal}
        openAddModal={openAddModal}
      />
      <DictionaryModifyModal actionRef={modifyRef} />
      <DictionaryAddModal actionRef={addRef} addData={addData} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);
