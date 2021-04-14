import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import PageLoading from '@/components/PageLoading';
import Table from './components/Table';

const OrgSelectModal = React.lazy(() => import('./components/OrgSelectModal'));
const AddModal = React.lazy(() => import('./components/AddModal'));
const DetailModal = React.lazy(() => import('./components/DetailModal'));
const ModifyModal = React.lazy(() => import('./components/ModifyModal'));

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
          'dictHealthStatus',
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
          'dictSpouseSex',
          'dictSpouseHealth',
          'dictHierarchy',
          'dictIdentity',
          'dictOrganizationArea',
          'dictAdministrativeRank',
          'dictTitleGrade',
          'dictHobby',
          'dictHobbyLevel',
        ],
      },
    });

    return () => {
      dispatch({
        type: 'vcBasicInfo/save',
        payload: {
          lgbListData: {},
          lgbDetailData: {},
          lgbFamilyData: {},
          lgbPartTimeData: {},
          lgbHealthyData: {},
          tableRef: {},
          selectedOrgId: undefined, // 选择的组织id
        },
      });
    };
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

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Suspense fallback={<PageLoading />}>
        <Table
          openAddModal={openAddModal}
          openDetailModal={openDetailModal}
          openModifyModal={openModifyModal}
          openOrgSelectModal={openOrgSelectModal}
        />
        <OrgSelectModal actionRef={orgSelectRef} />
        <AddModal actionRef={addModelRef} />
        <DetailModal actionRef={detailModelRef} />
        <ModifyModal actionRef={modifyModelRef} />
      </Suspense>
    </OrgTreeLayout>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(BaseInfo);
