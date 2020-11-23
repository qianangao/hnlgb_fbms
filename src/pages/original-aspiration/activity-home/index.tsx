import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import CommentModal from './components/CommentModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';
import SubscribeModal from './components/SubscribeModal';

const ActivityHome = ({ dispatch }) => {
  const [publishStatus, setPublishStatus] = useState(1);
  const addModelRef = useRef({});
  const commentModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const subscribeModalRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictActivityClassification', 'dictSex'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'oaActivityHome/selectOrgChange',
      payload: orgId,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openCommentModal = item => {
    commentModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const opendetailModal = ids => {
    detailModalRef.current.showModal(ids);
  };
  const openSubscribeModal = id => {
    subscribeModalRef.current.showModal(id);
  };
  const onPublishStatusChange = value => {
    // publishStatus 0 草稿箱 ， 1 已发布
    setPublishStatus(value);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          publishStatus={publishStatus}
          openCommentModal={openCommentModal}
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          openSubscribeModal={openSubscribeModal}
          opendetailModal={opendetailModal}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <SubscribeModal actionRef={subscribeModalRef} />
      <CommentModal actionRef={commentModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ oaActivityHome }) => ({
  oaActivityHome,
}))(ActivityHome);
