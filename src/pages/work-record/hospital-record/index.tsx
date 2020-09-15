import React, { useEffect } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import UploadInput from '@/components/UploadInput';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const HospitalRecord = ({ dispatch }) => {
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
          'dictSex',
          'dictTreatmentNow',
          'dictUnitNature',
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
        <ProvinceCascaderInput />
        <UploadInput />
      </TypeSelectLayout>
    </OrgTreeLayout>
  );
};

export default connect(() => ({}))(HospitalRecord);
