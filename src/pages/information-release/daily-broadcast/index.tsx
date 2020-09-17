import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const DailyBroadcast = ({ dispatch }) => {
  const detailModalRef = useRef({});
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
      type: 'dailyBroadcast/selectOrgChange',
      payload: orgId,
    });
  };

  const opendetailModal = ids => {
    detailModalRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table opendetailModal={opendetailModal} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ dailyBroadcast }) => ({
  dailyBroadcast,
}))(DailyBroadcast);
