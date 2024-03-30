import { DefaultFooter } from '@ant-design/pro-layout';
import React from "react";
class Footer extends React.PureComponent{
  render(){
    return(
      <DefaultFooter
        copyright={`Created by 西南科技大学 RY`}
      >
      </DefaultFooter>
  )
  }
}

export default Footer;
