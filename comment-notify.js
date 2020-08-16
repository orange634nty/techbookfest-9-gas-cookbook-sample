/**
 * post の投稿を受ける
 */
function doPost(e) {
  const req = JSON.parse(e.postData.contents)
  const embed = buildCommentEmbed(req)
  postToDiscord([embed])
}

/**
 * コメントの embed を作成する
 */
function buildCommentEmbed(req) {
  return {
    title: "コメントが追加されました",
    description: req.object_attributes.note,
    url: req.object_attributes.url,
    color: 16754260,
    fields: [
      {name: "MR title", value: req.merge_request.title, inline: true},
      {name: "comment by", value: req.user.username, inline: true}
    ]
  }
}

/**
 * Webhook を使って Discord へ投稿する
 */
function postToDiscord(embeds) {
  const DISOCRD_WEBHOOK_TOKEN = "dummy"
  const DISCORD_WEBHOOK_URL = "dummy_url"
  const jsonData = {
    token: DISOCRD_WEBHOOK_TOKEN,
    embeds: embeds
  }
  const options = {
    method: "post",
    headers: {"Content-type":"application/json"},
    payload: JSON.stringify(jsonData)
  }
  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options)
}
