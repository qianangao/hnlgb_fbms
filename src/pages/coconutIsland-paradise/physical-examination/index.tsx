import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import RegisteredModal from './components/RegisteredModal';

const Specialty = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const registeredModalRef = useRef({});

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
          'recordItems',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'opPhysicalExamination/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };

  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const openRegisteredModal = item => {
    registeredModalRef.current.showModal(item.id);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openAddModal={openAddModal}
        openModifyModal={openModifyModal}
        openRegisteredModal={openRegisteredModal}
      />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <RegisteredModal actionRef={registeredModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ opPhysicalExamination }) => ({
  opPhysicalExamination,
}))(Specialty);
