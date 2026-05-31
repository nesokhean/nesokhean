//  Store Admin
(function () {
  'use strict';

  // ── Storage keys 
  const ASSIGN_KEY = 'lf_assignments_v1';

  // ── Storage helpers 
  function getStore() {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
    const seed = {
      courses: (window.COURSES || []).map(c => ({ ...c })),
      books:   (window.BOOKS   || []).map(b => ({ ...b })),
      videos:  (window.VIDEOS  || []).map(v => ({ ...v })),
    };
    saveStore(seed);
    return seed;
  }

  function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
    _syncGlobal('COURSES', store.courses);
    _syncGlobal('BOOKS',   store.books);
    _syncGlobal('VIDEOS',  store.videos);
  }

  function _syncGlobal(key, items) {
    if (!window[key]) return;
    window[key].length = 0;
    items.forEach(item => window[key].push(item));
  }

  function getAssignments()        { return JSON.parse(localStorage.getItem(ASSIGN_KEY) || '{}'); }
  function saveAssignments(data)   { localStorage.setItem(ASSIGN_KEY, JSON.stringify(data)); }
  function getUsers()              { return JSON.parse(localStorage.getItem('lf_users_v1') || '[]'); }

  // ── Utility helpers 
  function uid(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function esc(s)      { return String(s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function val(id)     { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

  function _existingReviews(id, storeKey) {
    const item = getStore()[storeKey].find(x => x.id === id);
    return item ? (item.reviews || 0) : 0;
  }

  // ── Field option constants
  const BADGE_OPTIONS = ['Bestseller', 'Top Rated', 'New', 'Popular', 'Trending', 'Hot', 'Editor Choice', 'Must Read', 'Classic', 'Fast Track', 'Must Watch'];
  const BADGE_COLORS  = ['amber', 'emerald', 'sky', 'violet', 'rose', 'fuchsia', 'teal', 'orange'];
  const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // ── Field builder helpers 
  function fieldGroup(id, label, inputHtml, required = false) {
    const req = required ? '<span style="color:#FF6B8A"> *</span>' : '';
    return `
      <div style="margin-bottom:.9rem">
        <label class="si-label" for="${id}">${label}${req}</label>
        <div class="si-field-wrap" id="fw-${id}">${inputHtml}</div>
        <span class="si-err" id="err-${id}"></span>
      </div>`;
  }

  function textInput(id, placeholder, value = '') {
    return `<input id="${id}" class="si-input" type="text" placeholder="${placeholder}" value="${esc(value)}"/>`;
  }

  function numberInput(id, placeholder, value = '') {
    return `<input id="${id}" class="si-input" type="number" step="0.01" min="0" placeholder="${placeholder}" value="${esc(value)}"/>`;
  }

  function selectInput(id, options, selected = '') {
    const opts = options.map(o => `<option value="${o}"${selected === o ? ' selected' : ''}>${o}</option>`).join('');
    return `<select id="${id}" class="si-select">${opts}</select>`;
  }

  function row2(...fields) {
    return `<div class="si-row-2">${fields.join('')}</div>`;
  }

  // ── Field sets per content type 
  function courseFields(c = {}) {
    return `
      ${fieldGroup('si-title', 'Title', textInput('si-title', 'React Frontend Course', c.title), true)}
      ${row2(
        fieldGroup('si-instructor', 'Instructor', textInput('si-instructor', 'Emma Williams', c.instructor), true),
        fieldGroup('si-cat', 'Category', textInput('si-cat', 'React', c.cat), true)
      )}
      ${fieldGroup('si-img', 'Image URL', textInput('si-img', 'https://…', c.img), true)}
      ${row2(
        fieldGroup('si-price', 'Price ($)', numberInput('si-price', '49.99', c.price)),
        fieldGroup('si-orig', 'Original Price ($)', numberInput('si-orig', '129.99', c.orig))
      )}
      ${row2(
        fieldGroup('si-dur', 'Duration', textInput('si-dur', '24 hrs', c.dur)),
        fieldGroup('si-lessons', 'Lessons', textInput('si-lessons', '128', c.lessons))
      )}
      ${row2(
        fieldGroup('si-level', 'Level', selectInput('si-level', LEVEL_OPTIONS, c.level)),
        fieldGroup('si-rating', 'Rating (0–5)', numberInput('si-rating', '4.9', c.rating))
      )}
      ${row2(
        fieldGroup('si-badge', 'Badge', selectInput('si-badge', BADGE_OPTIONS, c.badge)),
        fieldGroup('si-bc', 'Badge Color', selectInput('si-bc', BADGE_COLORS, c.bc))
      )}`;
  }

  function bookFields(b = {}) {
    return `
      ${fieldGroup('si-title', 'Title', textInput('si-title', 'Clean Code', b.title), true)}
      ${fieldGroup('si-author', 'Author', textInput('si-author', 'Robert C. Martin', b.author), true)}
      ${row2(
        fieldGroup('si-cat', 'Category', textInput('si-cat', 'JavaScript', b.cat), true),
        fieldGroup('si-pages', 'Pages', textInput('si-pages', '464', b.pages))
      )}
      ${fieldGroup('si-cover', 'Cover Image URL', textInput('si-cover', 'https://…', b.cover), true)}
      ${fieldGroup('si-desc', 'Short Description', textInput('si-desc', 'A brief description…', b.desc))}
      ${row2(
        fieldGroup('si-price', 'Price ($)', numberInput('si-price', '24.99', b.price)),
        fieldGroup('si-orig', 'Original Price ($)', numberInput('si-orig', '49.99', b.orig))
      )}
      ${row2(
        fieldGroup('si-color', 'Accent Color', textInput('si-color', '#F59E0B', b.color)),
        fieldGroup('si-rating', 'Rating (0–5)', numberInput('si-rating', '4.9', b.rating))
      )}
      ${row2(
        fieldGroup('si-badge', 'Badge', selectInput('si-badge', BADGE_OPTIONS, b.badge)),
        fieldGroup('si-bc', 'Badge Color', selectInput('si-bc', BADGE_COLORS, b.bc))
      )}`;
  }

  function videoFields(v_ = {}) {
    const tagsValue = (v_.tags || []).join(', ');
    return `
      ${fieldGroup('si-title', 'Title', textInput('si-title', 'React Hooks Deep Dive', v_.title), true)}
      ${row2(
        fieldGroup('si-instructor', 'Instructor', textInput('si-instructor', 'Emma Williams', v_.instructor), true),
        fieldGroup('si-cat', 'Category', textInput('si-cat', 'React', v_.cat), true)
      )}
      ${fieldGroup('si-thumb', 'Thumbnail URL', textInput('si-thumb', 'https://img.youtube.com/vi/ID/maxresdefault.jpg', v_.thumb), true)}
      ${fieldGroup('si-yt', 'YouTube Video ID', textInput('si-yt', 'dGcsHMXbSOA', v_.yt), true)}
      ${row2(
        fieldGroup('si-price', 'Price ($)', numberInput('si-price', '14.99', v_.price)),
        fieldGroup('si-orig', 'Original Price ($)', numberInput('si-orig', '39.99', v_.orig))
      )}
      ${row2(
        fieldGroup('si-dur', 'Duration', textInput('si-dur', '1:42:18', v_.dur)),
        fieldGroup('si-views', 'Views', textInput('si-views', '124K', v_.views))
      )}
      ${row2(
        fieldGroup('si-rating', 'Rating (0–5)', numberInput('si-rating', '4.9', v_.rating)),
        fieldGroup('si-tags', 'Tags (comma separated)', textInput('si-tags', 'React, Hooks', tagsValue))
      )}
      ${row2(
        fieldGroup('si-badge', 'Badge', selectInput('si-badge', BADGE_OPTIONS, v_.badge)),
        fieldGroup('si-bc', 'Badge Color', selectInput('si-bc', BADGE_COLORS, v_.bc))
      )}`;
  }

  function _fieldsForType(type, data = {}) {
    if (type === 'course') return courseFields(data);
    if (type === 'book')   return bookFields(data);
    return videoFields(data);
  }

  // ── DOM injection
  document.body.insertAdjacentHTML('beforeend', `
    <!-- STORE ITEM MODAL -->
    <div id="si-overlay" onclick="SAM.closeOnOverlay(event)"
      style="position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.85);backdrop-filter:blur(14px);
             opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;
             display:flex;align-items:center;justify-content:center;padding:1rem">
      <div id="si-box"
        style="width:100%;max-width:640px;max-height:92vh;overflow-y:auto;
               background:var(--bg3,#12122E);border:1px solid rgba(124,111,255,.35);
               border-radius:1.75rem;padding:0;box-shadow:0 30px 80px rgba(0,0,0,.6);
               transform:translateY(24px) scale(.96);opacity:0;
               transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .35s;
               scrollbar-width:thin;scrollbar-color:#7C6FFF transparent">
        <div style="position:sticky;top:0;z-index:2;padding:1.1rem 1.5rem;
                    border-bottom:1px solid rgba(255,255,255,.07);
                    background:linear-gradient(135deg,rgba(124,111,255,.08),rgba(255,107,138,.04));
                    backdrop-filter:blur(12px);
                    display:flex;align-items:center;justify-content:space-between">
          <div>
            <div id="si-modal-title" style="font-family:'Syne',sans-serif;font-weight:800;font-size:1rem"></div>
            <div id="si-modal-sub"   style="font-size:.73rem;color:var(--txt2);margin-top:.15rem"></div>
          </div>
          <button onclick="SAM.close()"
            style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
                   color:var(--txt);border-radius:.625rem;padding:.4rem .75rem;font-size:.82rem;font-weight:600;cursor:pointer">
            ✕ Close
          </button>
        </div>

        <!-- type tabs (add mode only) -->
        <div id="si-type-tabs" style="display:flex;gap:.375rem;padding:.875rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07)">
          <button class="si-type-btn active" data-type="course" onclick="SAM.setType('course',this)">📚 Course</button>
          <button class="si-type-btn"        data-type="book"   onclick="SAM.setType('book',this)">📖 Book</button>
          <button class="si-type-btn"        data-type="video"  onclick="SAM.setType('video',this)">🎬 Video</button>
        </div>

        <div style="padding:1.5rem">
          <form id="si-form" onsubmit="SAM.submit(event)" novalidate autocomplete="off">
            <input type="hidden" id="si-editing-id"/>
            <input type="hidden" id="si-editing-type"/>
            <div id="si-fields"></div>
            <div style="display:flex;gap:.75rem;margin-top:1.5rem">
              <button type="button" class="btn btn-s" style="flex:1;justify-content:center" onclick="SAM.close()">Cancel</button>
              <button type="submit" id="si-submit" class="btn btn-p" style="flex:1;justify-content:center">Save Item →</button>
            </div>
            <div id="si-global-err" style="margin-top:.75rem;font-size:.78rem;color:#FF6B8A;font-weight:600;text-align:center;min-height:1em"></div>
          </form>
        </div>
      </div>
    </div>

    <!-- ASSIGN ITEM TO USER MODAL -->
    <div id="assign-item-overlay" onclick="SAM.closeAssignModal(event)"
      style="position:fixed;inset:0;z-index:1010;background:rgba(0,0,0,.8);backdrop-filter:blur(12px);
             opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;
             display:flex;align-items:center;justify-content:center;padding:1rem">
      <div id="assign-item-box"
        style="width:100%;max-width:480px;background:var(--bg3,#12122E);border:1px solid rgba(56,232,181,.25);
               border-radius:1.5rem;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);
               transform:scale(.95);opacity:0;transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .3s">
        <div style="padding:1.1rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07);
                    display:flex;align-items:center;justify-content:space-between;
                    background:linear-gradient(135deg,rgba(56,232,181,.06),transparent)">
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1rem">🎁 Assign to Students</div>
            <div id="assign-item-name" style="font-size:.75rem;color:var(--txt2);margin-top:.2rem"></div>
          </div>
          <button onclick="SAM.closeAssignDirect()"
            style="background:rgba(255,255,255,.07);border:none;color:var(--txt);border-radius:.625rem;padding:.4rem .75rem;font-size:.82rem;font-weight:600;cursor:pointer">✕</button>
        </div>
        <div id="assign-item-body" style="padding:1.25rem;max-height:60vh;overflow-y:auto"></div>
        <div style="padding:1rem 1.5rem;border-top:1px solid rgba(255,255,255,.07)">
          <button class="btn btn-p" style="width:100%;justify-content:center" onclick="SAM.closeAssignDirect()">Done ✓</button>
        </div>
      </div>
    </div>
  `);

  // ── Styles 
  const style = document.createElement('style');
  style.textContent = `
    #si-overlay.open  { opacity:1!important;visibility:visible!important; }
    #si-overlay.open #si-box { transform:translateY(0) scale(1)!important;opacity:1!important; }
    #assign-item-overlay.open { opacity:1!important;visibility:visible!important; }
    #assign-item-overlay.open #assign-item-box { transform:scale(1)!important;opacity:1!important; }

    .si-type-btn {
      flex:1;padding:.5rem;border-radius:.75rem;border:1px solid rgba(255,255,255,.07);
      background:transparent;color:var(--txt2);font-size:.8rem;font-weight:700;
      cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
    }
    .si-type-btn.active {
      background:rgba(124,111,255,.18);border-color:rgba(124,111,255,.5);color:var(--accent,#7C6FFF);
    }

    .si-field-wrap {
      display:flex;align-items:center;background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.07);border-radius:.875rem;
      overflow:hidden;transition:border-color .2s,box-shadow .2s;
    }
    .si-field-wrap:focus-within { border-color:rgba(124,111,255,.5);box-shadow:0 0 0 3px rgba(124,111,255,.1); }
    .si-field-wrap.err { border-color:rgba(255,107,138,.5); }

    .si-input {
      flex:1;padding:.75rem .9rem;background:transparent;border:none;outline:none;
      font-size:.875rem;color:var(--txt,#EEF0FF);font-family:'DM Sans',sans-serif;min-width:0;
    }
    .si-input::placeholder { color:rgba(122,122,157,.5); }

    .si-select {
      flex:1;padding:.75rem .9rem;background:transparent;border:none;outline:none;
      font-size:.875rem;color:var(--txt,#EEF0FF);font-family:'DM Sans',sans-serif;cursor:pointer;
    }

    .si-label {
      display:block;font-size:.72rem;font-weight:700;color:var(--txt2,#7A7A9D);
      letter-spacing:.05em;text-transform:uppercase;margin-bottom:.35rem;
    }
    .si-err { display:none;font-size:.7rem;color:#FF6B8A;margin-top:.3rem;font-weight:600; }

    .si-row-2 { display:grid;grid-template-columns:1fr 1fr;gap:.75rem; }
    @media(max-width:500px) { .si-row-2 { grid-template-columns:1fr; } }

    .assign-user-card {
      display:flex;align-items:center;gap:.875rem;padding:.875rem 1rem;
      background:rgba(255,255,255,.02);border:1px solid var(--border,rgba(255,255,255,.07));
      border-radius:.875rem;margin-bottom:.625rem;cursor:pointer;transition:all .2s;
    }
    .assign-user-card:hover { border-color:rgba(124,111,255,.25);background:rgba(124,111,255,.04); }
    .assign-user-card.on    { border-color:rgba(56,232,181,.4);background:rgba(56,232,181,.04); }

    .assign-chk {
      width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.2);
      display:flex;align-items:center;justify-content:center;font-size:.75rem;
      transition:all .2s;flex-shrink:0;color:#001a10;
    }
    .assign-chk.on { background:#38E8B5;border-color:#38E8B5; }

    .store-admin-item {
      display:flex;align-items:center;gap:.875rem;padding:.875rem 1rem;
      background:rgba(255,255,255,.02);border:1px solid var(--border,rgba(255,255,255,.07));
      border-radius:.875rem;margin-bottom:.625rem;transition:border-color .2s,background .2s;
    }
    .store-admin-item:hover { border-color:rgba(124,111,255,.25);background:rgba(124,111,255,.04); }

    .store-admin-thumb {
      width:48px;height:48px;border-radius:.625rem;object-fit:cover;
      background:rgba(255,255,255,.05);flex-shrink:0;
    }

    .store-sub-tabs { display:flex;gap:.375rem;margin-bottom:1rem;flex-wrap:wrap; }
    .store-sub-tab {
      padding:.4rem .9rem;border-radius:2rem;border:1px solid var(--border,rgba(255,255,255,.07));
      background:transparent;font-size:.78rem;font-weight:600;color:var(--txt2);
      cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
    }
    .store-sub-tab.active       { background:rgba(124,111,255,.15);color:var(--accent,#7C6FFF);border-color:rgba(124,111,255,.3); }
    .store-sub-tab:hover:not(.active) { border-color:rgba(255,255,255,.15);color:var(--txt); }

    .adm-stats { display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.875rem;margin-bottom:1.5rem; }
    .adm-stat-card {
      background:var(--bgcard,#181830);border:1px solid var(--border,rgba(255,255,255,.07));
      border-radius:1rem;padding:1rem;text-align:center;transition:border-color .2s;
    }
    .adm-stat-card:hover { border-color:rgba(124,111,255,.3); }
    .adm-stat-num {
      font-family:'Syne',sans-serif;font-weight:800;font-size:1.75rem;line-height:1;margin-bottom:.3rem;
      background:linear-gradient(135deg,#7C6FFF,#38E8B5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    .adm-stat-label { font-size:.7rem;color:var(--txt2);font-weight:600;letter-spacing:.05em; }

    .row-btn {
      padding:.28rem .65rem;border-radius:.45rem;font-size:.72rem;font-weight:700;
      cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
    }
    .row-btn-edit   { background:rgba(124,111,255,.1);border:1px solid rgba(124,111,255,.2);color:var(--accent,#7C6FFF); }
    .row-btn-edit:hover   { background:rgba(124,111,255,.2); }
    .row-btn-del    { background:rgba(255,107,138,.08);border:1px solid rgba(255,107,138,.2);color:#FF6B8A; }
    .row-btn-del:hover    { background:rgba(255,107,138,.2); }
    .row-btn-assign { background:rgba(56,232,181,.08);border:1px solid rgba(56,232,181,.2);color:#38E8B5; }
    .row-btn-assign:hover { background:rgba(56,232,181,.18); }

    .store-type-badge {
      font-size:.65rem;font-weight:800;padding:.18rem .5rem;border-radius:.35rem;
      text-transform:uppercase;letter-spacing:.04em;
    }
    .type-course { background:rgba(124,111,255,.15);color:#7C6FFF; }
    .type-book   { background:rgba(56,232,181,.12);color:#38E8B5; }
    .type-video  { background:rgba(255,107,138,.12);color:#FF6B8A; }

    [data-theme=light] .si-input,
    [data-theme=light] .si-select { color:var(--txt,#0D0D22); }
    [data-theme=light] .si-field-wrap { background:rgba(0,0,0,.03); }
  `;
  document.head.appendChild(style);

  // ── Module state 
  let _currentType    = 'course';
  let _editingId      = null;
  let _editingType    = null;
  let _assignItemId   = null;
  let _assignItemType = null;
  let _storeCache     = null;

  // ── Private helpers 
  function _openOverlay()  { document.getElementById('si-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function _closeOverlay() { document.getElementById('si-overlay').classList.remove('open'); _restoreScroll(); }

  function _restoreScroll() {
    const adminOpen = document.getElementById('admin-overlay')?.classList.contains('open');
    if (!adminOpen) document.body.style.overflow = '';
  }

  function _setFieldError(fieldId, message) {
    const errEl = document.getElementById('err-' + fieldId);
    if (errEl) { errEl.textContent = message; errEl.style.display = 'block'; }
    document.getElementById('fw-' + fieldId)?.classList.add('err');
  }

  function _clearErrors() {
    document.querySelectorAll('.si-err').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
    document.querySelectorAll('.si-field-wrap.err').forEach(el => el.classList.remove('err'));
    document.getElementById('si-global-err').textContent = '';
  }

  function _renderUserAvatar(user, index) {
    const COLORS = ['#7C6FFF', '#FF6B8A', '#38E8B5', '#F59E0B', '#06B6D4'];
    const color    = COLORS[index % COLORS.length];
    const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || user.username?.[0] || '')).toUpperCase() || '?';
    return `<div style="width:38px;height:38px;border-radius:50%;background:${color}22;border:2px solid ${color}44;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:800;color:${color};flex-shrink:0">${initials}</div>`;
  }

  function _buildCourseItem(formData, id) {
    return {
      id, type: 'course',
      title:       formData.title,
      instructor:  val('si-instructor'),
      cat:         val('si-cat'),
      img:         val('si-img'),
      rating:      formData.rating,
      reviews:     _editingId ? _existingReviews(id, 'courses') : 0,
      price:       formData.price,
      orig:        formData.orig,
      badge:       formData.badge,
      bc:          formData.bc,
      level:       val('si-level'),
      dur:         val('si-dur'),
      lessons:     parseInt(val('si-lessons')) || 0,
    };
  }

  function _buildBookItem(formData, id) {
    return {
      id, type: 'book',
      title:   formData.title,
      author:  val('si-author'),
      cat:     val('si-cat'),
      cover:   val('si-cover'),
      pages:   parseInt(val('si-pages')) || 0,
      desc:    val('si-desc'),
      color:   val('si-color') || '#7C6FFF',
      rating:  formData.rating,
      reviews: _editingId ? _existingReviews(id, 'books') : 0,
      price:   formData.price,
      orig:    formData.orig,
      badge:   formData.badge,
      bc:      formData.bc,
    };
  }

  function _buildVideoItem(formData, id) {
    const tagsRaw = val('si-tags');
    return {
      id, type: 'video',
      title:      formData.title,
      instructor: val('si-instructor'),
      cat:        val('si-cat'),
      thumb:      val('si-thumb'),
      yt:         val('si-yt'),
      dur:        val('si-dur'),
      views:      val('si-views') || '0',
      rating:     formData.rating,
      reviews:    _editingId ? _existingReviews(id, 'videos') : 0,
      price:      formData.price,
      orig:       formData.orig,
      badge:      formData.badge,
      bc:         formData.bc,
      tags:       tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
  }

  function _validateCommon(title) {
    let valid = true;
    if (!title) { _setFieldError('si-title', 'Title is required'); valid = false; }
    return valid;
  }

  function _validateCourse() {
    let valid = true;
    if (!val('si-instructor')) { _setFieldError('si-instructor', 'Required'); valid = false; }
    if (!val('si-cat'))        { _setFieldError('si-cat',        'Required'); valid = false; }
    if (!val('si-img'))        { _setFieldError('si-img',        'Required'); valid = false; }
    return valid;
  }

  function _validateBook() {
    let valid = true;
    if (!val('si-author')) { _setFieldError('si-author', 'Required'); valid = false; }
    if (!val('si-cat'))    { _setFieldError('si-cat',    'Required'); valid = false; }
    if (!val('si-cover'))  { _setFieldError('si-cover',  'Required'); valid = false; }
    return valid;
  }

  function _validateVideo() {
    let valid = true;
    if (!val('si-instructor')) { _setFieldError('si-instructor', 'Required'); valid = false; }
    if (!val('si-cat'))        { _setFieldError('si-cat',        'Required'); valid = false; }
    if (!val('si-thumb'))      { _setFieldError('si-thumb',      'Required'); valid = false; }
    if (!val('si-yt'))         { _setFieldError('si-yt',         'YouTube ID required'); valid = false; }
    return valid;
  }

  function _notifyUpdate(title, isEdit) {
    if (typeof renderAll  === 'function') renderAll();
    if (typeof toast      === 'function') toast(isEdit ? `"${title}" updated! ✏️` : `"${title}" added! 🎉`, '✅');
    if (typeof LFAuth     !== 'undefined') LFAuth.renderAdminTab('store');
  }

  // ── Public API
  window.SAM = {

    // ── Add / Edit item modal ─
    openAdd() {
      _editingId   = null;
      _editingType = null;
      document.getElementById('si-editing-id').value   = '';
      document.getElementById('si-editing-type').value = '';
      document.getElementById('si-type-tabs').style.display = 'flex';
      document.getElementById('si-modal-title').textContent = '➕ Add Store Item';
      document.getElementById('si-modal-sub').textContent   = 'Choose a type and fill in the details';
      document.getElementById('si-submit').textContent      = 'Add Item →';
      _clearErrors();
      this.setType('course', document.querySelector('.si-type-btn[data-type="course"]'));
      _openOverlay();
    },

    openEdit(id, type) {
      const store = getStore();
      const item  = store[type + 's'].find(x => x.id === id);
      if (!item) return;

      _editingId   = id;
      _editingType = type;
      document.getElementById('si-editing-id').value   = id;
      document.getElementById('si-editing-type').value = type;
      document.getElementById('si-type-tabs').style.display = 'none';
      document.getElementById('si-modal-title').textContent = `✏️ Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      document.getElementById('si-modal-sub').textContent   = item.title;
      document.getElementById('si-submit').textContent      = 'Save Changes →';
      document.getElementById('si-fields').innerHTML        = _fieldsForType(type, item);
      _clearErrors();
      _currentType = type;
      _openOverlay();
    },

    setType(type, btn) {
      _currentType = type;
      document.querySelectorAll('.si-type-btn').forEach(b => b.classList.remove('active'));
      btn?.classList.add('active');
      document.getElementById('si-fields').innerHTML = _fieldsForType(type);
    },

    submit(e) {
      e.preventDefault();
      _clearErrors();

      const type  = _editingId ? _editingType : _currentType;
      const id    = _editingId || uid(type[0]);
      const title = val('si-title');

      let valid = _validateCommon(title);
      if (type === 'course') valid = _validateCourse() && valid;
      else if (type === 'book')  valid = _validateBook()   && valid;
      else                       valid = _validateVideo()   && valid;
      if (!valid) return;

      const formData = {
        title,
        price:  parseFloat(val('si-price'))  || 0,
        orig:   parseFloat(val('si-orig'))   || 0,
        badge:  val('si-badge'),
        bc:     val('si-bc'),
        rating: parseFloat(val('si-rating')) || 4.8,
      };

      const item =
        type === 'course' ? _buildCourseItem(formData, id) :
        type === 'book'   ? _buildBookItem(formData, id)   :
                            _buildVideoItem(formData, id);

      const store  = getStore();
      const arrKey = type + 's';
      if (_editingId) {
        const idx = store[arrKey].findIndex(x => x.id === _editingId);
        if (idx > -1) store[arrKey][idx] = item;
        else          store[arrKey].push(item);
      } else {
        store[arrKey].push(item);
      }
      saveStore(store);
      this.refreshCounts();
      _notifyUpdate(title, !!_editingId);
      this.close();
    },

    deleteItem(id, type) {
      const store = getStore();
      const item  = store[type + 's'].find(x => x.id === id);
      if (!item) return;
      if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;

      store[type + 's'] = store[type + 's'].filter(x => x.id !== id);
      saveStore(store);

      const assignments = getAssignments();
      Object.keys(assignments).forEach(u => {
        assignments[u] = assignments[u].filter(x => x !== id);
      });
      saveAssignments(assignments);

      this.refreshCounts();
      if (typeof renderAll === 'function') renderAll();
      if (typeof toast     === 'function') toast(`"${item.title}" deleted`, '🗑️');
      if (typeof LFAuth    !== 'undefined') LFAuth.renderAdminTab('store');
    },

    close() {
      _closeOverlay();
    },

    closeOnOverlay(e) {
      if (e.target.id === 'si-overlay') this.close();
    },

    // ── Assign item to students modal 
    openAssignModal(itemId, type) {
      const store = getStore();
      const item  = store[type + 's'].find(x => x.id === itemId);
      if (!item) return;

      _assignItemId   = itemId;
      _assignItemType = type;

      document.getElementById('assign-item-name').textContent = item.title;
      document.getElementById('assign-item-body').innerHTML = this._renderAssignUsers(itemId);
      document.getElementById('assign-item-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    _renderAssignUsers(itemId) {
      const users       = getUsers();
      const assignments = getAssignments();

      if (!users.length) {
        return `
          <div style="text-align:center;padding:2.5rem 1rem;color:var(--txt2)">
            <div style="font-size:2.5rem;margin-bottom:.875rem">👥</div>
            <p style="font-weight:700;margin-bottom:.35rem">No students yet</p>
            <p style="font-size:.82rem">Add students first via the Students tab</p>
          </div>`;
      }

      return users.map((u, i) => {
        const assigned = (assignments[u.username] || []).includes(itemId);
        return `
          <div class="assign-user-card${assigned ? ' on' : ''}" id="auc-${u.username}"
            onclick="SAM.toggleAssignUser('${u.username}','${itemId}',this)">
            ${_renderUserAvatar(u, i)}
            <div style="flex:1;min-width:0">
              <div style="font-weight:700;font-size:.875rem;margin-bottom:.1rem">${u.firstName || ''} ${u.lastName || ''}</div>
              <div style="font-size:.72rem;color:var(--txt2)">@${u.username} · <span style="text-transform:capitalize">${u.plan || 'free'}</span> plan</div>
            </div>
            <div class="assign-chk${assigned ? ' on' : ''}" id="auchk-${u.username}">${assigned ? '✓' : ''}</div>
          </div>`;
      }).join('');
    },

    toggleAssignUser(username, itemId, row) {
      const assignments = getAssignments();
      if (!assignments[username]) assignments[username] = [];
      const chk      = document.getElementById(`auchk-${username}`);
      const isNowOn  = !assignments[username].includes(itemId);

      if (isNowOn) {
        assignments[username].push(itemId);
        row.classList.add('on');
        if (chk) { chk.classList.add('on'); chk.textContent = '✓'; }
        if (typeof toast === 'function') toast('Item assigned to student! ✓', '✅');
      } else {
        assignments[username] = assignments[username].filter(x => x !== itemId);
        row.classList.remove('on');
        if (chk) { chk.classList.remove('on'); chk.textContent = ''; }
        if (typeof toast === 'function') toast('Item removed from student', '🗑️');
      }
      saveAssignments(assignments);
    },

    closeAssignModal(e) {
      if (e && e.target.id !== 'assign-item-overlay') return;
      this.closeAssignDirect();
    },

    closeAssignDirect() {
      document.getElementById('assign-item-overlay').classList.remove('open');
      _restoreScroll();
      _assignItemId   = null;
      _assignItemType = null;
    },

    // ── Store tab for admin dashboard 
    renderStoreTab(content) {
      const store         = getStore();
      const all           = [...store.courses, ...store.books, ...store.videos];
      const assignments   = getAssignments();
      const totalAssigned = new Set(Object.values(assignments).flat()).size;
      _storeCache         = store;

      content.innerHTML = `
        <div class="adm-stats">
          <div class="adm-stat-card"><div class="adm-stat-num">${store.courses.length}</div><div class="adm-stat-label">Courses</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${store.books.length}</div><div class="adm-stat-label">Books</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${store.videos.length}</div><div class="adm-stat-label">Videos</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${totalAssigned}</div><div class="adm-stat-label">Assigned Items</div></div>
        </div>
        <div class="store-sub-tabs">
          <button class="store-sub-tab active" data-sk="all"     onclick="SAM.switchStoreTab('all',this)">All (${all.length})</button>
          <button class="store-sub-tab"        data-sk="courses" onclick="SAM.switchStoreTab('courses',this)">📚 Courses (${store.courses.length})</button>
          <button class="store-sub-tab"        data-sk="books"   onclick="SAM.switchStoreTab('books',this)">📖 Books (${store.books.length})</button>
          <button class="store-sub-tab"        data-sk="videos"  onclick="SAM.switchStoreTab('videos',this)">🎬 Videos (${store.videos.length})</button>
        </div>
        <div id="store-admin-list">${this.renderStoreList(all)}</div>`;
    },

    renderStoreList(items) {
      if (!items.length) {
        return `
          <div style="text-align:center;padding:3.5rem 1rem;color:var(--txt2)">
            <div style="font-size:2.5rem;margin-bottom:.875rem">📭</div>
            <p style="font-weight:700;margin-bottom:.35rem">No items yet</p>
            <p style="font-size:.82rem">Click "Add Item" to create the first store item</p>
          </div>`;
      }

      const assignments = getAssignments();
      return items.map(item => {
        const thumb         = item.img || item.cover || item.thumb || '';
        const by            = item.instructor || item.author || '';
        const assignedCount = Object.values(assignments).filter(arr => arr.includes(item.id)).length;
        const assignedBadge = assignedCount > 0
          ? `<span style="font-size:.65rem;background:rgba(56,232,181,.1);color:#38E8B5;border:1px solid rgba(56,232,181,.2);padding:.15rem .45rem;border-radius:.35rem">🎁 ${assignedCount} student${assignedCount !== 1 ? 's' : ''}</span>`
          : '';

        return `
          <div class="store-admin-item" data-store-search="${esc((item.title + ' ' + by + ' ' + item.cat).toLowerCase())}">
            <img class="store-admin-thumb" src="${esc(thumb)}" alt=""
              onerror="this.style.background='rgba(124,111,255,.15)';this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 1 1\\"/>'">
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.2rem;flex-wrap:wrap">
                <span class="store-type-badge type-${item.type}">${item.type}</span>
                ${assignedBadge}
              </div>
              <div style="font-weight:700;font-size:.875rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:.15rem">${esc(item.title)}</div>
              <div style="font-size:.72rem;color:var(--txt2)">${esc(by)} · ${esc(item.cat)}</div>
            </div>
            <div style="text-align:right;margin-right:.25rem;flex-shrink:0">
              <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:var(--accent,#7C6FFF)">$${item.price}</div>
              <div style="font-size:.68rem;text-decoration:line-through;color:var(--txt2)">$${item.orig}</div>
            </div>
            <div style="display:flex;gap:.375rem;flex-shrink:0;flex-wrap:wrap">
              <button class="row-btn row-btn-assign" onclick="SAM.openAssignModal('${item.id}','${item.type}')">🎁 Assign</button>
              <button class="row-btn row-btn-edit"   onclick="SAM.openEdit('${item.id}','${item.type}')">✏️ Edit</button>
              <button class="row-btn row-btn-del"    onclick="SAM.deleteItem('${item.id}','${item.type}')">🗑</button>
            </div>
          </div>`;
      }).join('');
    },

    switchStoreTab(key, btn) {
      document.querySelectorAll('.store-sub-tab').forEach(b => b.classList.remove('active'));
      btn?.classList.add('active');
      const store = _storeCache || getStore();
      const items = key === 'all'
        ? [...store.courses, ...store.books, ...store.videos]
        : (store[key] || []);
      const list = document.getElementById('store-admin-list');
      if (list) list.innerHTML = this.renderStoreList(items);
    },

    filterStoreItems(query) {
      const q = query.toLowerCase().trim();
      document.querySelectorAll('.store-admin-item').forEach(row => {
        row.style.display = (!q || row.dataset.storeSearch.includes(q)) ? '' : 'none';
      });
    },

    refreshCounts() {
      const store = getStore();
      const pillIds = { 'course-count-pill': store.courses, 'book-count-pill': store.books, 'video-count-pill': store.videos };
      Object.entries(pillIds).forEach(([id, arr]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = `(${arr.length})`;
      });
    },
  };

  // ── Init 
  function init() {
    saveStore(getStore()); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();