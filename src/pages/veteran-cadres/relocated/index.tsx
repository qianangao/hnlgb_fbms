import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import AddModal from './components/AddModal'

const relocated = ({ dispatch }) => {
  const addModelRef = useRef({});

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

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} />
      <AddModal actionRef={addModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ relocated }) => ({
  relocated,
}))(relocated);
