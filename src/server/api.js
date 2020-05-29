import HttpClient from './httpClient'

var API = {};

API.getData = () =>{
  return HttpClient.instance.get('/contactList');
};

// API.getCaipuData = (params) =>{
//   return HttpClient.instance1.get('/cook/query.php',{params:params});
// };

export default API