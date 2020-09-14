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
      type: 'vcCaresNext/save',
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

    if (caresId) {
      dispatch({
        type: 'vcCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    dispatch({
      type: 'vcCaresNext/save',
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
          type: `vcCaresNext/updateCares`,
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

export default connect(({ vcCaresNext, loading }) => ({
  caresModifyModalVisible: vcCaresNext.caresModifyModalVisible,
  caresDetailData: vcCaresNext.caresDetailData,
  loading: loading.models.vcCaresNext,
}))(CaresDetailModal);
