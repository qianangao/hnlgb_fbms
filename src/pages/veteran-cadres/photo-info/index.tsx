import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';

const photoInfo = ({ dispatch }) => {
  const addModelRef = useRef({});

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
      type: 'photoInfo/selectOrgChange',
      payload: orgitem.id,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} />
      <AddModal actionRef={addModelRef} ></AddModal>
    </OrgTreeLayout>
  );
};

export default connect(({ photoInfo }) => ({
  photoInfo,
}))(photoInfo);
