import React from 'react';
import { Card, } from 'antd';


const ResultCard = ({ title, blockData}) => {
  return (
          <Card 
            title={title}
            bordered
            bodyStyle={{textAlign:"center",fontSize:'20px',height:'100px'}}
            headStyle={{textAlign:'center',backgroundColor:'#f5f5f5',height:'16px'}}
          >
            {blockData}
          </Card>
  );
};

export default ResultCard;
