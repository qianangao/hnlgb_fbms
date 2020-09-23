import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import TableTrends from './components/TableTrends';
import TableCares from './components/TableCares';
import CaresDetailModal from './components/CaresDetailModal';
import CaresModifyModal from './components/CaresModifyModal';
import TrendsDetailModal from './components/TrendsDetailModal';
import CaresAddModal from './components/CaresAddModal';
import TrendsAddModal from './components/TrendsAddModal';

const HobbyInfo = ({ dispatch }) => {
  const detailModelRef = useRef({});
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const trendsDetailModelRef = useRef({});
  const trendsAddModelRef = useRef({});
  const [tableType, setTableType] = useState('cares');
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictSex'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'oaCaresNext/selectOrgChange',
      payload: orgId,
    });
  };
  const tabs = [
    {
      id: 'cares',
      label: '关工组织',
    },
    {
      id: 'trends',
      label: '关工动态',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
  };
  const openDetailModal = item => {
    detailModelRef.current.showModal(item.id);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };
  const openAddCaresModal = () => {
    addModelRef.current.showModal();
  };
  const openAddTrendsModal = id => {
    trendsAddModelRef.current.showModal(id);
  };
  const openTrendsDetailModal = item => {
    trendsDetailModelRef.current.showModal(item.id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout tabs={tabs} hidePublish onTabChange={onTabChange}>
        {tableType === 'cares' ? (
          <TableCares
            openDetailModal={openDetailModal}
            openModifyModal={openModifyModal}
            openAddCaresModal={openAddCaresModal}
            openAddTrendsModal={openAddTrendsModal}
          />
        ) : (
          <TableTrends openTrendsDetailModal={openTrendsDetailModal} />
        )}
        <CaresDetailModal actionRef={detailModelRef} />
        <CaresModifyModal actionRef={modifyModelRef} />
        <CaresAddModal actionRef={addModelRef} />
        <TrendsDetailModal actionRef={trendsDetailModelRef} />
        <TrendsAddModal actionRef={trendsAddModelRef} />
      </TypeSelectLayout>
    </OrgTreeLayout>
  );
};

export default connect(({ oaCaresNext }) => ({
  oaCaresNext,
}))(HobbyInfo);
