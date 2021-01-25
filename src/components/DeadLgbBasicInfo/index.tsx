import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

const LgbBasicInfo = ({ userId, dispatch, enums, lgbDetailData }) => {
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
        payload: { id: userId },
      });
    }
  }, [userId]);

  return (
    <>
      <Descriptions title="基本信息" size="middle">
        <Descriptions.Item label="姓名">{lgbDetailData.realName}</Descriptions.Item>
        <Descriptions.Item label="性别">
          {enums.dictSex && enums.dictSex[lgbDetailData.dictSex]}
        </Descriptions.Item>
        <Descriptions.Item label="出生日期">{lgbDetailData.dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="民族">
          {enums.dictNation && enums.dictNation[lgbDetailData.dictNation]}
        </Descriptions.Item>
        <Descriptions.Item label="离退休类型">
          {enums.dictRetirementType && enums.dictRetirementType[lgbDetailData.dictRetirementType]}
        </Descriptions.Item>
        <Descriptions.Item label="政治面貌">
          {enums.dictPoliticalStatus &&
            enums.dictPoliticalStatus[lgbDetailData.dictPoliticalStatus]}
        </Descriptions.Item>
        <Descriptions.Item label="原工作单位及职务">
          {lgbDetailData && lgbDetailData.originalUnitAndPosition}
        </Descriptions.Item>
        <Descriptions.Item label="职级">
          {enums.dictRetirementLevel &&
            enums.dictRetirementLevel[lgbDetailData.dictRetirementLevel]}
        </Descriptions.Item>
        <Descriptions.Item label="现享受待遇">
          {enums.dictTreatmentNow && enums.dictTreatmentNow[lgbDetailData.dictTreatmentNow]}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="遗属信息" size="middle">
        <Descriptions.Item label="遗属姓名">{lgbDetailData.spouseName}</Descriptions.Item>
        <Descriptions.Item label="遗属性别">
          {enums.dictSpouseSex && enums.dictSpouseSex[lgbDetailData.dictSpouseSex]}
        </Descriptions.Item>
        <Descriptions.Item label="遗属出生日期">
          {lgbDetailData.spouseBirthOfDate}
        </Descriptions.Item>
        <Descriptions.Item label="遗属工作单位及职务">{lgbDetailData.spouseUnit}</Descriptions.Item>
        <Descriptions.Item label="遗属手机号码">{lgbDetailData.spousePhone}</Descriptions.Item>
        <Descriptions.Item label="遗属健康状态">
          {enums.dictSpouseHealth && enums.dictSpouseHealth[lgbDetailData.dictSpouseHealth]}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default connect(({ vcBasicInfo, loading, global }) => ({
  lgbDetailData: vcBasicInfo.lgbDetailData,
  loading: loading.models.vcBasicInfo,
  enums: global.enums,
}))(LgbBasicInfo);
