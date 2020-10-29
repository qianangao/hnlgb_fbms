import React, { useRef, useEffect } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import ModifyModal from './components/ModifyModal';
import AddModal from './components/AddModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const WorksCornerInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictWorkCornerType'],
      },
    });
  }, []);
  const orgChangeHander = orgId => {
    dispatch({
      type: 'worksCorner/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  const openDetailModal = item => {
    detailModalRef.current.showModal(item);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openAddModal={openAddModal}
        openModifyModal={openModifyModal}
        openDetailModal={openDetailModal}
      />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ worksCorner }) => ({
  tableRef: worksCorner.tableRef,
}))(WorksCornerInfo);
