const rootUrl = 'http://localhost:8000/api';
// const rootUrl = 'https://bank.pythonav.com/api';

module.exports = {
  bank: rootUrl + "/bank/",
  bankStatistics: rootUrl + "/bank/statistics/",
  bankFace: rootUrl + "/bank/face/",
  bankVoice: rootUrl + "/bank/voice/",
  bankGoods: rootUrl + "/bank/goods/",

  bankActivity: rootUrl + "/bank/activity/",
  bankApply: rootUrl + "/bank/apply/",
  bankHrv: rootUrl + "/bank/hrv/",
  bankExchange: rootUrl + "/bank/exchange/",
  bankScore: rootUrl + "/bank/score/",
  bankexchangeRecord: rootUrl + "/bank/exchange/record/",
}