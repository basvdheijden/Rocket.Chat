RocketChat.Solr = {
  constructUrl: (keywords) => {
    const settings = RocketChat.Livechat.getInitSettings();

    if (!settings || !settings.Livechat_solrUrl) {
      return false;
    }

    const query = encodeURI(keywords.map((keyword) => {
      return 'spell:' + keyword;
    }).join(' '));

    return settings.Livechat_solrUrl.replace('{{QUERY}}', query);
  },

  getResults: (keywords) => {
    const url = RocketChat.Solr.constructUrl(keywords);

    if (!url) {
      return false;
    }

    const response = HTTP.get(url);

    if (response.statusCode !== 200) {
      return false;
    }

    let data;

    try {
      data = JSON.parse(response.content);
    }
    catch (e) {
      return false;
    }

    if (!data || !data.response || !data.response.numFound) {
      return false;
    }

    return data.response.docs.map((document) => {
      return {
        url: document.site + document.sm_url.join('').substr(1),
        text: _.capitalize(document.ss_title_1)
      }
    });
  }
};
