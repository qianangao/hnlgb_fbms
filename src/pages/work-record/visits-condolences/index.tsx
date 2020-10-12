import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import StatisticsTable from './components/StatisticsTable';
import ModifyModal from './components/ModifyModal';

const AcadvancedDeeds = ({ dispatch }) => {
  const [tableType, setTableType] = useState('生日慰问');
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictPerson', // 个人先进事迹分类
          'dictUnit', // 集体先进事迹分类
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'wrVisitsCondolences/selectOrgChange',
      payload: orgId,
    });
  };

  const tabs = [
    {
      id: '生日慰问',
      label: '生日慰问',
    },
    {
      id: '住院慰问',
      label: '住院慰问',
    },
    {
      id: '节日慰问',
      label: '节日慰问',
    },
    {
      id: '日常走访',
      label: '日常走访',
    },
    {
      id: '易地安置人员慰问',
      label: '易地安置人员慰问',
    },
    {
      id: '遗属慰问',
      label: '遗属慰问',
    },
    {
      id: '统计查询',
      label: '统计查询',
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
        {tableType === '统计查询' ? (
          <StatisticsTable
            tableType={tableType}
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
          />
        ) : (
          <Table
            tableType={tableType}
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
          />
        )}
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} tableType={tableType} />
      <ModifyModal actionRef={modifyModelRef} tableType={tableType} />
    </OrgTreeLayout>
  );
};

export default connect(({ wrVisitsCondolences }) => ({
  wrVisitsCondolences,
}))(AcadvancedDeeds);
