import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import AddModal from './components/AddModal';
import ModifyModal from './components/ModifyModal';

const Relocated = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});

  useEffect(() => {}, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'relocated/selectOrgChange',
      payload: orgId,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openModifyModal={openModifyModal} />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ relocated }) => ({
  relocated,
}))(Relocated);
