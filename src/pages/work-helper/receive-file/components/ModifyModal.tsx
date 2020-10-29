import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ReceiveFileForm from './form/ReceiveFileForm';

const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = ReceiveFileForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'receiveFile/save',
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
      type: 'receiveFile/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  // 获取userList
  const changeFormat = params => {
    const userArr = [];
    params.forEach(item => {
      if (item) {
        userArr.push(item.id);
      }
    });
    return userArr;
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          ...values,
          isRelease: publishStatus ? 0 : 1,
          id: lgbId,
          enclosureId: values.attachmentInfo && values.attachmentInfo.uid,
        };
        if (payload.userList) {
          payload.strList = changeFormat(payload.userList);
        }
        if (payload.receiveList) {
          payload.strList = changeFormat(payload.receiveList);
        }
        dispatch({
          type: `receiveFile/updateReceiveFile`,
          payload,
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改收发文件"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={modifyModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
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
        <ReceiveFileForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ receiveFile, loading }) => ({
  modifyModalVisible: receiveFile.modifyModalVisible,
  loading: loading.models.receiveFile,
}))(ModifyModal);
