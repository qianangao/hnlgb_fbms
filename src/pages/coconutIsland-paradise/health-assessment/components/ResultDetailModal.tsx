import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ResultDetail from './ResultDetail';

const ResultDetailModal = ({ dispatch, resultDetailModal, loading, actionRef }) => {
  const [resultId, setResultId] = useState();
  const showModal = item => {
    setResultId(item.id);
    dispatch({
      type: 'healthAssessment/save',
      payload: {
        resultDetailModal: true,
      },
    });
  };
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);
  const hideModal = () => {
    dispatch({
      type: 'healthAssessment/save',
      payload: {
        resultDetailModal: false,
      },
    });
  };
  return (
    <Modal
      title="查看健康测评结果"
      centered
      width="700px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      destroyOnClose
      visible={resultDetailModal}
      confirmLoading={loading}
      footer={null}
      onCancel={hideModal}
    >
      <ResultDetail id={resultId} />
    </Modal>
  );
};

export default connect(({ healthAssessment, loading }) => ({
  resultDetailModal: healthAssessment.resultDetailModal,
  loading: loading.models.healthAssessment,
}))(ResultDetailModal);
