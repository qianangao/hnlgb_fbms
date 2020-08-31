import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
// import ModifyModal from './components/ModifyModal';
import Table from './components/Table';

const BaseInfo = ({ dispatch }) => {
  const modifyRef = useRef({});

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
      type: 'vcBasicInfo/selectOrgChange',
      payload: orgitem.id,
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} />
      {/* <ModifyModal actionRef={modifyRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(BaseInfo);
