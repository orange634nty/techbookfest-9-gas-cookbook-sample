/**
 * レビュー可能な MR を Discord に通知する
 */
function myFunction() {
  const mergeRequests = getMergeRequests()
  const embed = buildMergeRequestEmbed(mergeRequests)
  postToDiscord([embed])
}

/**
 * MR を GitLab API を使って取得する
 */
function getMergeRequests() {
  const API_URL = "dummy_url"
  const response = UrlFetchApp.fetch(API_URL)
  const content = response.getContentText("UTF-8")
  return JSON.parse(content)
}

/**
 * MR の取得結果から embed を作成する
 */
function buildMergeRequestEmbed(mergeRequests) {
  const title = mergeRequests.length === 0 ? "レビュー待ちのMRはありません" : `レビュー待ちMRが${mergeRequests.length.toString()}個あります`
  return {
    title: title,
    url: "https://gitlab.com/kemo-remember/kfremember/merge_requests?label_name%5B%5D=please+review",
    color: 16754260,
    fields: buildNotifyFields(mergeRequests)
  }
}

/**
 * embed の fields を作成する
 */
function buildNotifyFields(mergeRequests) {
  const fields = []
  for (const mergeRequest of mergeRequests) {
    fields.push({name: mergeRequest.title, value: `└ ${mergeRequest.web_url}`})
  }
  return fields
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
