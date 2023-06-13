document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getDatas);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);

document.getElementById("error").addEventListener("click", errHandle);
document.getElementById("cancel").addEventListener("click", cancelToken);

axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// get请求
function getTodos() {
  axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos",
    params: {
      _limit: 10,
    },
    timeout: 1000 * 5,
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// post请求
function addTodo() {
  axios({
    method: "post",
    //   传入userid参数，值为1
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: false,
    },
    // data: JSON.stringify({
    //   title: "new Todo",
    //   completed: false,
    // }),
    timeout: 1000 * 5,
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// put、patch请求
function updateTodo() {
  axios({
    method: "put", //只将该对应部分的内容中要修改的部分进行替换
    // method: "patch",   //将该对应部分的内容全部替换
    //   传入userid参数，值为1
    url: "https://jsonplaceholder.typicode.com/posts/1",
    data: JSON.stringify({
      title: "Updated Todo",
      completed: true,
    }),
    timeout: 1000 * 5,
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// delete请求
function removeTodo() {
  axios({
    method: "delete",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    timeout: 1000 * 5,
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// 并发请求
function getDatas() {
  const service1 = axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos",
    params: {
      _limit: 10,
    },
  });
  const service2 = axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/posts",
    params: {
      _limit: 10,
    },
  });

  axios
    .all([service1, service2])
    .then(axios.spread((todos, posts) => showOutInput(posts)))
    .catch((err) => errHandling(err));
}

// 自定义请求头
function customHeaders() {
  const config = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: false,
    },
    config,
    timeout: 1000 * 5,
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// 错误处理
function errHandle() {
  axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todoss",
    params: {
      _limit: 10,
    },
    timeout: 1000 * 5,
    validateStatus: function (status) {
      //   只有当响应状态码大于或等于400时才会触发catch函数
      return status < 400;
    },
  })
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// 取消请求
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutInput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    //   取消请求并传递取消之后的message信息（thrown.message的值）
    source.cancel("Request canceled!");
  }
}

// 创建axios实例
// const axiosInstance = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
// });
// axiosInstance
//   .get("/comments")
//   .then((res) => showOutInput(res))
//   .catch((err) => errHandling(err));

// 转换响应，对接收到的响应结果进行转换处理
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world",
      completed: false,
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();

      return data;
    }),
  };

  axios(options)
    .then((res) => showOutInput(res))
    .catch((err) => errHandling(err));
}

// 错误处理
function errHandling(err) {
  // 服务器成功响应，但响应结果的状态码不在200的范围内
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);

    if (err.response.status === 404) {
      alert("Error : Page Not Found");
    }
    //   请求已发出，但是没有响应
  } else if (err.request) {
    console.error(err.request);
  } else {
    console.error(err.message);
  }
}

// 配置（全局）请求、响应拦截器
axios.interceptors.request.use(
  (config) => {
    const sentDate = new Date();
    console.log(`${config.method.toUpperCase()} request sent to ${
      config.url
    } at ${sentDate.getFullYear()} 年 ${
      sentDate.getMonth() + 1
    } 月 ${sentDate.getDate()} 日
      ${sentDate.getHours()} 时 ${sentDate.getMinutes()} 分 ${sentDate.getSeconds()} 秒
    `);
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

function showOutInput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
    `;
}
