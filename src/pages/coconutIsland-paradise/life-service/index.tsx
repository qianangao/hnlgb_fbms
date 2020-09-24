import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ModifyModal from './components/ModifyModal';
import AddModal from './components/AddModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const LifeServiceInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['type'],
      },
    });
  }, []);
  const orgChangeHander = orgId => {
    dispatch({
      type: 'lifeService/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  const openDetailModal = item => {
    detailModalRef.current.showModal(item);
  };
  const onPublishStatusChange = statusChange => {
    // 控制：新增、编辑按钮
    // publishStatus 0 草稿箱 ， 1 已发布
    setPublishStatus(statusChange);
    dispatch({
      type: 'lifeService/publishStatusChange',
      payload: {
        status: statusChange,
        current: 1,
        pageSize: 20,
        currentPage: 1,
        isLgb: 1, // 用户类型：0-老干部，1-工作人员
      },
    });
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          openDetailModal={openDetailModal}
          publishStatus={publishStatus}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ lifeService }) => ({
  lifeService,
}))(LifeServiceInfo);
