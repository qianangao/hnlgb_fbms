import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const RoleMgt = ({ dispatch }) => {
  const modifyModelRef = useRef({});
  useEffect(() => {}, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'smRoleMgt/selectOrgChange',
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

export default connect(({ roleMgt }) => ({
  roleMgt,
}))(RoleMgt);
