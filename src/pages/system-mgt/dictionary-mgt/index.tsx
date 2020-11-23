import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';

import ModifyModal from './components/ModifyModal';
import MaintainModal from './components/MaintainModal';

const DictionaryMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const maintainRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictIdentity',
          'dictRetirementLevel',
          'dictNation',
          'dictPoliticalStatus',
          'dictDegree',
        ],
      },
    });
    dispatch({
      type: 'smDictionaryMgt/getSearchRoles',
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'smDictionaryMgt/selectOrgChange',
      payload: orgId,
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  const openMaintainModal = item => {
    maintainRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} openMaintainModal={openMaintainModal} />
      <ModifyModal actionRef={modifyRef} />
      <MaintainModal actionRef={maintainRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
