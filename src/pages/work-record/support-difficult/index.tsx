import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const AcadvancedDeeds = ({ dispatch }) => {
  const [tableType, setTableType] = useState('1');
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictHelpMode', // 帮扶形式
          'dictHelpReason', // 帮扶原因
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'wrSupportDifficult/selectOrgChange',
      payload: orgId,
    });
  };

  const tabs = [
    {
      id: '1',
      label: '特困补助申请管理',
    },
    {
      id: '2',
      label: '遗孀补助申请管理',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = id => {
    modifyModelRef.current.showModal(id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout hidePublish tabs={tabs} onTabChange={onTabChange}>
        <Table
          tableType={tableType}
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} tableType={tableType} />
      <ModifyModal actionRef={modifyModelRef} tableType={tableType} />
    </OrgTreeLayout>
  );
};

export default connect(({ wrSupportDifficult }) => ({
  wrSupportDifficult,
}))(AcadvancedDeeds);
