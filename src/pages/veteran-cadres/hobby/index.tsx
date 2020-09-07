import React, { useEffect } from 'react';

import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';

const HobbyInfo = ({ dispatch }) => {
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
          'hobby',
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

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table />
    </OrgTreeLayout>
  );
};

export default connect(({ vcHobbyInfo }) => ({
  vcHobbyInfo,
}))(HobbyInfo);
