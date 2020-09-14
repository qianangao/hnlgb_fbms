import React, { useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import ModifyModal from './components/ModifyModal';
import AddModal from './components/AddModal';
import Table from './components/Table';

const ElderlyPolicyInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const orgChangeHander = orgitem => {
    dispatch({
      type: 'elderlyPolicy/selectOrgChange',
      payload: orgitem.id,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openAddModal={openAddModal} openModifyModal={openModifyModal} />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ elderlyPolicy }) => ({
  elderlyPolicy,
}))(ElderlyPolicyInfo);
