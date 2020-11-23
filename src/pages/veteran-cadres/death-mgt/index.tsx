import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import ModifyModal from './components/ModifyModal';
import Table from './components/Table';
import ReminiscenceModal from './components/ReminiscenceModal';

const DeathInfo = ({ dispatch }) => {
  const modifyRef = useRef({});
  const reminiscenceRef = useRef({});

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
          'dictReminiscenceType',
          'dictSpouseSex',
          'dictSpouseHealth',
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
  const openReminiscenceModal = item => {
    reminiscenceRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} openReminiscenceModal={openReminiscenceModal} />
      <ModifyModal actionRef={modifyRef} />
      <ReminiscenceModal actionRef={reminiscenceRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ vcDeathInfo }) => ({
  vcDeathInfo,
}))(DeathInfo);
