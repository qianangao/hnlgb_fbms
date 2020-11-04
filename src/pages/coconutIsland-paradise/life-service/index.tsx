import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ModifyModal from './components/ModifyModal';
import AddModal from './components/AddModal';
import CommentModal from './components/CommentModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const LifeServiceInfo = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const addCommentModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictLifeServiceType'],
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
  const openCommentModal = item => {
    addCommentModelRef.current.showModal(item);
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
    tableRef.current.reload();
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openCommentModal={openCommentModal}
          openModifyModal={openModifyModal}
          openDetailModal={openDetailModal}
          publishStatus={publishStatus}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <CommentModal actionRef={addCommentModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ lifeService }) => ({
  tableRef: lifeService.tableRef,
}))(LifeServiceInfo);
