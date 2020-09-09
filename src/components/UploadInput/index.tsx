import { connect } from 'umi';
import { Button, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
/**
 * 上传表单组件
 * @param value  {
        url, 文件地址
        id, 文件id
        name, 文件名称
      },
 * @param type 文件类型 image、 excel
 */
const UploadInput = ({ value, actionRef, type, onChange, disabled, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const [upFileList, setUpFileList] = useState([]);

  const setFile = ({ name, url, id }) => {
    setUpFileList([
      {
        url,
        uid: id,
        name,
        status: 'done',
      },
    ]);
  };

  const beforeUpload = file => {
    if (type === 'image') {
      return verifyImgFile(file);
    }

    if (type === 'excel') {
      return verifyExcelFile(file);
    }

    return verifyFile(file);
  };

  const verifyImgFile = file => {
    const isImage =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'image/gif';

    if (!isImage) {
      message.error('仅支持上传图片，请选择图片进行上传！');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }

    return isImage && isLt2M;
  };

  const verifyExcelFile = file => {
    const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
    const isExcel = fileType === 'xlsx' || file.type === 'xls';

    if (!isExcel) {
      message.error('仅支持上传excel文件，请选择对应文件进行上传！');
    }

    const isLt20M = file.size / 1024 / 1024 < 20;

    if (!isLt20M) {
      message.error('文件大小不能超过 20MB!');
    }

    return isExcel && isLt20M;
  };
  const verifyFile = file => {
    console.warn('file.type: ', file.type);

    const isLt20M = file.size / 1024 / 1024 < 20;

    if (!isLt20M) {
      message.error('文件大小不能超过 20MB!');
    }

    return isLt20M;
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ setFile });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { setFile };
    }
  }, []);

  useEffect(() => {
    if (value) setFile(value);
  }, [value]);

  const handleChange = ({ file, fileList }) => {
    if (fileList.length > 0 && file.status) {
      setLoading(true);
      new Promise(resolve => {
        dispatch({
          type: 'global/uploadFile',
          payload: {
            file,
          },
          resolve,
        });
      })
        .then(data => {
          setLoading(false);
          const tempFile = {
            url: data.url,
            uid: data.id,
            name: data.fileName,
            status: 'done',
          };
          setUpFileList([tempFile]);

          onChange && onChange(tempFile);
        })
        .catch(_ => {
          setLoading(false);
        });
    }
  };

  const handleRemove = () => {
    setUpFileList([]);
  };

  const imgUploadButton =
    upFileList && upFileList.length > 0 ? null : (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );

  return (
    <Upload
      disabled={disabled}
      fileList={upFileList}
      listType={type === 'image' ? 'picture-card' : 'text'}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      {type === 'image' ? imgUploadButton : <Button icon={<UploadOutlined />}>点击上传文件</Button>}
    </Upload>
  );
};

export default connect(() => ({}))(UploadInput);