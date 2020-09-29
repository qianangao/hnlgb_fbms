import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const Detail = ({ id, dispatch, detailExperienceData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaExperienceIntroduction/detailExperience',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailExperienceData.title}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailExperienceData.organizationName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailExperienceData.pushTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailExperienceData.workIntroduction,
          }}
        />
      </div>
    </Descriptions>
  );
};

export default connect(({ oaExperienceIntroduction, loading }) => ({
  detailExperienceData: oaExperienceIntroduction.detailExperienceData,
  loading: loading.models.oaExperienceIntroduction,
}))(Detail);
