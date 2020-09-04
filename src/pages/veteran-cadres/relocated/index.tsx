import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
// import ModifyModal from './components/ModifyModal';
import Table from './components/Table';
import AddModal from './components/AddModal'

const relocated = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyRef = useRef({});
  const orgSelectRef = useRef({});

  useEffect(() => {

  }, []);

  const orgChangeHander = orgitem => {
    dispatch({
      type: 'relocated/selectOrgChange',
      payload: orgitem.id,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  }

  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openOrgSelectModal={openOrgSelectModal} />
      <AddModal actionRef={addModelRef} />
      {/* <ModifyModal actionRef={modifyRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(({ relocated }) => ({
  relocated,
}))(relocated);
