import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import OrgTree from '@/components/OrgTree';

let tempOrg = {};

const OrgSelectInput = ({ value = '', actionRef = {}, onChange = () => {} }) => {
  const [orgSelectModalVisible, setVisible] = useState(false);
  const [valueName, setValueName] = useState('');
  const [orgId, setOrgId] = useState('');

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ setLabel });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { setLabel };
    }
  }, []);

  useEffect(() => {
    setOrgId(value);
  }, [value]);

  const setLabel = label => {
    setValueName(label);
  };

  const showModal = () => {
    setOrgId(value);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setValueName(tempOrg.title);
    setOrgId(tempOrg.key);
    onChange && onChange(tempOrg.key);
    setVisible(false);
  };

  return (
    <>
      <Input.Search readOnly value={valueName} onSearch={showModal} onClick={showModal} />
      <Modal
        title="选择单位"
        width={640}
        visible={orgSelectModalVisible}
        onOk={handleOk}
        centered
        bodyStyle={{
          height: 'calc(95vh - 108px)',
          overflow: 'auto',
        }}
        onCancel={hideModal}
      >
        <OrgTree
          value={orgId}
          onChange={item => {
            tempOrg = item;
          }}
          allInValue
        />
      </Modal>
    </>
  );
};

export default OrgSelectInput;
