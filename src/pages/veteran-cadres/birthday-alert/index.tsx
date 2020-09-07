import React, { useEffect } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';

const BirthdayInfo = ({ dispatch }) => {
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
      type: 'vcBirthdayInfo/selectOrgChange',
      payload: orgId,
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table />
    </OrgTreeLayout>
  );
};

export default connect(({ vcBirthdayInfo }) => ({
  vcBirthdayInfo,
}))(BirthdayInfo);
