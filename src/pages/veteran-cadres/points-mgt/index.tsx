import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const Points = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});

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
          'dictAdministrativeRank',
          'dictTitleGrade',
          'dictIntegralType', // 积分类型
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'vcPointsMgt/selectOrgChange',
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

export default connect(({ vcPointsMgt }) => ({
  vcPointsMgt,
}))(Points);
