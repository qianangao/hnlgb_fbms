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
  const [tableType, setTableType] = useState('8adcf7f96b54cab9016b54ceb77c');
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

  const orgChangeHander = orgId => {
    dispatch({
      type: 'onlineClass/selectOrgChange',
      payload: orgId,
    });
  };
  const tabs = [
    {
      id: '8adcf7f96b54cab9016b54ceb77c',
      label: '学习专栏',
    },
    {
      id: '8adcf7f96b54cab9016b54ced4fd',
      label: '我的书架',
    },
    {
      id: '8adcf7f96b54cab9016b54cf07bf',
      label: '信息资讯',
    },
    {
      id: '8adcf7f96b54cab9016b54cf27af',
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
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ onlineClass }) => ({
  tableRef: onlineClass.tableRef,
}))(OnlineClass);
