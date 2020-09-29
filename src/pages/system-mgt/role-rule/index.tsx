import React, { useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import RuleModal from './components/RuleModal';

const RoleRule = ({ dispatch }) => {
  const ruleModelRef = useRef({});

  const orgChangeHander = orgId => {
    dispatch({
      type: 'smRoleRule/selectOrgChange',
      payload: orgId,
    });
  };

  const openRuleModal = id => {
    ruleModelRef.current.showModal(id);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openRuleModal={openRuleModal} />
      <RuleModal actionRef={ruleModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ smRoleRule }) => ({
  smRoleRule,
}))(RoleRule);
