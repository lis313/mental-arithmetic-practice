import axios from 'axios';
function makeurl(url) {
  return 'http://cal.romi.fun/api' + url;
}
const getInfo = makeurl('/cal/info'); //get主页信息
const createList = makeurl('/cal/create'); //post 生成算式
const getList = makeurl('/cal/index'); //get 获取算式
const getWrong = makeurl('/cal/wrong'); //get 获取错题
const completeList = makeurl('/cal/complete'); //post 完成算式
const getAnalyst = makeurl('/cal/analyst'); //get 正确分析

export async function getInf(payload) {
  return axios
    .get(getInfo, {
      params: {
        ...payload,
      },
      
    })
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}
export async function getAnalysts(payload) {
    return axios
      .get(getAnalyst, {
        params: {
          ...payload,
        },
        
      })
      .then(function(response) {
        // handle success
        return response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
export async function getLists(payload) {
  return axios
    .get(getList,{
      params: {...payload},
    })
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}
export async function getWrongs() {
  return axios
    .get(getWrong, {
      params: {},
      
    })
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

export async function createLists(payload) {
  return axios
    .post(
        createList,
      {
        ...payload,
      },
      
    )
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

export async function completeLists(payload) {
  return axios
    .post(
        completeList,
      {
        ...payload,
      },
      
    )
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

