import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
// import OrgSelectModal from './components/OrgSelectModal';

const specialty = ({ dispatch }) => {
  const addModelRef = useRef({})
  const modifyRef = useRef({});
  const orgSelectRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictTreatmentNow',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgitem => {
    dispatch({
      type: 'specialty/selectOrgChange',
      payload: orgitem.id,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openOrgSelectModal={openOrgSelectModal} />
      <AddModal actionRef={addModelRef} ></AddModal>
      {/* <OrgSelectModal actionRef={orgSelectRef} /> */}
      {/* <ModifyModal actionRef={modifyRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(({ specialty }) => ({
  specialty,
}))(specialty);
