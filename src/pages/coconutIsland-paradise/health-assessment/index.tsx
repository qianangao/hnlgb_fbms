import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import Statistics from './components/Statistics.tsx';
import TableTopic from './components/TableTopic.tsx';
import TableResult from './components/TableResult.tsx';
import TopicModifyModal from './components/TopicModifyModal';
import ResultDetailModal from './components/ResultDetailModal';

const HealthAssessment = ({ dispatch }) => {
  const resultDetailModal = useRef({});
  const topicModifyModal = useRef({});
  const [tableType, setTableType] = useState('result');
  const [selectId, setSelectId] = useState('');
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictSex', 'dictAssessGrade'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    setSelectId(orgId);
    dispatch({
      type: 'healthAssessment/selectOrgChange',
      payload: orgId,
    });
  };
  const openResultDetailModal = item => {
    resultDetailModal.current.showModal(item);
  };
  const openTopicModifyModal = item => {
    topicModifyModal.current.showModal(item);
  };
  const tabs = [
    {
      id: 'result',
      label: '测评结果',
    },
    {
      id: 'topic',
      label: '测评题目',
    },
    {
      id: 'statistics',
      label: '测评统计',
    },
  ];
  const onTabChange = id => {
    setTableType(id);
  };

  const Element = () => {
    if (tableType === 'result') {
      return <TableResult openResultDetailModal={openResultDetailModal} />;
    }
    if (tableType === 'topic') {
      return <TableTopic openTopicModifyModal={openTopicModifyModal} />;
    }
    return <Statistics id={selectId} />;
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout tabs={tabs} hidePublish onTabChange={onTabChange}>
        {Element()}
        <TopicModifyModal actionRef={topicModifyModal} />
        <ResultDetailModal actionRef={resultDetailModal} />
      </TypeSelectLayout>
    </OrgTreeLayout>
  );
};

export default connect(({ healthAssessment }) => ({
  healthAssessment,
}))(HealthAssessment);
