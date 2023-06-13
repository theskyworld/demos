// 1.基本操作

// 基本get请求
// 参数包含在url中
axios
  .get("/user?ID=12345")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 参数包含在配置对象的属性中
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 基本post请求
// 参数包含在配置对象中
axios
  .post("/user", {
    firstName: "Fred",
    lastName: "Alice",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 参数包含在配置字符串中
// 请求头中Content-Type的值会被设置为"appliaction/x-www-form-urlencoded"
axios
  .post("/user", "firstName=Fred&lastName=Alice")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 2.请求配置参数
axios({
  url: "/list",
  method: "get",
  baseURL: "https://www.baidu.com",
  transformRequest: [
    function (data, headers) {
      // 修改请求数据,对data进行转换
      return data;
    },
  ],
  transformResponse: [
    function (data) {
      // 修改相应数据,对data进行转换
      return data;
    },
  ],
  headers: {
    "Content-Type": "application/json", //post等请求中使用
  }, // 请求头
  params: {}, // 请求参数
  data: {}, //请求体数据  post等请求中使用
  timeout: 1000, //请求超时
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 第二个参数为请求配置参数对象
axios
  .get("/list", {
    headers: {},
    params: {},
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 第二个参数为请求体数据,第三个参数为请求配置参数对象
axios
  .post(
    "/list2",
    {
      userName: "Alice",
      age: 12,
    },
    {
      headers: {},
      params: {},
    }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 全局默认配置
// 作用于全局所有请求
axios.defaults.baseURL = "www.baidu.com";
axios.defaults.params = {
  age: 20,
};

// 3.请求和响应拦截器
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 发生请求前进行的操作
    // 例如添加全局的loading
    // 例如添加token令牌
    // config.headers.token = '';
    return config;
  },
  function (err) {
    // 请求发送错误时进行的回调函数

    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 发生响应前进行的操作
    // 例如去除全局的loading
    return res;
  },
  function (err) {
    // 响应发送错误时进行的回调函数
    // 例如进行全局统一的响应错误处理
    if (err.response.status === 404) {
    }
    return Promise.reject(err);
  }
);

// 4.取消重复请求
// 对于同一个请求,在请求进行过程中取消后续的请求

// 得到取消请求类
const CancelToken = axios.CancelToken;

// 创建取消请求对象
const source = CancelToken.source();

// 设置取消请求token
config.cancelToken = source.token;

// 取消请求
source.cancel("请求已取消");

const CancelToken = axios.CancelToken;
axios.interceptors.request.use(function (config) {
  const source = CancelToken.source();
  confing.cancelToken = source.token;

  // 判断取消请求的条件
  if (div.innerHTML === "loading") {
    source.cancel("请求已取消");
  }

  div.innerHTML = "loading";

  return config;
});

// 5.创建实例和并发
// 创建axios实例,实现在不同axios对象下的差异操作,例如不同的请求拦截
const instance1 = axios.create([config]);
const instance2 = axios.create([config]);

// 使用当前axios实例发起get请求
instance1.get("/test2").then((res) => {
  console.log(res);
});

// 使用当前axios实例发起get请求
instance2.get("/test2").then((res) => {
  console.log(res);
});

// 配置当前axios实例的请求拦截器
instance1.interceptors.request.use(
  function (config) {
    config.headers.token = "111";
    return config;
  },
  function (err) {
    // 请求发送错误时进行的回调函数

    return Promise.reject(err);
  }
);

// 配置当前axios实例的请求拦截器
instance2.interceptors.request.use(
  function (config) {
    config.headers.token = "222";
    return config;
  },
  function (err) {
    // 请求发送错误时进行的回调函数

    return Promise.reject(err);
  }
);

// 并发
// 多个axios请求同时进行,全部请求结束后进行统一的操作

const xhr1 = axios.get("/list");
const xhr2 = axios.get("/json");
axios
  .all([xhr1, xhr2])
  .then((res) => {
    //res为一个数组,包含两次请求的返回结果
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
//   将两次请求的响应结果展开
axios.all([xhr1, xhr2]).then(
  axios
    .spread((res1, res2) => {
      console.log(res1);
      console.log(res2);
    })
    .catch((err) => {
      console.log(err);
    })
);

// 6.跨域
// CORS策略,后端实现
// set("Access-Control-Allow-Origin", '*');

// JSONP策略
// 利用script标签不受同源策略的影响来实现,前端实现

// 反向代理
