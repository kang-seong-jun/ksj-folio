/* The portable chat widget.
 *
 * The same widget runs on three sites that share nothing: this repo's static frontend,
 * kangseongjun.com (a single hand-written HTML page on GitHub Pages), and
 * seong-jun-kang.web.app (a Next.js static export on Firebase). So it depends on nothing,
 * builds its own DOM, and takes its API host from an option rather than assuming the
 * page it lives on is also the server.
 *
 * Usage:
 *   KSJChat.mount('#chat-mount', { apiBase: 'https://api.kangseongjun.com' });
 *
 * Layout follows the shape people already know from ChatGPT, Claude, and Gemini: at rest
 * there is no empty transcript box, just the composer with suggestions under it. The log
 * appears above the composer on the first question and grows from there.
 *
 * Colours come from CSS custom properties, which is how one widget sits inside both a
 * white paper CV and a dark glass hero without a second stylesheet. See ksj-chat.css.
 */

(function (global) {
  'use strict';

  /* ------------------------------------------------------------- markdown */
  /* Answers come from a language model, so they are escaped before any tag is added.
   * A model that emits <script> renders it as text. Trimmed down from the full renderer
   * in js/markdown.js to what an answer actually uses. */

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(url) {
    var u = String(url).trim();
    if (/^(https?:\/\/|mailto:|#)/i.test(u)) return escapeHtml(u);
    return '#';
  }

  function inline(text) {
    var out = escapeHtml(text);

    var codes = [];
    out = out.replace(/`([^`]+)`/g, function (_, code) {
      codes.push(code);
      return ' CODE' + (codes.length - 1) + ' ';
    });

    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, url) {
      return '<a href="' + safeUrl(url) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    });

    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');

    return out.replace(/ CODE(\d+) /g, function (_, i) {
      return '<code>' + escapeHtml(codes[Number(i)]) + '</code>';
    });
  }

  function renderMd(md) {
    if (!md) return '';
    var lines = String(md).replace(/\r\n/g, '\n').split('\n');
    var html = [];
    var i = 0;

    function listBlock(ordered) {
      var tag = ordered ? 'ol' : 'ul';
      var items = [];
      var re = ordered ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
      while (i < lines.length) {
        if (re.test(lines[i])) {
          items.push('<li>' + inline(lines[i].match(re)[1]) + '</li>');
          i++;
          continue;
        }
        // A blank line between items is still one list. Models write loose lists all the
        // time, and stopping here started a fresh <ol> per item, so a three-step answer
        // numbered itself 1. 1. 1.
        if (!lines[i].trim()) {
          var j = i;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && re.test(lines[j])) { i = j; continue; }
        }
        break;
      }
      html.push('<' + tag + '>' + items.join('') + '</' + tag + '>');
    }

    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }

      if (/^```/.test(line)) {
        var buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        html.push('<pre><code>' + escapeHtml(buf.join('\n')) + '</code></pre>');
        continue;
      }

      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        var lv = Math.min(h[1].length + 2, 6);  // an answer's h1 must not outrank the page's
        html.push('<h' + lv + '>' + inline(h[2]) + '</h' + lv + '>');
        i++;
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) { listBlock(false); continue; }
      if (/^\s*\d+[.)]\s+/.test(line)) { listBlock(true); continue; }

      var para = [];
      while (i < lines.length && lines[i].trim() &&
             !/^(#{1,6}\s|```|\s*[-*+]\s|\s*\d+[.)]\s)/.test(lines[i])) {
        para.push(lines[i]);
        i++;
      }
      if (para.length) html.push('<p>' + inline(para.join(' ')) + '</p>');
    }

    return html.join('\n');
  }

  /* --------------------------------------------------------------- markup */
  var SEND_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

  // The four-point star every assistant uses for itself. Decorative, so it is hidden
  // from the accessibility tree and the answer is announced by the live region instead.
  var SPARK_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.1 5.6a4 4 0 0 0 2.4 2.4l5.6 2.1' +
    '-5.6 2.1a4 4 0 0 0-2.4 2.4L12 22.8l-2.1-5.6a4 4 0 0 0-2.4-2.4L1.9 12.7l5.6-2.1a4 4 0 0 0 2.4-2.4z"/></svg>';

  var COPY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/>' +
    '<path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';

  var CHECK_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';

  function shell(opts) {
    return '' +
      '<div class="ksj-head">' +
        '<h2 class="ksj-title">' + escapeHtml(opts.title) + '</h2>' +
        (opts.intro ? '<p class="ksj-intro">' + escapeHtml(opts.intro) + '</p>' : '') +
      '</div>' +
      '<div class="ksj-log" aria-live="polite" aria-atomic="false" hidden></div>' +
      // Two rows, the way every assistant composer is built: the text on its own line,
      // and a toolbar under it. The toolbar is most of what makes the block read as
      // something you type into rather than one more button.
      '<form class="ksj-composer">' +
        '<label class="ksj-sr" for="' + opts.inputId + '">Your question</label>' +
        '<textarea id="' + opts.inputId + '" rows="1" autocomplete="off" ' +
          'placeholder="' + escapeHtml(opts.placeholder) + '"></textarea>' +
        '<div class="ksj-bar">' +
          '<p class="ksj-hint">' + escapeHtml(opts.hint) + '</p>' +
          '<button type="submit" class="ksj-send" aria-label="Send question" disabled>' +
            SEND_ICON +
          '</button>' +
        '</div>' +
      '</form>' +
      '<ul class="ksj-chips"></ul>' +
      '<p class="ksj-disclaimer">' + escapeHtml(opts.disclaimer) + '</p>';
  }

  /* -------------------------------------------------------------- widget */
  var seq = 0;

  function Chat(root, options) {
    var opts = {
      apiBase: '',
      title: 'Ask about my research',
      intro: 'Answers are drawn from his papers, positions, and notes, with sources.',
      placeholder: 'Ask about a paper, a method, or a collaboration',
      disclaimer: 'Answers cite what they used. If it is not in the corpus, it says so.',
      hint: 'Enter to send · Shift+Enter for a new line',
      suggestions: [],
      historyTurns: 8
    };
    for (var k in options) if (options.hasOwnProperty(k)) opts[k] = options[k];
    opts.inputId = 'ksj-chat-input-' + (++seq);

    this.opts = opts;
    this.root = root;
    this.history = [];
    this.busy = false;

    root.classList.add('ksj-chat');
    root.innerHTML = shell(opts);

    this.log = root.querySelector('.ksj-log');
    this.form = root.querySelector('.ksj-composer');
    this.input = root.querySelector('textarea');
    this.send = root.querySelector('.ksj-send');
    this.chips = root.querySelector('.ksj-chips');

    this.bind();
    this.renderChips();
  }

  Chat.prototype.bind = function () {
    var self = this;

    this.form.addEventListener('submit', function (e) {
      e.preventDefault();
      self.ask(self.input.value);
    });

    this.input.addEventListener('input', function () {
      self.autosize();
      self.syncSend();
    });

    this.input.addEventListener('keydown', function (e) {
      // Enter sends. Shift+Enter is a newline, which is what a long question needs.
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        self.ask(self.input.value);
      }
    });

    this.chips.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (btn) self.ask(btn.textContent);
    });
  };

  Chat.prototype.renderChips = function () {
    this.chips.innerHTML = (this.opts.suggestions || []).map(function (q) {
      return '<li><button type="button">' + escapeHtml(q) + '</button></li>';
    }).join('');
  };

  // Dims a suggestion once it has been asked, so the list reads as a set of four things
  // to try with the covered ones checked off. It stays clickable: asking again is a
  // reasonable thing to want, and refusing it would need explaining.
  Chat.prototype.markChipUsed = function (question) {
    var q = question.trim();
    var buttons = this.chips.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.trim() === q) buttons[i].classList.add('is-used');
    }
  };

  Chat.prototype.autosize = function () {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 160) + 'px';
  };

  // The send button is dead until there is something to send, which is the affordance
  // every mainstream assistant uses to say "this is the button".
  Chat.prototype.syncSend = function () {
    this.send.disabled = this.busy || !this.input.value.trim();
  };

  Chat.prototype.scroll = function () { this.log.scrollTop = this.log.scrollHeight; };

  Chat.prototype.addUser = function (text) {
    var node = document.createElement('div');
    node.className = 'ksj-msg ksj-msg-user';
    node.innerHTML = '<div class="ksj-body">' + escapeHtml(text) + '</div>';
    this.log.appendChild(node);
    this.scroll();
  };

  // Returns the body to paint into and the turn to hang the actions off. The avatar is a
  // sibling of the text rather than part of it, so a long answer wraps against the text
  // column and not under the badge.
  Chat.prototype.addAssistant = function () {
    var node = document.createElement('div');
    node.className = 'ksj-msg ksj-msg-assistant';
    node.innerHTML =
      '<div class="ksj-avatar">' + SPARK_ICON + '</div>' +
      '<div class="ksj-turn">' +
        '<div class="ksj-body ksj-streaming">' +
          '<div class="ksj-thinking"><span></span><span></span><span></span></div>' +
        '</div>' +
      '</div>';
    this.log.appendChild(node);
    this.scroll();
    return { body: node.querySelector('.ksj-body'), turn: node.querySelector('.ksj-turn') };
  };

  // Copies the Markdown rather than the rendered text, which is what every assistant
  // does and what anyone pasting an answer into notes actually wants.
  Chat.prototype.addActions = function (turn, getText) {
    var bar = document.createElement('div');
    bar.className = 'ksj-actions';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ksj-copy';
    btn.innerHTML = COPY_ICON + '<span>Copy</span>';
    bar.appendChild(btn);
    turn.appendChild(bar);

    var revert;
    btn.addEventListener('click', function () {
      var done = function (ok) {
        btn.innerHTML = (ok ? CHECK_ICON : COPY_ICON) +
                        '<span>' + (ok ? 'Copied' : 'Press ' + copyKey()) + '</span>';
        btn.classList.toggle('is-done', ok);
        clearTimeout(revert);
        revert = setTimeout(function () {
          btn.innerHTML = COPY_ICON + '<span>Copy</span>';
          btn.classList.remove('is-done');
        }, 1800);
      };
      // Clipboard access needs a secure context, so it is absent on plain http. Say so
      // rather than leaving a button that silently does nothing.
      if (!navigator.clipboard) return done(false);
      navigator.clipboard.writeText(getText()).then(function () { done(true); },
                                                    function () { done(false); });
    });
  };

  function copyKey() {
    return /Mac|iP(hone|ad|od)/.test(navigator.platform || '') ? '⌘C' : 'Ctrl+C';
  }

  /* ------------------------------------------------------------ citations */
  Chat.prototype.sourcesBlock = function (citations) {
    if (!citations || !citations.length) return '';
    var items = citations.map(function (c) {
      var label = c.title + (c.section ? ' &rsaquo; ' + c.section : '');
      // An anchor like #publications only resolves on the site the chatbot was built
      // for. Off that site it points nowhere, so it renders as plain text.
      var body = /^https?:\/\//i.test(c.url || '')
        ? '<a href="' + safeUrl(c.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + '</a>'
        : escapeHtml(label);
      return '<li id="ksj-cite-' + escapeHtml(c.marker) + '">' + body +
             ' <span class="ksj-path">' + escapeHtml(c.path) + '</span></li>';
    }).join('');
    return '<details class="ksj-sources"><summary>' + citations.length +
           ' sources</summary><ol>' + items + '</ol></details>';
  };

  Chat.prototype.linkCitations = function (html, citations) {
    if (!citations || !citations.length) return html;
    var known = {};
    citations.forEach(function (c) { known[c.marker] = c; });

    return html.replace(/\[(S\d+(?:\s*,\s*S\d+)*)\]/g, function (whole, inner) {
      var out = inner.split(/\s*,\s*/).map(function (m) {
        var c = known[m];
        if (!c) return null;
        var tip = c.title + (c.section ? ' > ' + c.section : '') + ' (' + c.path + ')';
        return '<a class="ksj-cite" href="#ksj-cite-' + escapeHtml(m) + '" title="' +
               escapeHtml(tip) + '">' + escapeHtml(m) + '</a>';
      });
      // An unknown marker means the model invented one. Leave the raw text visible
      // rather than quietly dropping it, so it is obvious something is off.
      if (out.indexOf(null) !== -1) return whole;
      return out.join('');
    });
  };

  /* --------------------------------------------------------------- stream */
  Chat.prototype.ask = async function (question) {
    if (this.busy || !question || !question.trim()) return;
    question = question.trim();

    this.busy = true;
    this.input.value = '';
    this.autosize();
    this.syncSend();

    // The transcript only exists once there is something in it.
    this.log.hidden = false;

    // The suggestions stay. ChatGPT and Gemini drop theirs after the first message, but
    // theirs are throwaway prompts for an open-ended assistant. These four are a curated
    // list of what this corpus answers well, so someone who asks one has every reason to
    // want the other three. The one just used is marked rather than removed, so the list
    // does not reflow under the cursor.
    this.markChipUsed(question);

    var self = this;
    this.addUser(question);
    var turnParts = this.addAssistant();
    var body = turnParts.body;
    var turn = turnParts.turn;

    var text = '';
    var citations = [];
    var res;

    // The answer gets its own wrapper so the caret can hang off the last line of the
    // text. Without it the sources block is the body's last child and the caret ends up
    // stranded underneath it.
    function paint() {
      body.innerHTML =
        '<div class="ksj-answer">' + self.linkCitations(renderMd(text), citations) + '</div>' +
        self.sourcesBlock(citations);
      self.scroll();
    }

    try {
      res = await fetch(this.opts.apiBase + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          history: this.history.slice(-this.opts.historyTurns)
        })
      });
    } catch (err) {
      return this.finish(body, null, 'Could not reach the server.');
    }

    if (!res.ok) {
      var detail = 'The server returned ' + res.status + '.';
      try {
        var j = await res.json();
        if (j.detail) detail = typeof j.detail === 'string' ? j.detail : JSON.stringify(j.detail);
      } catch (e) { /* body was not json */ }
      return this.finish(body, null, detail);
    }

    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buffer = '';

    try {
      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var frames = buffer.split('\n\n');
        buffer = frames.pop();

        for (var i = 0; i < frames.length; i++) {
          var line = frames[i].trim();
          if (line.indexOf('data:') !== 0) continue;
          var ev;
          try { ev = JSON.parse(line.slice(5).trim()); } catch (e) { continue; }

          // retrieval_mode on the citations event and model / fell_back on the done
          // event are read and dropped. Which model answered is the server's business,
          // not a visitor's, and the server already logs a fallback.
          if (ev.type === 'citations') {
            citations = ev.citations || [];
          } else if (ev.type === 'text') {
            text += ev.text;
            paint();
          } else if (ev.type === 'error') {
            return this.finish(body, citations, ev.error, text);
          }
        }
      }
    } catch (err) {
      return this.finish(body, citations, 'The connection dropped while answering.', text);
    }

    if (!text.trim()) {
      return this.finish(body, citations, 'The model returned an empty answer. Try rephrasing.');
    }

    paint();
    body.classList.remove('ksj-streaming');
    this.addActions(turn, function () { return text; });
    this.scroll();  // the actions land after the last paint, so bring them into view
    this.history.push({ role: 'user', content: question });
    this.history.push({ role: 'assistant', content: text });
    this.done();
  };

  Chat.prototype.finish = function (body, citations, error, partial) {
    var html = partial ? renderMd(partial) : '';
    html += '<div class="ksj-error">' + escapeHtml(error) + '</div>';
    if (citations) html += this.sourcesBlock(citations);
    body.innerHTML = html;
    body.classList.remove('ksj-streaming');
    this.scroll();
    this.done();
  };

  Chat.prototype.done = function () {
    this.busy = false;
    this.syncSend();
  };

  /* ----------------------------------------------------------------- api */
  global.KSJChat = {
    mount: function (target, options) {
      var el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) throw new Error('KSJChat.mount: no element matched ' + target);
      return new Chat(el, options || {});
    }
  };
})(window);
