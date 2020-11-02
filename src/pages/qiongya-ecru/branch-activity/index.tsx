import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';
import MembersModifyModal from './components/MembersModifyModal';
import CommentModal from './components/CommentModal';
import StatisticsTable from './components/StatisticsTable';

const BranchActivity = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const membersModifyModelRef = useRef({});
  const commentModalRef = useRef({});
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
      id: '8adcf7f96b54cab9016b54cfb348',
      label: '民主评议党员',
    },
    {
      id: '8adcf7f96b54cab9016b54cfe195',
      label: '其他',
    },
    {
      id: '1',
      label: '统计查询',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
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
  const openCommentModal = ids => {
    commentModalRef.current.showModal(ids);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      {tableType === '1' ? (
        <TypeSelectLayout
          tabs={tabs}
          onTabChange={onTabChange}
          onPublishStatusChange={onPublishStatusChange}
          hidePublish
        >
          <StatisticsTable
            tableType={tableType}
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
          />
        </TypeSelectLayout>
      ) : (
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
            openCommentModal={openCommentModal}
            publishState={publishStatus}
            tableType={tableType}
          />
        </TypeSelectLayout>
      )}
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <CommentModal actionRef={commentModalRef} />
      <MembersModifyModal actionRef={membersModifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ branchActivity }) => ({
  tableRef: branchActivity.tableRef,
}))(BranchActivity);
