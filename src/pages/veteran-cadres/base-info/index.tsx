import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import OrgSelectModal from './components/OrgSelectModal';
import AddModal from './components/AddModal';
import DetailModal from './components/DetailModal';
import ModifyModal from './components/ModifyModal';

const BaseInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const detailModelRef = useRef({});
  const modifyModelRef = useRef({});
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

  const openAddModal = () => {
    addModelRef.current.showModal();
  };

  const openDetailModal = item => {
    detailModelRef.current.showModal(item.id);
  };

  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };

  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openAddModal={openAddModal}
        openDetailModal={openDetailModal}
        openModifyModal={openModifyModal}
        openOrgSelectModal={openOrgSelectModal}
      />
      <OrgSelectModal actionRef={orgSelectRef} />
      <AddModal actionRef={addModelRef} />
      <DetailModal actionRef={detailModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(BaseInfo);
