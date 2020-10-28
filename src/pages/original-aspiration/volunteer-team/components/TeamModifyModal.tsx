import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TeamForm from './form/TeamForm';

const TeamModifyModal = ({ dispatch, actionRef }) => {
  const [form] = TeamForm.useForm();
  const [teamId, setTeamId] = useState('');
  const [teamModifyModalVisible, setTeamModifyModalVisible] = useState(false);

  const showModal = id => {
    setTeamId(id);
    setTeamModifyModalVisible(true);
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
    setTeamModifyModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaVolunteerTeam/updateTeam`,
            payload: {
              ...values,
              id: teamId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };
  return (
    <Modal
      title="编辑志愿团队"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={teamModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      onOk={handleOk}
    >
      <TeamForm form={form} id={teamId} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  communityDetailData: oaVolunteerTeam.communityDetailData,
  loading: loading.models.oaVolunteerTeam,
}))(TeamModifyModal);
