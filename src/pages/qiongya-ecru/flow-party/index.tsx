import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const FlowParty = ({ dispatch }) => {
  const modifyModelRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictSex'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'flowParty/selectOrgChange',
      payload: orgId,
    });
  };

  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ flowParty }) => ({
  flowParty,
}))(FlowParty);
