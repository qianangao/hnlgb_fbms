import React,{ useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Descriptions } from 'antd';
import ResultCard from './ResultCard'

const ResultDetail = ({ id, dispatch, detailResultData }) => {
useEffect(() => {
  dispatch({
    type: 'healthAssessment/detailHealthAssessmentResult',
    payload: { id }, 
  });
}, []);
  return (
    <>
      <Row gutter={16} style={{marginBottom:16}}>
        <Col span={8}>
          <ResultCard 
            title = '测评分数'
            blockData = {detailResultData.fraction}
          />        
        </Col>
        <Col span={8}>
          <ResultCard 
            title = '测评等级'
            blockData = {detailResultData.dictAssessGrade}
          />  
        </Col>
        <Col span={8}>
          <ResultCard 
            title = '测评时间'
            blockData = {detailResultData.assessTime}
          />  
        </Col>
      </Row>
      {detailResultData.healthAssessToVo && 
        detailResultData.healthAssessToVo.map( item => (
          <Descriptions size="middle" column={1} style={{marginBottom: 16 }}>
            <Descriptions.Item style={{fontWeight:"bold"}}>{`题目:${  item.subject}`}</Descriptions.Item>
            <Descriptions.Item label="选项A">{item.optionA}</Descriptions.Item>
            <Descriptions.Item label="选项B">{item.optionB}</Descriptions.Item>
            <Descriptions.Item label="选项C">{item.optionC}</Descriptions.Item>
            <Descriptions.Item label="选项D">{item.optionD}</Descriptions.Item>
            <Descriptions.Item label="您的选择是" style={{ backgroundColor: '#f5f5f5' }}>{item.answer}</Descriptions.Item>
          </Descriptions>
        ))
      }
    </>
  );
};

export default connect(({ healthAssessment }) => ({
  detailResultData:healthAssessment.detailResultData,
}))(ResultDetail);
