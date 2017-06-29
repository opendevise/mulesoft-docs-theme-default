!function() {
  var xmlEncode = function(str) {
    // see https://jsperf.com/htmlencoderegex/25
    return document.createElement('div').appendChild(document.createTextNode(str)).parentNode.innerHTML;
  };
  !function() {
    var overlay = document.createElement('div');
    overlay.id = 'st-search-overlay';
    var dimmer = document.createElement('div');
    dimmer.className = 'st-search-overlay-dimmer';
    overlay.appendChild(dimmer);
    var panel = document.createElement('div');
    panel.id = 'st-search-panel';
    var header = document.createElement('div');
    header.className = 'st-search-panel-header';
    var form = document.createElement('form');
    form.id = 'st-search-panel-form';
    var input = document.createElement('input');
    input.id = 'st-search-panel-input';
    input.type = 'text';
    input.placeholder = 'Search the docs';
    input.className = 'search-panel-input';
    input.autocomplete = 'off';
    input.autocorrect = 'off';
    input.autocapitalize = 'off';
    form.appendChild(input);
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Submit';
    submit.style = 'display: none';
    form.appendChild(submit);
    var close = document.createElement('a');
    close.id = 'st-search-panel-close';
    close.appendChild(document.createTextNode('Close'));
    form.appendChild(close);
    header.appendChild(form);
    panel.appendChild(header);
    var results = document.createElement('div');
    results.id = 'st-search-results';
    panel.appendChild(results);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  }();
  $('#st-search-input').swiftype({
    searchFields: { 'page': ['title'] },
    fetchFields: { 'page': ['title', 'version', 'url'] },
    highlightFields: { 'page': { 'title': {} } },
    autocompleteContainingElement: '#st-autocomplete-panel',
    widgetContainerClass: 'st-autocomplete-container',
    suggestionListClass: 'st-autocomplete-results',
    setWidth: false,
    resultRenderFunction: function(ctx, results) {
      var $list = ctx.list, config = ctx.config;
      $.each(results, function(type, items) {
        $.each(items, function(idx, item) {
          ctx.registerResult($('<li>' + config.renderFunction(type, item) + '</li>').appendTo($list), item);
        });
      });
    },
    renderFunction: function(_, item) {
      return '<a href="' + item.url + '" class="result-item">' +
          '<span class="result-title">' + (item.highlight.title || xmlEncode(item.title)) + '</span>' +
          (item.version === undefined ? '' : '&nbsp;<span class="result-detail">' + item.version + '</span>') +
          '</a>'
    },
    engineKey: Swiftype.engine_key
  });
  $('#st-search-input, #st-search-panel-input').swiftypeSearch({
    resultContainingElement: '#st-search-results',
    fetchFields: { 'page': ['title', 'body', 'version', 'url'] },
    perPage: 20,
    renderFunction: function(_, item) {
      return '<a href="' + item.url + '" class="result-item">' +
          '<span class="result-title">' + (item.highlight.title || item.title) + '</span>' +
          (item.version === undefined ? '' : '&nbsp;<span class="result-detail">' + item.version + '</span>') +
          '<span class="result-body">' + (item.highlight.body || xmlEncode(item.body)) + '</span>' +
          '</a>'
    },
    engineKey: Swiftype.engine_key
  });
  $('#st-search-form').submit(function(e) {
    $('#st-search-panel-input').val(this.q.value);
    $('#st-search-overlay').show();
    $('#st-search-panel-close').click(function() {
      $('#st-search-overlay').hide();
    });
    e.preventDefault();
  });
}();
