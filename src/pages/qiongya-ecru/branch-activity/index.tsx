import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';
import MembersModifyModal from './components/MembersModifyModal';

const BranchActivity = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const membersModifyModelRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
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
          'dictOrgLife',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'branchActivity/selectOrgChange',
      payload: orgId,
    });
  };
  const tabs = [
    {
      id: '8adcf7f96b54cab9016b54ceb77c',
      label: '党员大会',
    },
    {
      id: '8adcf7f96b54cab9016b54ced4fd',
      label: '支委会',
    },
    {
      id: '8adcf7f96b54cab9016b54cf07bf',
      label: '党小组会',
    },
    {
      id: '8adcf7f96b54cab9016b54cf27af',
      label: '党课',
    },
    {
      id: '8adcf7f96b54cab9016b54cf6498',
      label: '主题党日活动',
    },
    {
      id: '8adcf7f96b54cab9016b54cfe195',
      label: '其他',
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
  const opendetailModal = ids => {
    detailModalRef.current.showModal(ids);
  };
  const onPublishStatusChange = changeStatus => {
    // 控制：新增、编辑按钮
    // changeStatus 0 草稿箱 ， 1 已发布
    setPublishStatus(changeStatus);
    tableRef.current.reload();
  };
  const openMembersModifyModal = item => {
    membersModifyModelRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout
        tabs={tabs}
        onTabChange={onTabChange}
        onPublishStatusChange={onPublishStatusChange}
      >
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          opendetailModal={opendetailModal}
          openMembersModifyModal={openMembersModifyModal}
          publishState={publishStatus}
          tableType={tableType}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <MembersModifyModal actionRef={membersModifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ branchActivity }) => ({
  tableRef: branchActivity.tableRef,
}))(BranchActivity);
