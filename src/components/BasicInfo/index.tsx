import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

const BasicInfo = ({ userId, dispatch, enums, lgbDetailData }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictNation',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictSex',
          'dictTreatmentNow',
          'dictPoliticalStatus',
        ],
      },
    });
    if (userId) {
      dispatch({
        type: 'vcBasicInfo/getLgbDetail',
        payload: { userId },
      });
    }
  }, [userId]);

  return (
    <Descriptions title="基本信息" size="middle">
      <Descriptions.Item label="姓名">{lgbDetailData.realName}</Descriptions.Item>
      <Descriptions.Item label="性别">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictSex]}
      </Descriptions.Item>
      <Descriptions.Item label="出生日期">{lgbDetailData.dateOfBirth}</Descriptions.Item>
      <Descriptions.Item label="民族">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictNation]}
      </Descriptions.Item>
      <Descriptions.Item label="离退休类型">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictRetirementType]}
      </Descriptions.Item>
      <Descriptions.Item label="政治面貌">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictPoliticalStatus]}
      </Descriptions.Item>
      <Descriptions.Item label="原工作单位及职务">
        {lgbDetailData && lgbDetailData.originalUnitAndPosition}
      </Descriptions.Item>
      <Descriptions.Item label="职级">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictRetirementLevel]}
      </Descriptions.Item>
      <Descriptions.Item label="现享受待遇">
        {enums.dictSex && enums.dictSex[lgbDetailData.dictTreatmentNow]}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default connect(({ vcBasicInfo, loading, global }) => ({
  lgbDetailData: vcBasicInfo.lgbDetailData,
  loading: loading.models.vcBasicInfo,
  enums: global.enums,
}))(BasicInfo);
