import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import TableTeam from './components/TableTeam';
import ActivityDetailModal from './components/ActivityDetailModal';
import TeamModifyModal from './components/TeamModifyModal';
import ActivityAddModal from './components/ActivityAddModal';
import ActivityModifyModal from './components/ActivityModifyModal';
import MembersModifyModal from './components/MembersModifyModal';
import RegisteredModal from './components/RegisteredModal';

const AcadvancedDeeds = ({ dispatch }) => {
  const [publishStatus, setPublishStatus] = useState(1);
  const [tableType, setTableType] = useState('1');
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const activityDetailModalRef = useRef({});
  const activityModifyModelRef = useRef({});
  const activityAddModelRef = useRef({});
  const membersModifyModelRef = useRef({});
  const registeredModalRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex', // 性别
          'dictNation', // 民族
          'dictRetirementLevel', // 职级
          'dictRetirementType', // 离退休类型
          'dictTreatmentNow', // 现享受待遇
          'dictPoliticalStatus', // 政治面貌
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'oaVolunteerTeam/selectOrgChange',
      payload: orgId,
    });
  };

  const tabs = [
    {
      id: '1',
      label: '志愿团队',
    },
    {
      id: '2',
      label: '团队活动',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
    setPublishStatus(1);
  };
  const onPublishStatusChange = value => {
    // publishStatus 、value  0 草稿箱 ， 1 已发布
    setPublishStatus(value);
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };
  const opendetailActivityModal = item => {
    activityDetailModalRef.current.showModal(item.id);
  };
  const openAddActivityModal = id => {
    activityAddModelRef.current.showModal(id);
  };
  const openActivityModifyModal = item => {
    activityModifyModelRef.current.showModal(item.id);
  };
  const openMembersModifyModal = item => {
    membersModifyModelRef.current.showModal(item.id);
  };
  const openRegisteredModal = item => {
    registeredModalRef.current.showModal(item.id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      {tableType === '1' ? (
        <TypeSelectLayout tabs={tabs} onTabChange={onTabChange} hidePublish>
          <TableTeam
            tableType={tableType}
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
            openAddActivityModal={openAddActivityModal}
            openMembersModifyModal={openMembersModifyModal}
          />
        </TypeSelectLayout>
      ) : (
        <TypeSelectLayout
          tabs={tabs}
          onTabChange={onTabChange}
          onPublishStatusChange={onPublishStatusChange}
        >
          <Table
            tableType={tableType}
            publishStatus={publishStatus}
            openActivityModifyModal={openActivityModifyModal}
            opendetailActivityModal={opendetailActivityModal}
            openRegisteredModal={openRegisteredModal}
          />
        </TypeSelectLayout>
      )}
      <TeamModifyModal actionRef={modifyModelRef} />
      <AddModal actionRef={addModelRef} />
      <ActivityDetailModal actionRef={activityDetailModalRef} />
      <ActivityAddModal actionRef={activityAddModelRef} />
      <ActivityModifyModal actionRef={activityModifyModelRef} />
      <MembersModifyModal actionRef={membersModifyModelRef} />
      <RegisteredModal actionRef={registeredModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ oaVolunteerTeam }) => ({
  oaVolunteerTeam,
}))(AcadvancedDeeds);
