import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
// import ModifyModal from './components/ModifyModal';
import Table from './components/Table';
import OrgSelectModal from './components/OrgSelectModal';
import AddModal from './components/AddModal';

const BaseInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const orgSelectRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictAllergenUnitNaturel',
          'dictDegree',
          'dictHealth',
          'dictMedicalTreatment',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictRevolutionPeriod',
          'dictSex',
          'dictTreatmentNow',
          'dictUnitNature',
          'hierarchy',
          'dictIdentity',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'vcBasicInfo/selectOrgChange',
      payload: orgId,
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
      <OrgSelectModal actionRef={orgSelectRef} />
      <AddModal actionRef={addModelRef} />
      {/* <ModifyModal actionRef={modifyRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(BaseInfo);
