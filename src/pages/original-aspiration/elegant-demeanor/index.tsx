import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const ElegantDemeanorHome = ({ dispatch }) => {
  const [publishStatus, setPublishStatus] = useState(1);
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  useEffect(() => {
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
      type: 'oaElegantDemeanor/selectOrgChange',
      payload: orgId,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };
  const openDetailModal = item => {
    detailModalRef.current.showModal(item.id);
  };
  const onPublishStatusChange = value => {
    // publishStatus 、value  0 草稿箱 ， 1 已发布
    setPublishStatus(value);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          publishStatus={publishStatus}
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          openDetailModal={openDetailModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ oaElegantDemeanor }) => ({
  oaElegantDemeanor,
}))(ElegantDemeanorHome);
