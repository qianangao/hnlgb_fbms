import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ModifyModal from './components/ModifyModal';
import ModifyUnitModal from './components/ModifyUnitModal';
import AddModal from './components/AddModal';
import AddSilhouetteModal from './components/AddSilhouetteModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';
import RegisteredModal from './components/RegisteredModal';

const ActivityCenterInfo = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const addSilhouetteModelRef = useRef({});
  const modifyModelRef = useRef({});
  const modifyUnitModelRef = useRef({});
  const detailModalRef = useRef({});
  const registeredModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
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
      type: 'activityCenter/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openAddSilhouetteModal = item => {
    addSilhouetteModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  const openModifyUnitModal = item => {
    modifyUnitModelRef.current.showModal(item);
  };
  const openDetailModal = (id, type) => {
    detailModalRef.current.showModal(id, type);
  };
  const openRegisteredModal = id => {
    registeredModalRef.current.showModal(id);
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
          openAddSilhouetteModal={openAddSilhouetteModal}
          openModifyModal={openModifyModal}
          openModifyUnitModal={openModifyUnitModal}
          openDetailModal={openDetailModal}
          openRegisteredModal={openRegisteredModal}
          publishStatus={publishStatus}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <AddSilhouetteModal actionRef={addSilhouetteModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <ModifyUnitModal actionRef={modifyUnitModelRef} />
      <DetailModal actionRef={detailModalRef} />
      <RegisteredModal actionRef={registeredModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ activityCenter }) => ({
  tableRef: activityCenter.tableRef,
}))(ActivityCenterInfo);
