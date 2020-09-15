import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CaresForm from './CaresForm';
import TableCaresMemberModify from './TableCaresMemberModify';
import MemberModifyModal from './MemberModifyModal';
import MemberAddModal from './MemberAddModal';

const CaresDetailModal = ({ dispatch, caresModifyModalVisible, caresDetailData, actionRef }) => {
  const [form] = CaresForm.useForm();
  const [caresId, setCaresId] = useState('');
  const memberModifyModelRef = useRef({});
  const memberAddModelRef = useRef({});

  const showModal = id => {
    setCaresId(id);
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        caresModifyModalVisible: true,
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
  useEffect(() => {
    if (caresId) {
      dispatch({
        type: 'oaCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        caresModifyModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaCaresNext/updateCares`,
          payload: {
            ...values,
            id: caresId,
          },
        });
      })
      .catch();
  };
  const openMemberModifyModel = item => {
    memberModifyModelRef.current.showModal(item);
  };
  const openMemberAddModal = item => {
    memberAddModelRef.current.showModal(item);
  };
  return (
    <Modal
      title="编辑关工组织"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={caresModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      onOk={handleOk}
    >
      <CaresForm size="middle" column={1} form={form} caresFormData={caresDetailData} />
      <TableCaresMemberModify
        id={caresDetailData.id}
        openMemberModifyModel={openMemberModifyModel}
        openMemberAddModal={openMemberAddModal}
      />
      <MemberModifyModal actionRef={memberModifyModelRef} />
      <MemberAddModal actionRef={memberAddModelRef} />
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  caresModifyModalVisible: oaCaresNext.caresModifyModalVisible,
  caresDetailData: oaCaresNext.caresDetailData,
  loading: loading.models.oaCaresNext,
}))(CaresDetailModal);
