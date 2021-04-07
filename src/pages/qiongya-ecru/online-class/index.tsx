import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const OnlineClass = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const [tableType, setTableType] = useState('8adcf80a75303d66017545a96f5b');
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
          'dict_study_type',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'onlineClass/selectOrgChange',
      payload: orgId,
    });
  };
  const tabs = [
    {
      id: '8adcf80a75303d66017545a96f5b',
      label: '学习专栏',
    },
    {
      id: '8adcf80a75303d66017545a9a4b4',
      label: '我的书架',
    },
    {
      id: '8adcf80a75303d66017545a9ccfd',
      label: '信息资讯',
    },
    {
      id: '8adcf80a75303d66017545aa091b',
      label: '友情链接',
    },
  ];
  const onTabChange = id => {
    setTableType(id);
    tableRef.current.reload();
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout tabs={tabs} onTabChange={onTabChange} hidePublish>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          tableType={tableType}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} tableType={tableType} />
      <ModifyModal actionRef={modifyModelRef} tableType={tableType} />
    </OrgTreeLayout>
  );
};

export default connect(({ onlineClass }) => ({
  tableRef: onlineClass.tableRef,
}))(OnlineClass);
