import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import TableActivity from './components/TableActivity';
import TableCommunity from './components/TableCommunity';
import CommunityDetailModal from './components/CommunityDetailModal';
import CommunityModifyModal from './components/CommunityModifyModal';
import ActivityDetailModal from './components/ActivityDetailModal';
import CommunityAddModal from './components/CommunityAddModal';
import ActivityAddModal from './components/ActivityAddModal';

const Community = ({ dispatch }) => {
  const detailModelRef = useRef({});
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const activityDetailModelRef = useRef({});
  const activityAddModelRef = useRef({});
  const [tableStatus, setTableStatus] = useState(false);
  useEffect(() => {
    setTableStatus(true);
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
          'dictClubType', // 社团类型
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'oaCommunity/selectOrgChange',
      payload: orgId,
    });
  };
  const tabs = [
    {
      id: '01',
      label: '社团',
    },
    {
      id: '02',
      label: '活动',
    },
  ];

  const onTabChange = id => {
    if (id === '01') {
      setTableStatus(true);
    } else {
      setTableStatus(false);
    }
  };
  const openDetailModal = item => {
    detailModelRef.current.showModal(item.id);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };
  const openAddCommnityModal = () => {
    addModelRef.current.showModal();
  };
  const openAddActivityModal = id => {
    activityAddModelRef.current.showModal(id);
  };
  const openActivityDetailModal = item => {
    activityDetailModelRef.current.showModal(item.id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout tabs={tabs} hidePublish onTabChange={onTabChange}>
        {tableStatus && (
          <TableCommunity
            openDetailModal={openDetailModal}
            openModifyModal={openModifyModal}
            openAddCommnityModal={openAddCommnityModal}
            openAddActivityModal={openAddActivityModal}
          />
        )}
        {!tableStatus && <TableActivity openActivityDetailModal={openActivityDetailModal} />}
        <CommunityDetailModal actionRef={detailModelRef} />
        <CommunityModifyModal actionRef={modifyModelRef} />
        <CommunityAddModal actionRef={addModelRef} />
        <ActivityDetailModal actionRef={activityDetailModelRef} />
        <ActivityAddModal actionRef={activityAddModelRef} />
      </TypeSelectLayout>
    </OrgTreeLayout>
  );
};

export default connect(({ oaCommunity }) => ({
  oaCommunity,
}))(Community);
