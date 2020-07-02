import HttpClient from './httpClient'

var API = {};

API.login = (params) =>{
  return HttpClient.instance.post('/login',params)
}

API.register = (params) =>{
  return HttpClient.instance.post('/register',params)
}

API.getData = () =>{
  return HttpClient.instance.get('/contactList');
};

// API.getCaipuData = (params) =>{
//   return HttpClient.instance1.get('/cook/query.php',{params:params});
// };

export default API