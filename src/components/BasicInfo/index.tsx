import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

const BasicInfo = ({ userId, dispatch }) => {
  const [lgbdetail, setLgbdetail] = useState();
  useEffect(() => {
    if (userId) {
      new Promise(resolve => {
        dispatch({
          type: 'vcBasicInfo/getLgbDetail',
          payload: { userId },
          resolve,
        });
      }).then(data => {
        setLgbdetail(data);
      });
    }
  }, [userId]);

  return (
    <Descriptions title="基本信息" size="middle">
      <Descriptions.Item label="姓名">{lgbdetail && lgbdetail.realName}</Descriptions.Item>
      <Descriptions.Item label="性别">{lgbdetail && lgbdetail.dictSex}</Descriptions.Item>
      <Descriptions.Item label="出生日期">{lgbdetail && lgbdetail.dateOfBirth}</Descriptions.Item>
      <Descriptions.Item label="民族">{lgbdetail && lgbdetail.dictNation}</Descriptions.Item>
      <Descriptions.Item label="离退休类型">
        {lgbdetail && lgbdetail.dictRetirementType}
      </Descriptions.Item>
      <Descriptions.Item label="政治面貌">
        {lgbdetail && lgbdetail.dictPoliticalStatus}
      </Descriptions.Item>
      <Descriptions.Item label="原工作单位及职务">
        {lgbdetail && lgbdetail.originalUnitAndPosition}
      </Descriptions.Item>
      <Descriptions.Item label="职级">
        {lgbdetail && lgbdetail.dictRetirementLevel}
      </Descriptions.Item>
      <Descriptions.Item label="现享受待遇">
        {lgbdetail && lgbdetail.improveTreatment}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(BasicInfo);
