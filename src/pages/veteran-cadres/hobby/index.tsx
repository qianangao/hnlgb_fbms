import React, { useEffect, useRef } from 'react';

import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const HobbyInfo = ({ dispatch }) => {
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
          'dictHobby',
          'dictHobbyLevel',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'vcHobbyInfo/selectOrgChange',
      payload: orgId,
    });
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ vcHobbyInfo }) => ({
  vcHobbyInfo,
}))(HobbyInfo);
