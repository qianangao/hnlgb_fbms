import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import AddVisitModal from './components/AddVisitModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const HospitalRecord = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictRetirementType', 'dictApproveStatus', 'dictSex'],
      },
    });
  }, []);

  const addModelRef = useRef({});
  const addVisitModelRef = useRef({});
  const modifyModelRef = useRef({});

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openAddVisitModal = item => {
    addVisitModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };

  const orgChangeHander = orgId => {
    dispatch({
      type: 'hospitalRegistration/selectOrgChange',
      payload: orgId,
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openAddModal={openAddModal}
        openModifyModal={openModifyModal}
        openAddVisitModal={openAddVisitModal}
      />
      <AddVisitModal actionRef={addVisitModelRef} />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ hospitalRegistration }) => ({
  hospitalRegistration,
}))(HospitalRecord);
