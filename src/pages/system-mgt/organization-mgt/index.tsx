import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';

const ModifyModal = React.lazy(() => import('./components/ModifyModal'));

const OrganizationMgt = ({ dispatch }) => {
  const modifyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictOrganizationType'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'orgTree/selectOrgChange',
      payload: orgId,
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} />
      <Suspense fallback={null}>
        <ModifyModal actionRef={modifyRef} />
      </Suspense>
    </OrgTreeLayout>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(OrganizationMgt);
