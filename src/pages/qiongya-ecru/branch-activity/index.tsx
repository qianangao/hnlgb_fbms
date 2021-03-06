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
import SubscribeModal from './components/SubscribeModal';

const BranchActivity = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const membersModifyModelRef = useRef({});
  const subscribeModalRef = useRef({});
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

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const openSubscribeModal = id => {
    subscribeModalRef.current.showModal(id);
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
  const tabs = [
    {
      id: '0',
      label: '支部活动',
    },
    {
      id: '1',
      label: '统计查询',
    },
  ];
  const onTabChange = id => {
    setTableType(id);
    tableRef.current.reload();
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout
        tabs={tabs}
        onTabChange={onTabChange}
        onPublishStatusChange={onPublishStatusChange}
        hidePublish={tableType === '1'}
      >
        {tableType === '1' ? (
          <StatisticsTable
            tableType={tableType}
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
          />
        ) : (
          <Table
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
            opendetailModal={opendetailModal}
            openSubscribeModal={openSubscribeModal}
            openMembersModifyModal={openMembersModifyModal}
            openCommentModal={openCommentModal}
            publishState={publishStatus}
            tableType={tableType}
          />
        )}
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <CommentModal actionRef={commentModalRef} />
      <SubscribeModal actionRef={subscribeModalRef} />
      <MembersModifyModal actionRef={membersModifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ branchActivity }) => ({
  tableRef: branchActivity.tableRef,
  branchActivity,
}))(BranchActivity);
