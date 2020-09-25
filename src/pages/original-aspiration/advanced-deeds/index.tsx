import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const AcadvancedDeeds = ({ dispatch }) => {
  const [publishStatus, setPublishStatus] = useState(1);
  const [tableType, setTableType] = useState('personal');
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
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
      type: 'oaAdvancedDeeds/selectOrgChange',
      payload: orgId,
    });
  };

  const tabs = [
    {
      id: 'personal',
      label: '个人先进事迹',
    },
    {
      id: 'collective',
      label: '集体先进事迹',
    },
  ];

  const onTabChange = id => {
    setTableType(id);
  };
  const onPublishStatusChange = value => {
    // publishStatus 、value  0 草稿箱 ， 1 已发布
    setPublishStatus(value);
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = id => {
    modifyModelRef.current.showModal(id);
  };
  const opendetailModal = id => {
    detailModalRef.current.showModal(id);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout
        tabs={tabs}
        onTabChange={onTabChange}
        onPublishStatusChange={onPublishStatusChange}
      >
        <Table
          tableType={tableType}
          publishStatus={publishStatus}
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          opendetailModal={opendetailModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} deedsType={tableType} />
      <ModifyModal actionRef={modifyModelRef} deedsType={tableType} />
      <DetailModal actionRef={detailModalRef} deedsType={tableType} />
    </OrgTreeLayout>
  );
};

export default connect(({ oaAdvancedDeeds }) => ({
  oaAdvancedDeeds,
}))(AcadvancedDeeds);
