import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const OutRegister = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictRetirementType', 'dictTreatmentNow', 'dictSex'],
      },
    });
  }, []);

  const addModelRef = useRef({});
  const modifyModelRef = useRef({});

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };

  const orgChangeHander = orgId => {
    dispatch({
      type: 'outRegister/selectOrgChange',
      payload: orgId,
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openModifyModal={openModifyModal} />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ outRegister }) => ({
  outRegister,
}))(OutRegister);
