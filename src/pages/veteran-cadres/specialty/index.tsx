import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import FlowTable from './components/FlowTable';
import AddFlowModal from './components/AddFlowModal';
import ModifyFlowModal from './components/ModifyFlowModal';

const Specialty = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const addFlowModelRef = useRef({});
  const modifyFlowModelRef = useRef({});
  const [tableType, setTableType] = useState('baseInfo');
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictAllergenUnitNaturel',
          'dictDegree',
          'dictHealthStatus',
          'dictMedicalTreatment',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictRevolutionPeriod',
          'dictMarriage',
          'dictLiveStatu',
          'dictSex',
          'dictTreatmentNow',
          'dictUnitNature',
          'dictSpouseSex',
          'dictSpouseHealth',
          'dictHierarchy',
          'dictIdentity',
          'dictOrganizationArea',
          'dictAdministrativeRank',
          'dictTitleGrade',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'specialty/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };

  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const openAddFlowModal = item => {
    addFlowModelRef.current.showModal(item);
  };

  const openModifyFlowModal = ids => {
    modifyFlowModelRef.current.showModal(ids);
  };
  const tabs = [
    {
      id: 'baseInfo',
      label: '银发人才信息',
    },
    {
      id: 'flowInfo',
      label: '候鸟型银发人才',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout tabs={tabs} hidePublish onTabChange={onTabChange}>
        {tableType === 'baseInfo' ? (
          <Table openAddModal={openAddModal} openModifyModal={openModifyModal} />
        ) : (
          <FlowTable openAddModal={openAddFlowModal} openModifyModal={openModifyFlowModal} />
        )}
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <AddFlowModal actionRef={addFlowModelRef} />
      <ModifyFlowModal actionRef={modifyFlowModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ specialty }) => ({
  specialty,
}))(Specialty);
