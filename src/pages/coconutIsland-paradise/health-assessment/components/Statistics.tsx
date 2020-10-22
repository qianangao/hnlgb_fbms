import { Chart, Geom, Tooltip, Coord, Label, Legend } from "bizcharts";
import React,{ useEffect } from 'react';
import { connect } from 'umi';

const Statistics = ({ id, dispatch, healthAssessmentStatisticsData}) => {
  useEffect(() => {
    dispatch({
      type: 'healthAssessment/healthAssessmentStatisticsInfo',
      payload:{ orgIdForDataSelect:id }
    });
  }, [id]);
  return (
    <div style={{backgroundColor:'#fff',marginTop:'16px',padding:'30px'}}>
      {/* 引入Chart */}
      <Chart
        data={healthAssessmentStatisticsData.statistics}
        forceFit
      >
        <Coord type="theta"/>
        <Legend />
        <Tooltip showTitle />
        <Geom
          type="intervalStack"
          position="number"
          color="type"
        >
          <Label content="type" />
        </Geom>
      </Chart>
    </div>
  );
};

export default connect(({ healthAssessment }) => ({
  healthAssessmentStatisticsData:healthAssessment.healthAssessmentStatisticsData,
}))(Statistics);
