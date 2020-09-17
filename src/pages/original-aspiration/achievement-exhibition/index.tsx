import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const AchievementHome = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'oaAchievementExhibition/publishStatusChange',
      payload: 1,
    });
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictResultType', // 成果分类
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'oaAchievementExhibition/selectOrgChange',
      payload: orgId,
    });
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
  const onPublishStatusChange = publishStatus => {
    // publishStatus 0 草稿箱 ， 1 已发布
    dispatch({
      type: 'oaAchievementExhibition/publishStatusChange',
      payload: publishStatus,
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          opendetailModal={opendetailModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ oaAchievementExhibition }) => ({
  oaAchievementExhibition,
}))(AchievementHome);
