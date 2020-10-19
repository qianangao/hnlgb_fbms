import React from 'react';
import ProTable from '@ant-design/pro-table';
import styles from './CardBlock.less';

const CardBlock = ({ title, data, icon, openDetailModal }) => {
  const columns = [
    {
      align: 'left',
      dataIndex: 'title',
    },
  ];
  return (
    <div className={styles.cardBlock}>
      <div className={styles.cardTitle}>
        <img src={icon} style={{ marginRight: 8 }} alt="icon" />
        <span>{title}</span>
      </div>
      <div className={styles.cardBody}>
        <ProTable
          rowKey="id"
          dataSource={data}
          showHeader={false}
          search={false}
          options={false}
          columns={columns}
          pagination={{
            showSizeChanger: false,
            defaultPageSize: 5,
            simple: true,
          }}
          onRow={record => {
            return {
              onClick: () => {
                openDetailModal(record, title);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default CardBlock;
