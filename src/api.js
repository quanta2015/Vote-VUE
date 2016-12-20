var serverIp = 'http://localhost:8888'

exports.getVoteInfo = function (root, cb) {
  root.$http.get(serverIp + '/voteInfo').then(cb)
}

exports.getVoteResult = function (root, cb) {
  root.$http.get(serverIp + '/voteResult').then(cb)
}

exports.postVote = function (root, ret, cb) {
  var jsonData = {infos: ret}
  root.$http.post(serverIp + '/vote', jsonData).then(cb)
}
