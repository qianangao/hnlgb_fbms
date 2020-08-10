import React, { useRef, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'umi';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';

const QRCodeModal = ({ dispatch, placeMgt, actionRef }) => {
  const qrcodeRef = useRef();
  const { qrcodeModalVisible, qrcodePlaceId } = placeMgt;

  const showModal = item => {
    dispatch({
      type: 'placeMgt/save',
      payload: {
        qrcodeModalVisible: true,
        qrcodePlaceId: item.id,
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
      type: 'placeMgt/save',
      payload: {
        qrcodeModalVisible: false,
      },
    });
  };

  const printQRCode = useReactToPrint({
    content: () => qrcodeRef.current,
  });

  return (
    <Modal
      visible={qrcodeModalVisible}
      onCancel={hideModal}
      width={348}
      closable={false}
      destroyOnClose
      footer={[
        <Button key="back" onClick={hideModal}>
          取消
        </Button>,
        <Button key="print" type="primary" onClick={printQRCode}>
          打印
        </Button>,
      ]}
    >
      <div ref={qrcodeRef} style={{ padding: 30 }}>
        <QRCode
          value={qrcodePlaceId} //value参数为生成二维码
          size={240} //二维码的宽高尺寸
          fgColor="#000000" //二维码的颜色
        />
      </div>
    </Modal>
  );
};

export default connect(({ placeMgt }) => ({
  placeMgt,
}))(QRCodeModal);
