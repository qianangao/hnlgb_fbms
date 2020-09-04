import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';

const photoInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
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
      type: 'photoInfo/selectOrgChange',
      payload: orgitem.id,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openOrgSelectModal={openOrgSelectModal} />
      <AddModal actionRef={addModelRef} ></AddModal>
    </OrgTreeLayout>
  );
};

export default connect(({ photoInfo }) => ({
  photoInfo,
}))(photoInfo);
