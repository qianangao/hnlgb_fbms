import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import ModifyModal from './components/ModifyModal';
import Table from './components/Table';

const DeathInfo = ({ dispatch }) => {
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

  const orgChangeHander = orgId => {
    dispatch({
      type: 'vcDeathInfo/selectOrgChange',
      payload: orgId,
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} openOrgSelectModal={openOrgSelectModal} />
      <ModifyModal actionRef={modifyRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ vcDeathInfo }) => ({
  vcDeathInfo,
}))(DeathInfo);
