import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import Table from './components/Table';
import OrgSelectModal from './components/OrgSelectModal';
import AddModal from './components/AddModal';
import DetailModal from './components/DetailModal';
import ModifyModal from './components/ModifyModal';

const BaseInfo = ({ dispatch }) => {
  const addModelRef = useRef({});
  const detailModelRef = useRef({});
  const modifyModelRef = useRef({});
  const orgSelectRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictAllergenUnitNaturel',
          'dictDegree',
          'dictHealth',
          'dictMedicalTreatment',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictRevolutionPeriod',
          'dictMarriage',
          'dictLiveStatu',
          'dictSex',
          'dictTreatmentNow',
          'dictUnitNature',
          'dictSpouseHealth',
          'hierarchy',
          'dictIdentity',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'vcBasicInfo/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = () => {
    addModelRef.current.showModal();
  };

  const openDetailModal = item => {
    detailModelRef.current.showModal(item.id);
  };

  const openModifyModal = item => {
    modifyModelRef.current.showModal(item.id);
  };

  const openOrgSelectModal = ids => {
    orgSelectRef.current.showModal(ids);
  };

  // Temp demo演示，稍后删除
  const tabs = [
    {
      id: '231421',
      label: '问卷草稿',
    },
    {
      id: '43241341',
      label: '问卷进行中',
    },
    {
      id: '32432421',
      label: '问卷统计',
    },
  ];

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const onPublishStatusChange = status => {
    // status 0 草稿箱 ， 1 已发布
    // Do Something
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const onTabChange = id => {
    // Do Something
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout
        tabs={tabs}
        onPublishStatusChange={onPublishStatusChange}
        onTabChange={onTabChange}
      >
        <Table
          openAddModal={openAddModal}
          openDetailModal={openDetailModal}
          openModifyModal={openModifyModal}
          openOrgSelectModal={openOrgSelectModal}
        />
      </TypeSelectLayout>
      <OrgSelectModal actionRef={orgSelectRef} />
      <AddModal actionRef={addModelRef} />
      <DetailModal actionRef={detailModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(BaseInfo);
