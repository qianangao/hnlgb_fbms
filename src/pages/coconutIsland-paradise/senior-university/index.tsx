import React, { useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ModifyModal from './components/ModifyModal';
import AddModal from './components/AddModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const SeniorUniversityInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const orgChangeHander = orgId => {
    dispatch({
      type: 'seniorUniversity/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  const opendetailModal = item => {
    detailModalRef.current.showModal(item);
  };
  const onPublishStatusChange = publishStatus => {
    // 控制：新增、编辑按钮
    // publishStatus 0 草稿箱 ， 1 已发布
    dispatch({
      type: 'seniorUniversity/publishStatusChange',
      payload: publishStatus,
    });
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          opendetailModal={opendetailModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ seniorUniversity }) => ({
  seniorUniversity,
}))(SeniorUniversityInfo);
