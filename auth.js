//  Auth System
(function () {
  'use strict';

  const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };
  const STORAGE_KEY   = 'lf_users_v1';
  const SESSION_KEY   = 'lf_session_v1';
  const ASSIGN_KEY    = 'lf_assignments_v1';

  function getUsers()           { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  function saveUsers(u)         { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }
  function getSession()         { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  function setSession(u)        { sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
  function clearSession()       { sessionStorage.removeItem(SESSION_KEY); }
  function getAssignments()     { return JSON.parse(localStorage.getItem(ASSIGN_KEY) || '{}'); }
  function saveAssignments(a)   { localStorage.setItem(ASSIGN_KEY, JSON.stringify(a)); }

  // Inject HTML for modals and user chip into the page
  const html = `
<!-- AUTH MODAL -->
<div id="auth-overlay" onclick="LFAuth.closeOnOverlay(event)">
  <div id="auth-box">
    <button id="auth-close" onclick="LFAuth.close()" aria-label="Close">✕</button>
    <div id="auth-tabs">
      <button class="auth-tab active" data-tab="login" onclick="LFAuth.switchTab('login',this)">Sign In</button>
      <button class="auth-tab" data-tab="register" onclick="LFAuth.switchTab('register',this)">Register</button>
    </div>

    <!-- LOGIN PANEL -->
    <div id="auth-panel-login" class="auth-panel active">
      <div class="auth-hero">
        <div class="auth-logo-ring">
          <img src="https://i.pinimg.com/736x/13/2e/9e/132e9e91c10f478b139c769b50527ddc.jpg" alt="Logo" class="auth-logo">
        </div>
        <h2 class="auth-title">ចុចចូលលឿនមោតិចម៉ាស្បែកជើង🩴</h2>
        <p class="auth-sub">លឿនមោកុំនៅយូពេក</p>
      </div>
      <div class="role-selector">
        <button class="role-btn active" data-role="user" onclick="LFAuth.setRole('login','user',this)">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6sUzIlmF5PBFEBnLIJwoSWjlmKg-ZlexNA&s" alt="Student" class="role-icon-img">Student
        </button>
        <button class="role-btn" data-role="admin" onclick="LFAuth.setRole('login','admin',this)">
          <img src="https://imagenes.expreso.ec/files/image_414_276/uploads/2025/07/24/68824497d3f6f.png" alt="Admin" class="role-icon-img">Admin
        </button>
      </div>
      <form id="login-form" onsubmit="LFAuth.submitLogin(event)" novalidate autocomplete="off">
        <div class="field-group">
          <label class="field-label" for="li-username">Username or Email</label>
          <div class="field-wrap"><span class="field-icon">👤</span><input id="li-username" class="field-input" type="text" placeholder="your username or email" autocomplete="username"/></div>
          <span class="field-err" id="li-username-err"></span>
        </div>
        <div class="field-group">
          <label class="field-label" for="li-password">Password</label>
          <div class="field-wrap"><span class="field-icon">🔒</span><input id="li-password" class="field-input" type="password" placeholder="••••••••" autocomplete="current-password"/><button type="button" class="eye-btn" onclick="LFAuth.toggleEye('li-password',this)">👁</button></div>
          <span class="field-err" id="li-password-err"></span>
        </div>
        <div class="field-row">
          <label class="check-label"><input type="checkbox" id="li-remember" class="check-input"/> Remember me</label>
          <button type="button" class="forgot-btn" onclick="LFAuth.showForgot()">Forgot password?</button>
        </div>
        <button type="submit" class="auth-submit btn btn-p">Sign In →</button>
        <div id="login-err" class="global-err"></div>
      </form>
      <p class="auth-switch-text">No account? <button onclick="LFAuth.switchTab('register')">Register free →</button></p>
    </div>

    <!-- REGISTER PANEL -->
    <div id="auth-panel-register" class="auth-panel">
      <div class="auth-hero">
        <div class="auth-logo-ring">
          <img src="https://i.pinimg.com/736x/7e/e3/e8/7ee3e8a68100d7b99ab75891d047d6b6.jpg" alt="Logo" class="auth-logo">
        </div>
        <h2 class="auth-title">ចុះឈ្មោះរៀនHaCK</h2>
        <p class="auth-sub">ចាប់ផ្តើមការសិក្សារបស់អ្នកថ្ងៃនេះ</p>
      </div>
      <form id="register-form" onsubmit="LFAuth.submitRegister(event)" novalidate autocomplete="off">
        <div class="field-row-2">
          <div class="field-group"><label class="field-label" for="re-fname">First Name</label><div class="field-wrap"><input id="re-fname" class="field-input" type="text" placeholder="Alex"/></div><span class="field-err" id="re-fname-err"></span></div>
          <div class="field-group"><label class="field-label" for="re-lname">Last Name</label><div class="field-wrap"><input id="re-lname" class="field-input" type="text" placeholder="Smith"/></div></div>
        </div>
        <div class="field-group"><label class="field-label" for="re-username">Username</label><div class="field-wrap"><span class="field-icon">@</span><input id="re-username" class="field-input" type="text" placeholder="alexsmith" autocomplete="username"/></div><span class="field-err" id="re-username-err"></span></div>
        <div class="field-group"><label class="field-label" for="re-email">Email Address</label><div class="field-wrap"><span class="field-icon">✉</span><input id="re-email" class="field-input" type="email" placeholder="alex@email.com"/></div><span class="field-err" id="re-email-err"></span></div>
        <div class="field-group">
          <label class="field-label" for="re-password">Password</label>
          <div class="field-wrap"><span class="field-icon">🔒</span><input id="re-password" class="field-input" type="password" placeholder="8+ characters" autocomplete="new-password" oninput="LFAuth.checkStrength(this.value)"/><button type="button" class="eye-btn" onclick="LFAuth.toggleEye('re-password',this)">👁</button></div>
          <div id="strength-bar" class="strength-bar"><div id="strength-fill"></div></div>
          <span id="strength-label" class="strength-label"></span>
          <span class="field-err" id="re-password-err"></span>
        </div>
        <div class="field-group"><label class="field-label" for="re-confirm">Confirm Password</label><div class="field-wrap"><span class="field-icon">🔒</span><input id="re-confirm" class="field-input" type="password" placeholder="repeat password"/></div><span class="field-err" id="re-confirm-err"></span></div>
        <label class="check-label" style="margin-bottom:1rem"><input type="checkbox" id="re-terms" class="check-input"/>I agree to the <a href="#" style="color:var(--accent)">Terms</a> &amp; <a href="#" style="color:var(--accent)">Privacy Policy</a></label>
        <button type="submit" class="auth-submit btn btn-p">Create Account →</button>
        <div id="register-err" class="global-err"></div>
      </form>
      <p class="auth-switch-text">Already have an account? <button onclick="LFAuth.switchTab('login')">Sign in →</button></p>
    </div>

    <!-- FORGOT PANEL -->
    <div id="auth-panel-forgot" class="auth-panel">
      <div class="auth-hero">
        <div class="auth-icon-ring">🔑</div>
        <h2 class="auth-title">Reset Password</h2>
        <p class="auth-sub">We'll send a reset link to your email</p>
      </div>
      <form id="forgot-form" onsubmit="LFAuth.submitForgot(event)" novalidate>
        <div class="field-group"><label class="field-label" for="fg-email">Email Address</label><div class="field-wrap"><span class="field-icon">✉</span><input id="fg-email" class="field-input" type="email" placeholder="alex@email.com"/></div><span class="field-err" id="fg-email-err"></span></div>
        <button type="submit" class="auth-submit btn btn-p">Send Reset Link →</button>
      </form>
      <p class="auth-switch-text"><button onclick="LFAuth.switchTab('login')">← Back to Sign In</button></p>
    </div>
  </div>
</div>

<!-- USER CHIP (injected into navbar by JS) -->
<div id="auth-user-chip" style="display:none;align-items:center;gap:.5rem;cursor:pointer;position:relative" onclick="LFAuth.toggleUserMenu()">
  <div id="auth-avatar" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:#fff;background:linear-gradient(135deg,#7C6FFF,#FF6B8A);border:2px solid rgba(124,111,255,.4);flex-shrink:0"></div>
  <div id="auth-chip-name" style="font-size:.82rem;font-weight:600;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></div>
  <span id="auth-chip-badge" style="font-size:.6rem;font-weight:800;padding:.15rem .4rem;border-radius:.3rem;letter-spacing:.05em;text-transform:uppercase;background:rgba(255,107,138,.15);color:#FF6B8A;display:none"></span>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--txt2)"><polyline points="6 9 12 15 18 9"/></svg>
  <!-- User dropdown menu -->
  <div id="auth-user-menu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;min-width:210px;background:var(--bg2);border:1px solid var(--border2);border-radius:1rem;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.35);z-index:500">
    <div id="auth-menu-header" style="padding:1rem;border-bottom:1px solid var(--border);background:linear-gradient(135deg,rgba(124,111,255,.08),transparent)">
      <div id="auth-menu-name" style="font-weight:700;font-size:.9rem;margin-bottom:.15rem"></div>
      <div id="auth-menu-email" style="font-size:.72rem;color:var(--txt2)"></div>
      <div id="auth-menu-role-badge" style="margin-top:.375rem;display:inline-block;font-size:.6rem;font-weight:800;padding:.15rem .5rem;border-radius:.3rem;text-transform:uppercase;letter-spacing:.06em"></div>
    </div>
    <div id="auth-menu-admin-link" style="display:none">
      <a onclick="LFAuth.goAdmin()" style="display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;font-size:.82rem;font-weight:600;color:var(--txt2);cursor:pointer;border-bottom:1px solid var(--border);transition:background .2s" onmouseover="this.style.background='rgba(124,111,255,.08)'" onmouseout="this.style.background=''">🛡️ Admin Dashboard</a>
    </div>
    <a onclick="LFAuth.goProfile()" style="display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;font-size:.82rem;color:var(--txt2);cursor:pointer;border-bottom:1px solid var(--border);transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background=''">👤 My Profile</a>
    <a onclick="" style="display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;font-size:.82rem;color:var(--txt2);cursor:pointer;border-bottom:1px solid var(--border);transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background=''">📚 My Courses</a>
    <a onclick="LFAuth.logout()" style="display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;font-size:.82rem;color:#FF6B8A;cursor:pointer;font-weight:600;transition:background .2s" onmouseover="this.style.background='rgba(255,107,138,.08)'" onmouseout="this.style.background=''">🚪 Sign Out</a>
  </div>
</div>

<!-- ADMIN DASHBOARD — full sidebar redesign -->
<div id="admin-overlay" onclick="LFAuth.closeAdmin(event)">
  <div id="admin-box">

    <!-- Sidebar -->
    <div id="admin-sidebar">
      <div id="admin-sidebar-header">
        <div id="admin-sidebar-avatar">AD</div>
        <div>
          <div style="font-weight:700;font-size:.85rem">Admin</div>
          <div style="font-size:.7rem;color:var(--txt2)">Administrator</div>
        </div>
        <button onclick="LFAuth.closeAdminDirect()" id="admin-close-btn" title="Close">✕</button>
      </div>

      <nav id="admin-nav">
        <button class="adm-nav-item active" data-admintab="students" onclick="LFAuth.switchAdminTab('students',this)">
          <span class="adm-nav-icon">👥</span><span>Students</span>
          <span class="adm-nav-badge" id="badge-students">0</span>
        </button>
        <button class="adm-nav-item" data-admintab="store" onclick="LFAuth.switchAdminTab('store',this)">
          <span class="adm-nav-icon">🛍️</span><span>Store</span>
        </button>
        <button class="adm-nav-item" data-admintab="assign" onclick="LFAuth.switchAdminTab('assign',this)">
          <span class="adm-nav-icon">🎁</span><span>Assign Items</span>
        </button>
        <button class="adm-nav-item" data-admintab="stats" onclick="LFAuth.switchAdminTab('stats',this)">
          <span class="adm-nav-icon">📊</span><span>Analytics</span>
        </button>
        <button class="adm-nav-item" data-admintab="system" onclick="LFAuth.switchAdminTab('system',this)">
          <span class="adm-nav-icon">⚙️</span><span>System</span>
        </button>
      </nav>

      <div id="admin-sidebar-footer">
        <button class="adm-nav-item" style="color:#FF6B8A" onclick="LFAuth.logout();LFAuth.closeAdminDirect()">
          <span class="adm-nav-icon">🚪</span><span>Sign Out</span>
        </button>
      </div>
    </div>

    <!-- Main panel -->
    <div id="admin-main">
      <!-- Top bar -->
      <div id="admin-topbar">
        <div id="admin-topbar-title">Students</div>
        <div style="display:flex;gap:.5rem;align-items:center" id="admin-topbar-actions">
          <div class="adm-search-wrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--txt2);flex-shrink:0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input id="admin-main-search" type="text" placeholder="Search…" oninput="LFAuth.handleMainSearch(this.value)"/>
          </div>
          <button id="admin-primary-btn" class="btn btn-p btn-sm">➕ Add Student</button>
        </div>
      </div>
      <!-- Content -->
      <div id="admin-content"></div>
    </div>
  </div>
</div>

<!-- ADD / EDIT STUDENT MODAL -->
<div id="add-student-overlay" onclick="LFAuth.closeAddStudent(event)" style="position:fixed;inset:0;z-index:900;background:rgba(0,0,0,.8);backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;display:flex;align-items:center;justify-content:center;padding:1rem">
  <div id="add-student-box" style="width:100%;max-width:480px;background:var(--bg3);border:1px solid rgba(124,111,255,.3);border-radius:1.5rem;padding:2rem;box-shadow:0 30px 80px rgba(0,0,0,.5);transform:scale(.95);transition:transform .3s,opacity .3s;opacity:0">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <div><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem" id="add-student-title">➕ Add New Student</div><div style="font-size:.75rem;color:var(--txt2);margin-top:.2rem">Fill in the student details below</div></div>
      <button onclick="LFAuth.closeAddStudentDirect()" style="background:rgba(255,255,255,.07);border:none;color:var(--txt);border-radius:.625rem;padding:.4rem .75rem;font-size:.82rem;font-weight:600;cursor:pointer">✕</button>
    </div>
    <form id="add-student-form" onsubmit="LFAuth.submitAddStudent(event)" novalidate autocomplete="off">
      <input type="hidden" id="edit-username-original"/>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
        <div class="field-group" style="margin-bottom:0"><label class="field-label" for="as-fname">First Name *</label><div class="field-wrap"><input id="as-fname" class="field-input" type="text" placeholder="Alex"/></div><span class="field-err" id="as-fname-err"></span></div>
        <div class="field-group" style="margin-bottom:0"><label class="field-label" for="as-lname">Last Name</label><div class="field-wrap"><input id="as-lname" class="field-input" type="text" placeholder="Smith"/></div></div>
      </div>
      <div class="field-group"><label class="field-label" for="as-username">Username *</label><div class="field-wrap"><span class="field-icon">@</span><input id="as-username" class="field-input" type="text" placeholder="alexsmith"/></div><span class="field-err" id="as-username-err"></span></div>
      <div class="field-group"><label class="field-label" for="as-email">Email *</label><div class="field-wrap"><span class="field-icon">✉</span><input id="as-email" class="field-input" type="email" placeholder="alex@email.com"/></div><span class="field-err" id="as-email-err"></span></div>
      <div class="field-group" id="as-password-group"><label class="field-label" for="as-password" id="as-password-label">Password *</label><div class="field-wrap"><span class="field-icon">🔒</span><input id="as-password" class="field-input" type="password" placeholder="min 8 characters"/><button type="button" class="eye-btn" onclick="LFAuth.toggleEye('as-password',this)">👁</button></div><span class="field-err" id="as-password-err"></span></div>
      <div class="field-group"><label class="field-label" for="as-plan">Plan</label><div class="field-wrap"><select id="as-plan" class="field-input" style="cursor:pointer"><option value="free">Free</option><option value="pro">Pro</option><option value="premium">Premium</option></select></div></div>
      <div style="display:flex;gap:.75rem;margin-top:1.25rem">
        <button type="button" class="btn btn-s" style="flex:1;justify-content:center" onclick="LFAuth.closeAddStudentDirect()">Cancel</button>
        <button type="submit" id="add-student-submit" class="btn btn-p" style="flex:1;justify-content:center">Add Student →</button>
      </div>
    </form>
  </div>
</div>

<!-- GUEST BLOCK MODAL -->
<div id="guest-block-overlay" onclick="LFAuth.closeGuestBlock(event)" style="position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.85);backdrop-filter:blur(16px);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;display:flex;align-items:center;justify-content:center;padding:1rem">
  <div style="width:100%;max-width:400px;background:var(--bg3);border:1px solid rgba(124,111,255,.3);border-radius:1.75rem;padding:2.5rem 2rem;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5)">
    <div style="font-size:3rem;margin-bottom:1rem" id="guest-block-icon">🔒</div>
    <h3 style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.25rem;margin-bottom:.625rem" id="guest-block-title">Login Required</h3>
    <p style="font-size:.85rem;color:var(--txt2);line-height:1.65;margin-bottom:1.75rem" id="guest-block-msg">You need an account to add items to your cart and access courses.</p>
    <div style="display:flex;gap:.75rem">
      <button class="btn btn-s" style="flex:1;justify-content:center" onclick="LFAuth.closeGuestBlockDirect()">Maybe Later</button>
      <button class="btn btn-p" style="flex:1;justify-content:center" onclick="LFAuth.closeGuestBlockDirect();LFAuth.open('login')">Sign In →</button>
    </div>
    <p style="font-size:.75rem;color:var(--txt2);margin-top:.875rem">No account? <button onclick="LFAuth.closeGuestBlockDirect();LFAuth.open('register')" style="background:none;border:none;color:var(--accent);font-size:.75rem;font-weight:700;cursor:pointer">Register free →</button></p>
  </div>
</div>
`;

  document.body.insertAdjacentHTML('beforeend', html);

  //  Extra styles for admin sidebar layout 
  const adminStyle = document.createElement('style');
  adminStyle.textContent = `
    #add-student-overlay.open { opacity:1!important; visibility:visible!important; }
    #add-student-overlay.open #add-student-box { transform:scale(1)!important; opacity:1!important; }

    /* ── Admin overlay & box ── */
    #admin-overlay {
      position:fixed;inset:0;z-index:800;
      background:rgba(0,0,0,.75);backdrop-filter:blur(14px);
      opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;
      display:flex;align-items:center;justify-content:center;padding:1rem;
    }
    #admin-overlay.open { opacity:1;visibility:visible; }
    #admin-box {
      width:100%;max-width:960px;height:88vh;max-height:700px;
      display:flex;overflow:hidden;
      background:var(--bg2);border:1px solid rgba(124,111,255,.2);
      border-radius:1.5rem;box-shadow:0 30px 80px rgba(0,0,0,.5);
    }

    /* ── Sidebar ── */
    #admin-sidebar {
      width:210px;flex-shrink:0;
      background:var(--bg3);border-right:1px solid var(--border);
      display:flex;flex-direction:column;
    }
    #admin-sidebar-header {
      display:flex;align-items:center;gap:.625rem;
      padding:1.1rem 1rem;border-bottom:1px solid var(--border);
    }
    #admin-sidebar-avatar {
      width:36px;height:36px;border-radius:50%;
      background:linear-gradient(135deg,#7C6FFF,#FF6B8A);
      color:#fff;font-size:.8rem;font-weight:700;
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    #admin-close-btn {
      margin-left:auto;background:rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.1);color:var(--txt2);
      border-radius:.5rem;width:26px;height:26px;
      font-size:.72rem;cursor:pointer;display:flex;
      align-items:center;justify-content:center;transition:all .2s;
    }
    #admin-close-btn:hover { background:rgba(255,107,138,.15);color:#FF6B8A;border-color:rgba(255,107,138,.3); }
    #admin-nav { flex:1;padding:.5rem;overflow-y:auto; }
    #admin-sidebar-footer { padding:.5rem;border-top:1px solid var(--border); }

    .adm-nav-item {
      display:flex;align-items:center;gap:.625rem;
      width:100%;padding:.625rem .75rem;border-radius:.75rem;
      border:none;background:transparent;
      color:var(--txt2);font-size:.82rem;font-weight:500;
      font-family:'DM Sans',sans-serif;cursor:pointer;
      text-align:left;transition:all .2s;position:relative;
      margin-bottom:.2rem;
    }
    .adm-nav-item:hover:not(.active) { background:rgba(255,255,255,.04);color:var(--txt); }
    .adm-nav-item.active {
      background:rgba(124,111,255,.15);color:var(--accent);font-weight:700;
      border:1px solid rgba(124,111,255,.2);
    }
    .adm-nav-icon { font-size:1rem;width:20px;text-align:center;flex-shrink:0; }
    .adm-nav-badge {
      margin-left:auto;font-size:.65rem;font-weight:800;
      padding:.15rem .5rem;border-radius:99px;
      background:rgba(124,111,255,.2);color:var(--accent);
    }

    /* ── Main panel ── */
    #admin-main { flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden; }
    #admin-topbar {
      display:flex;align-items:center;gap:.875rem;
      padding:.875rem 1.25rem;border-bottom:1px solid var(--border);
      background:var(--bg2);flex-shrink:0;
    }
    #admin-topbar-title {
      font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;flex:1;
    }
    .adm-search-wrap {
      display:flex;align-items:center;gap:.5rem;
      background:rgba(255,255,255,.04);border:1px solid var(--border);
      border-radius:.75rem;padding:.45rem .75rem;
    }
    .adm-search-wrap input {
      background:transparent;border:none;outline:none;
      font-size:.82rem;color:var(--txt);font-family:'DM Sans',sans-serif;
      width:150px;
    }
    #admin-content { flex:1;overflow-y:auto;padding:1.25rem; }

    /* ── Stat cards ── */
    .adm-stats {
      display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
      gap:.875rem;margin-bottom:1.5rem;
    }
    .adm-stat-card {
      background:var(--bgcard);border:1px solid var(--border);
      border-radius:1rem;padding:1rem;text-align:center;transition:border-color .2s;
    }
    .adm-stat-card:hover { border-color:rgba(124,111,255,.3); }
    .adm-stat-num {
      font-family:'Syne',sans-serif;font-weight:800;font-size:1.8rem;
      background:linear-gradient(135deg,#7C6FFF,#38E8B5);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      line-height:1;margin-bottom:.3rem;
    }
    .adm-stat-label { font-size:.7rem;color:var(--txt2);font-weight:600;letter-spacing:.05em; }

    /* ── Student rows ── */
    .student-row {
      display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:.75rem;padding:.875rem 1rem;
      background:rgba(255,255,255,.02);border:1px solid var(--border);
      border-radius:.875rem;margin-bottom:.625rem;transition:border-color .2s,background .2s;
    }
    .student-row:hover { border-color:rgba(124,111,255,.25);background:rgba(124,111,255,.04); }

    /* ── Store item rows ── */
    .store-item-row {
      display:flex;align-items:center;gap:.875rem;padding:.875rem 1rem;
      background:rgba(255,255,255,.02);border:1px solid var(--border);
      border-radius:.875rem;margin-bottom:.625rem;transition:border-color .2s,background .2s;
    }
    .store-item-row:hover { border-color:rgba(124,111,255,.25);background:rgba(124,111,255,.04); }
    .store-item-thumb {
      width:48px;height:48px;border-radius:.625rem;object-fit:cover;
      background:rgba(255,255,255,.05);flex-shrink:0;
    }

    /* ── Assign rows ── */
    .assign-user-row {
      display:flex;align-items:center;gap:.875rem;padding:.875rem 1rem;
      background:rgba(255,255,255,.02);border:1px solid var(--border);
      border-radius:.875rem;margin-bottom:.625rem;
      cursor:pointer;transition:all .2s;
    }
    .assign-user-row:hover { border-color:rgba(124,111,255,.25);background:rgba(124,111,255,.04); }
    .assign-user-row.assigned { border-color:rgba(56,232,181,.4);background:rgba(56,232,181,.04); }
    .assign-check {
      width:22px;height:22px;border-radius:50%;
      border:2px solid rgba(255,255,255,.2);
      display:flex;align-items:center;justify-content:center;
      font-size:.72rem;transition:all .2s;flex-shrink:0;
    }
    .assign-check.on { background:#38E8B5;border-color:#38E8B5;color:#001a10; }

    /* ── Plan badges ── */
    .plan-free    { background:rgba(122,122,157,.12);color:#7A7A9D; }
    .plan-pro     { background:rgba(124,111,255,.15);color:#7C6FFF; }
    .plan-premium { background:rgba(56,232,181,.12);color:#38E8B5; }
    .plan-badge {
      font-size:.65rem;font-weight:800;padding:.2rem .55rem;
      border-radius:.35rem;text-transform:uppercase;letter-spacing:.05em;
    }

    /* ── Sub-tabs for store ── */
    .store-sub-tabs {
      display:flex;gap:.375rem;margin-bottom:1rem;flex-wrap:wrap;
    }
    .store-sub-tab {
      padding:.4rem 1rem;border-radius:2rem;border:1px solid var(--border);
      background:transparent;font-size:.78rem;font-weight:600;
      color:var(--txt2);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
    }
    .store-sub-tab.active {
      background:rgba(124,111,255,.15);color:var(--accent);border-color:rgba(124,111,255,.3);
    }
    .store-sub-tab:hover:not(.active) { border-color:rgba(255,255,255,.15);color:var(--txt); }

    /* ── Action buttons inside rows ── */
    .row-btn {
      padding:.28rem .65rem;border-radius:.45rem;
      font-size:.72rem;font-weight:700;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .2s;
    }
    .row-btn-edit  { background:rgba(124,111,255,.1);border:1px solid rgba(124,111,255,.2);color:var(--accent); }
    .row-btn-edit:hover  { background:rgba(124,111,255,.2); }
    .row-btn-del   { background:rgba(255,107,138,.08);border:1px solid rgba(255,107,138,.2);color:#FF6B8A; }
    .row-btn-del:hover   { background:rgba(255,107,138,.2); }
    .row-btn-assign{ background:rgba(56,232,181,.08);border:1px solid rgba(56,232,181,.2);color:#38E8B5; }
    .row-btn-assign:hover{ background:rgba(56,232,181,.18); }

    /* ── Progress bars ── */
    .adm-bar-wrap { height:6px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden;margin-top:.35rem; }
    .adm-bar-fill { height:100%;border-radius:99px;transition:width .6s ease; }

    /* ── Responsive ── */
    @media(max-width:680px){
      #admin-box { flex-direction:column;height:95vh;border-radius:1rem; }
      #admin-sidebar { width:100%;height:auto;border-right:none;border-bottom:1px solid var(--border); }
      #admin-nav { display:flex;padding:.375rem;overflow-x:auto;flex:0; }
      #admin-nav .adm-nav-item { flex-direction:column;gap:.2rem;padding:.5rem .625rem;min-width:60px;font-size:.65rem; }
      #admin-sidebar-footer { display:none; }
      .adm-nav-icon { font-size:.9rem; }
      .adm-search-wrap input { width:100px; }
    }
  `;
  document.head.appendChild(adminStyle);

  //  State 
  let _loginRole        = 'user';
  let _menuOpen         = false;
  let _editingUsername  = null;
  let _currentAdminTab  = 'students';
  let _initialized      = false;

  // PUBLIC API 
  window.LFAuth = {

    //  Auth modal 
    open(tab = 'login') {
      document.getElementById('auth-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      this.switchTab(tab);
      setTimeout(() => {
        const inp = document.getElementById(tab === 'login' ? 'li-username' : 're-fname');
        if (inp) inp.focus();
      }, 300);
    },
    close() {
      document.getElementById('auth-overlay').classList.remove('open');
      document.body.style.overflow = '';
      this.clearErrors();
    },
    closeOnOverlay(e) { if (e.target.id === 'auth-overlay') this.close(); },
    switchTab(tab, btn) {
      document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
      const panel = document.getElementById('auth-panel-' + tab);
      if (panel) panel.classList.add('active');
      if (btn) btn.classList.add('active');
      else { const b = document.querySelector(`.auth-tab[data-tab="${tab}"]`); if (b) b.classList.add('active'); }
      this.clearErrors();
    },
    setRole(form, role, btn) {
      _loginRole = role;
      document.querySelectorAll(`#auth-panel-${form} .role-btn`).forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    },
    toggleEye(inputId, btn) {
      const inp = document.getElementById(inputId);
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      btn.textContent = inp.type === 'password' ? '👁' : '🙈';
    },
    checkStrength(val) {
      const fill = document.getElementById('strength-fill');
      const label = document.getElementById('strength-label');
      if (!fill) return;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const levels = [
        { pct: '20%', color: '#FF6B8A', text: 'Weak' },
        { pct: '45%', color: '#F59E0B', text: 'Fair' },
        { pct: '70%', color: '#38E8B5', text: 'Good' },
        { pct: '100%', color: '#10B981', text: 'Strong 💪' },
      ];
      const lv = levels[Math.max(0, score - 1)] || levels[0];
      fill.style.width = val ? lv.pct : '0%';
      fill.style.background = lv.color;
      label.textContent = val ? lv.text : '';
      label.style.color = lv.color;
    },
    showForgot() { this.switchTab('forgot'); },

    //  Login 
    submitLogin(e) {
      e.preventDefault();
      this.clearErrors();
      const username = document.getElementById('li-username').value.trim();
      const password = document.getElementById('li-password').value;
      let valid = true;
      if (!username) { this.err('li-username', 'Username is required'); valid = false; }
      if (!password) { this.err('li-password', 'Password is required'); valid = false; }
      if (!valid) return;

      if (_loginRole === 'admin') {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          const adminUser = { username: 'admin', email: 'admin@learnflow.com', role: 'admin', firstName: 'Admin' };
          setSession(adminUser);
          this.close();
          this.updateNav(adminUser);
          if (typeof toast === 'function') toast('Welcome back, Admin! 🛡️', '🎉');
        } else {
          document.getElementById('login-err').textContent = '❌ Invalid admin credentials';
        }
        return;
      }

      const users = getUsers();
      const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
      if (user) {
        setSession(user);
        this.close();
        this.updateNav(user);
        if (typeof toast === 'function') toast(`Welcome back, ${user.firstName}! 🎉`, '✅');
      } else {
        document.getElementById('login-err').textContent = '❌ Incorrect username or password';
      }
    },

    // ── Register ──────────────────────────────────────────────────────────────
    submitRegister(e) {
      e.preventDefault();
      this.clearErrors();
      const fname    = document.getElementById('re-fname').value.trim();
      const lname    = document.getElementById('re-lname').value.trim();
      const username = document.getElementById('re-username').value.trim();
      const email    = document.getElementById('re-email').value.trim();
      const password = document.getElementById('re-password').value;
      const confirm  = document.getElementById('re-confirm').value;
      const terms    = document.getElementById('re-terms').checked;
      let valid = true;

      if (!fname) { this.err('re-fname', 'First name required'); valid = false; }
      if (!username || username.length < 3) { this.err('re-username', 'At least 3 characters'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.err('re-email', 'Valid email required'); valid = false; }
      if (password.length < 8) { this.err('re-password', 'Min 8 characters'); valid = false; }
      if (password !== confirm) { this.err('re-confirm', 'Passwords do not match'); valid = false; }
      if (!terms) { document.getElementById('register-err').textContent = '❌ Please accept the Terms to continue'; valid = false; }
      if (!valid) return;

      const users = getUsers();
      if (users.find(u => u.username === username)) { this.err('re-username', 'Username already taken'); return; }
      if (users.find(u => u.email === email)) { this.err('re-email', 'Email already registered'); return; }

      const newUser = { username, email, password, firstName: fname, lastName: lname, role: 'user', plan: 'free', joinedAt: new Date().toISOString(), coursesEnrolled: 0 };
      users.push(newUser);
      saveUsers(users);
      setSession(newUser);
      this.close();
      this.updateNav(newUser);
      if (typeof toast === 'function') toast(`Welcome to LearnFlow, ${fname}! 🎉`, '🚀');
    },

    //  Forgot
    submitForgot(e) {
      e.preventDefault();
      const email = document.getElementById('fg-email').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.err('fg-email', 'Enter a valid email'); return; }
      if (typeof toast === 'function') toast('Reset link sent! Check your inbox 📬', '✅');
      this.switchTab('login');
    },

    //  Logout 
    logout() {
      clearSession();
      this.closeUserMenu();
      this.updateNav(null);
      if (typeof toast === 'function') toast('Signed out successfully', '👋');
      document.getElementById('admin-overlay').classList.remove('open');
    },

    // Guest block 
    requireLogin(icon = '🛒', title = 'Login Required', msg = 'You need an account to add items to your cart.') {
      if (getSession()) return true;
      document.getElementById('guest-block-icon').textContent  = icon;
      document.getElementById('guest-block-title').textContent = title;
      document.getElementById('guest-block-msg').textContent   = msg;
      const overlay = document.getElementById('guest-block-overlay');
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
      return false;
    },
    closeGuestBlock(e) { if (e && e.target.id !== 'guest-block-overlay') return; this.closeGuestBlockDirect(); },
    closeGuestBlockDirect() {
      const overlay = document.getElementById('guest-block-overlay');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
    },

    //  Navbar chip 
    updateNav(user) {
      const chip      = document.getElementById('auth-user-chip');
      const avatar    = document.getElementById('auth-avatar');
      const chipName  = document.getElementById('auth-chip-name');
      const chipBadge = document.getElementById('auth-chip-badge');

      // Hide login/register buttons when logged in
      document.querySelectorAll('.btn-s, .btn-p').forEach(btn => {
        const t = btn.textContent.trim();
        if (t === 'Login' || t === 'Register') btn.style.display = user ? 'none' : '';
      });

      if (!user) { chip.style.display = 'none'; return; }

      chip.style.display = 'flex';
      const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || user.username?.[0] || '');
      avatar.textContent = initials.toUpperCase() || '?';
      chipName.textContent = user.firstName || user.username;

      if (user.role === 'admin') {
        chipBadge.textContent = 'ADMIN';
        chipBadge.style.display = 'inline-block';
        chipBadge.style.background = 'rgba(255,107,138,.15)';
        chipBadge.style.color = '#FF6B8A';
      } else {
        chipBadge.style.display = 'none';
      }

      document.getElementById('auth-menu-name').textContent  = (user.firstName || '') + ' ' + (user.lastName || '');
      document.getElementById('auth-menu-email').textContent = user.email || '';
      const roleBadge = document.getElementById('auth-menu-role-badge');
      if (user.role === 'admin') {
        roleBadge.textContent = '🛡️ Administrator';
        roleBadge.style.background = 'rgba(255,107,138,.15)';
        roleBadge.style.color = '#FF6B8A';
        document.getElementById('auth-menu-admin-link').style.display = 'block';
      } else {
        roleBadge.textContent = '📚 Student';
        roleBadge.style.background = 'rgba(56,232,181,.1)';
        roleBadge.style.color = '#38E8B5';
        document.getElementById('auth-menu-admin-link').style.display = 'none';
      }

      //  Inject chip into navbar right section (FIRST position, before login btns)
      const navRight = document.querySelector('#nav .nav-inner > div[style*="margin-left:auto"]');
      if (navRight && !navRight.contains(chip)) {
        navRight.insertBefore(chip, navRight.firstChild);
      }
    },

    toggleUserMenu() {
      _menuOpen = !_menuOpen;
      document.getElementById('auth-user-menu').style.display = _menuOpen ? 'block' : 'none';
    },
    closeUserMenu() {
      _menuOpen = false;
      const m = document.getElementById('auth-user-menu');
      if (m) m.style.display = 'none';
    },

    //  Admin dashboard
    goAdmin() {
      this.closeUserMenu();
      document.getElementById('admin-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      this._refreshBadges();
      this.switchAdminTab(_currentAdminTab);
    },

    switchAdminTab(tab, btn) {
      _currentAdminTab = tab;
      document.querySelectorAll('.adm-nav-item').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      else { const b = document.querySelector(`.adm-nav-item[data-admintab="${tab}"]`); if (b) b.classList.add('active'); }
      this.renderAdminTab(tab);
    },

    renderAdminTab(tab) {
      const content = document.getElementById('admin-content');
      const topTitle = document.getElementById('admin-topbar-title');
      const primaryBtn = document.getElementById('admin-primary-btn');
      const searchWrap = document.querySelector('.adm-search-wrap');

      const titles = { students: 'Students', store: 'Store Management', assign: 'Assign Items', stats: 'Analytics', system: 'System' };
      if (topTitle) topTitle.textContent = titles[tab] || tab;

      // Reset primary button
      if (primaryBtn) {
        primaryBtn.onclick = null;
        primaryBtn.style.display = 'none';
        primaryBtn.textContent = '';
      }
      if (searchWrap) {
        const inp = searchWrap.querySelector('input');
        if (inp) { inp.value = ''; inp.oninput = null; }
      }

      if (tab === 'students') {
        if (primaryBtn) {
          primaryBtn.style.display = '';
          primaryBtn.textContent = '➕ Add Student';
          primaryBtn.onclick = () => this.openAddStudent();
        }
        if (searchWrap) {
          const inp = searchWrap.querySelector('input');
          if (inp) inp.oninput = e => this.filterStudents(e.target.value);
        }
        this.renderStudentsTab(content);
      } else if (tab === 'store') {
        if (primaryBtn) {
          primaryBtn.style.display = '';
          primaryBtn.textContent = '➕ Add Item';
          primaryBtn.onclick = () => { if (typeof SAM !== 'undefined') SAM.openAdd(); };
        }
        if (searchWrap) {
          const inp = searchWrap.querySelector('input');
          if (inp) inp.oninput = e => { if (typeof SAM !== 'undefined') SAM.filterStoreItems(e.target.value); };
        }
        this.renderStoreTab(content);
      } else if (tab === 'assign') {
        this.renderAssignTab(content);
      } else if (tab === 'stats') {
        this.renderStatsTab(content);
      } else if (tab === 'system') {
        this.renderSystemTab(content);
      }
    },

    _refreshBadges() {
      const users = getUsers();
      const el = document.getElementById('badge-students');
      if (el) el.textContent = users.length;
    },

    //  Students tab 
    renderStudentsTab(content) {
      const users = getUsers();
      const planColor = { free: '#7A7A9D', pro: '#7C6FFF', premium: '#38E8B5' };
      const planBg    = { free: 'rgba(122,122,157,.1)', pro: 'rgba(124,111,255,.12)', premium: 'rgba(56,232,181,.1)' };
      const assignments = getAssignments();

      content.innerHTML = `
        <div class="adm-stats">
          <div class="adm-stat-card"><div class="adm-stat-num">${users.length}</div><div class="adm-stat-label">Total Students</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${users.filter(u=>u.plan==='pro').length}</div><div class="adm-stat-label">Pro Plan</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${users.filter(u=>u.plan==='premium').length}</div><div class="adm-stat-label">Premium Plan</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${users.reduce((a,u)=>a+(assignments[u.username]||[]).length,0)}</div><div class="adm-stat-label">Items Assigned</div></div>
        </div>
        <div id="student-list">
          ${!users.length ? `
            <div style="text-align:center;padding:4rem 1rem;color:var(--txt2)">
              <div style="font-size:3rem;margin-bottom:1rem">👥</div>
              <p style="font-weight:700;margin-bottom:.4rem;font-size:.95rem">No students yet</p>
              <p style="font-size:.82rem">Click "Add Student" to create the first account</p>
              <button onclick="LFAuth.openAddStudent()" class="btn btn-p btn-sm" style="margin-top:1rem">➕ Add First Student</button>
            </div>` : users.map((u, i) => this._studentRow(u, i, planColor, planBg, assignments)).join('')}
        </div>`;
    },

    _studentRow(u, i, planColor, planBg, assignments) {
      const plan     = u.plan || 'free';
      const initials = ((u.firstName?.[0] || '') + (u.lastName?.[0] || u.username?.[0] || '')).toUpperCase() || '?';
      const colors   = ['#7C6FFF','#FF6B8A','#38E8B5','#F59E0B','#06B6D4'];
      const col      = colors[i % colors.length];
      const assigned = (assignments[u.username] || []).length;
      return `
        <div class="student-row" data-username="${u.username}" data-plan="${plan}" data-name="${(u.firstName+' '+u.lastName+' '+u.username+' '+u.email).toLowerCase()}">
          <div style="display:flex;align-items:center;gap:.875rem">
            <div style="width:42px;height:42px;border-radius:50%;background:${col}22;border:2px solid ${col}44;display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:800;color:${col};flex-shrink:0">${initials}</div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:700;font-size:.88rem;margin-bottom:.15rem">${u.firstName||''} ${u.lastName||''}</div>
              <div style="font-size:.72rem;color:var(--txt2)">@${u.username} · ${u.email}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
            <span class="plan-badge plan-${plan}">${plan}</span>
            ${assigned > 0 ? `<span style="font-size:.7rem;background:rgba(56,232,181,.1);color:#38E8B5;border:1px solid rgba(56,232,181,.2);padding:.15rem .5rem;border-radius:.35rem">🎁 ${assigned} items</span>` : ''}
            <span style="font-size:.7rem;color:var(--txt2)">${u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : '—'}</span>
            <button class="row-btn row-btn-assign" onclick="LFAuth.switchAdminTab('assign',null);LFAuth.renderAssignTabForUser('${u.username}')">🎁 Assign</button>
            <button class="row-btn row-btn-edit" onclick="LFAuth.editStudent('${u.username}')">✏️ Edit</button>
            <button class="row-btn row-btn-del" onclick="LFAuth.deleteUser('${u.username}')">🗑</button>
          </div>
        </div>`;
    },

    filterStudents(query) {
      const q = query.toLowerCase().trim();
      const pf = document.getElementById('admin-plan-filter')?.value || '';
      document.querySelectorAll('.student-row').forEach(row => {
        const nm = !q || row.dataset.name.includes(q);
        const pm = !pf || row.dataset.plan === pf;
        row.style.display = (nm && pm) ? '' : 'none';
      });
    },

    // Store tab (delegates to SAM) 
    renderStoreTab(content) {
      if (typeof SAM !== 'undefined' && SAM.renderStoreTab) {
        SAM.renderStoreTab(content);
      } else {
        content.innerHTML = `<div style="text-align:center;padding:4rem 1rem;color:var(--txt2)"><div style="font-size:2.5rem;margin-bottom:1rem">🛍️</div><p style="font-weight:700">Store manager loading…</p></div>`;
        setTimeout(() => this.renderStoreTab(content), 300);
      }
    },

    //  Assign tab 
    renderAssignTab(content) {
      const users = getUsers();
      const assignments = getAssignments();
      let storeItems = [];
      try {
        const raw = localStorage.getItem('lf_store_v1');
        if (raw) {
          const s = JSON.parse(raw);
          storeItems = [...(s.courses||[]),...(s.books||[]),...(s.videos||[])];
        } else {
          storeItems = [...(window.COURSES||[]),...(window.BOOKS||[]),...(window.VIDEOS||[])];
        }
      } catch(e) {
        storeItems = [...(window.COURSES||[]),...(window.BOOKS||[]),...(window.VIDEOS||[])];
      }

      const typeIcon  = { course:'📚', book:'📖', video:'🎬' };
      const typeColor = { course:'#7C6FFF', book:'#38E8B5', video:'#FF6B8A' };

      content.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;height:calc(100% - 0px)">
          <!-- Left: pick a student -->
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;margin-bottom:.875rem;color:var(--txt2);text-transform:uppercase;letter-spacing:.08em">1 · Select Student</div>
            ${!users.length ? `<div style="text-align:center;padding:2rem;color:var(--txt2);font-size:.82rem">No students yet</div>` :
              users.map((u, i) => {
                const colors = ['#7C6FFF','#FF6B8A','#38E8B5','#F59E0B','#06B6D4'];
                const col = colors[i % colors.length];
                const initials = ((u.firstName?.[0]||'')+(u.lastName?.[0]||u.username?.[0]||'')).toUpperCase()||'?';
                const assignedCount = (assignments[u.username]||[]).length;
                return `
                  <div class="assign-user-row" id="arow-${u.username}" onclick="LFAuth.selectAssignUser('${u.username}')">
                    <div style="width:38px;height:38px;border-radius:50%;background:${col}22;border:2px solid ${col}44;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:800;color:${col};flex-shrink:0">${initials}</div>
                    <div style="flex:1;min-width:0">
                      <div style="font-weight:700;font-size:.85rem">${u.firstName||''} ${u.lastName||''}</div>
                      <div style="font-size:.72rem;color:var(--txt2)">@${u.username} · ${u.plan||'free'}</div>
                    </div>
                    ${assignedCount > 0 ? `<span style="font-size:.68rem;background:rgba(56,232,181,.1);color:#38E8B5;border:1px solid rgba(56,232,181,.2);padding:.15rem .45rem;border-radius:.35rem">${assignedCount} items</span>` : ''}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--txt2);flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>`;
              }).join('')}
          </div>
          <!-- Right: pick items for selected user -->
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;margin-bottom:.875rem;color:var(--txt2);text-transform:uppercase;letter-spacing:.08em">2 · Assign Items</div>
            <div id="assign-items-panel" style="color:var(--txt2);font-size:.82rem;text-align:center;padding:2rem">
              ← Select a student first
            </div>
          </div>
        </div>`;

      this._assignStoreItems = storeItems;
      this._assignTypeIcon   = typeIcon;
      this._assignTypeColor  = typeColor;
    },

    renderAssignTabForUser(username) {
      // Switch to assign tab and pre-select user
      const btn = document.querySelector('.adm-nav-item[data-admintab="assign"]');
      if (btn) btn.classList.add('active');
      document.querySelectorAll('.adm-nav-item').forEach(b => { if (b !== btn) b.classList.remove('active'); });
      _currentAdminTab = 'assign';
      const content = document.getElementById('admin-content');
      const topTitle = document.getElementById('admin-topbar-title');
      if (topTitle) topTitle.textContent = 'Assign Items';
      this.renderAssignTab(content);
      setTimeout(() => this.selectAssignUser(username), 50);
    },

    selectAssignUser(username) {
      // Highlight row
      document.querySelectorAll('.assign-user-row').forEach(r => r.classList.remove('assigned'));
      const row = document.getElementById('arow-' + username);
      if (row) row.classList.add('assigned');

      const users = getUsers();
      const user  = users.find(u => u.username === username);
      if (!user) return;

      const assignments = getAssignments();
      const userAssigned = assignments[username] || [];
      const storeItems   = this._assignStoreItems || [];
      const typeIcon     = this._assignTypeIcon  || { course:'📚', book:'📖', video:'🎬' };
      const typeColor    = this._assignTypeColor || { course:'#7C6FFF', book:'#38E8B5', video:'#FF6B8A' };

      const panel = document.getElementById('assign-items-panel');
      if (!panel) return;

      if (!storeItems.length) {
        panel.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--txt2);font-size:.82rem">No store items found</div>`;
        return;
      }

      // Group by type
      const groups = { course: storeItems.filter(i=>i.type==='course'), book: storeItems.filter(i=>i.type==='book'), video: storeItems.filter(i=>i.type==='video') };

      panel.innerHTML = `
        <div style="font-size:.82rem;font-weight:700;margin-bottom:.875rem;color:var(--txt)">
          Assigning to: ${user.firstName||''} ${user.lastName||''} <span style="font-size:.72rem;font-weight:400;color:var(--txt2)">(@${username})</span>
        </div>
        ${Object.entries(groups).filter(([,arr])=>arr.length).map(([type, arr]) => `
          <div style="margin-bottom:1rem">
            <div style="font-size:.72rem;font-weight:700;color:${typeColor[type]};text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem">${typeIcon[type]} ${type}s</div>
            ${arr.map(item => {
              const on = userAssigned.includes(item.id);
              return `
                <div class="assign-user-row${on?' assigned':''}" id="ai-${username}-${item.id}"
                  onclick="LFAuth.toggleItemAssign('${username}','${item.id}',this)"
                  style="padding:.625rem .875rem;margin-bottom:.375rem">
                  <div style="flex:1;min-width:0">
                    <div style="font-size:.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.title}</div>
                    <div style="font-size:.7rem;color:var(--txt2)">$${item.price}</div>
                  </div>
                  <div class="assign-check${on?' on':''}" id="achk-${username}-${item.id}">${on?'✓':''}</div>
                </div>`;
            }).join('')}
          </div>`).join('')}
        <div style="margin-top:.875rem;padding-top:.875rem;border-top:1px solid var(--border);font-size:.75rem;color:var(--txt2)">
          ${userAssigned.length} item${userAssigned.length!==1?'s':''} assigned total
        </div>`;
    },

    toggleItemAssign(username, itemId, row) {
      const assignments = getAssignments();
      if (!assignments[username]) assignments[username] = [];
      const chk = document.getElementById(`achk-${username}-${itemId}`);
      const userRow = document.getElementById(`arow-${username}`);

      if (assignments[username].includes(itemId)) {
        assignments[username] = assignments[username].filter(x => x !== itemId);
        row.classList.remove('assigned');
        if (chk) { chk.classList.remove('on'); chk.textContent = ''; }
        if (typeof toast === 'function') toast('Item unassigned', '🗑️');
      } else {
        assignments[username].push(itemId);
        row.classList.add('assigned');
        if (chk) { chk.classList.add('on'); chk.textContent = '✓'; }
        if (typeof toast === 'function') toast('Item assigned! ✓', '✅');
      }

      saveAssignments(assignments);

      // Update counter badge on user row in left panel
      const cnt = assignments[username].length;
      const existingBadge = userRow?.querySelector('[data-assign-cnt]');
      if (userRow) {
        let badge = userRow.querySelector('[data-assign-cnt]');
        if (!badge && cnt > 0) {
          badge = document.createElement('span');
          badge.setAttribute('data-assign-cnt', '1');
          badge.style.cssText = 'font-size:.68rem;background:rgba(56,232,181,.1);color:#38E8B5;border:1px solid rgba(56,232,181,.2);padding:.15rem .45rem;border-radius:.35rem';
          userRow.insertBefore(badge, userRow.querySelector('svg'));
        }
        if (badge) {
          badge.textContent = `${cnt} items`;
          if (cnt === 0) badge.remove();
        }
      }

      // Update total line
      const totalLine = document.querySelector('#assign-items-panel > div:last-child');
      if (totalLine && totalLine.style.borderTop) {
        totalLine.textContent = `${cnt} item${cnt!==1?'s':''} assigned total`;
      }

      // Refresh stats badge
      this._refreshBadges();
    },

    //  Stats tab 
    renderStatsTab(content) {
      const users = getUsers();
      const plans = { free: 0, pro: 0, premium: 0 };
      users.forEach(u => { plans[u.plan || 'free']++; });
      const assignments = getAssignments();
      const totalAssigned = Object.values(assignments).reduce((a,v)=>a+v.length,0);
      const cartLen = typeof cart !== 'undefined' ? cart.length : 0;

      content.innerHTML = `
        <div class="adm-stats">
          <div class="adm-stat-card"><div class="adm-stat-num">${users.length}</div><div class="adm-stat-label">Registered</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${plans.pro + plans.premium}</div><div class="adm-stat-label">Paid Subscribers</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${totalAssigned}</div><div class="adm-stat-label">Items Assigned</div></div>
          <div class="adm-stat-card"><div class="adm-stat-num">${cartLen}</div><div class="adm-stat-label">Cart Items</div></div>
        </div>
        <div style="background:var(--bgcard);border:1px solid var(--border);border-radius:1rem;padding:1.25rem;margin-bottom:1rem">
          <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;margin-bottom:1.25rem">Plan Distribution</div>
          ${[
            { label:'Free',    count:plans.free,    color:'#7A7A9D', bg:'rgba(122,122,157,.15)' },
            { label:'Pro',     count:plans.pro,     color:'#7C6FFF', bg:'rgba(124,111,255,.15)' },
            { label:'Premium', count:plans.premium, color:'#38E8B5', bg:'rgba(56,232,181,.15)'  },
          ].map(p => {
            const pct = users.length > 0 ? Math.round((p.count/users.length)*100) : 0;
            return `
              <div style="margin-bottom:.875rem">
                <div style="display:flex;justify-content:space-between;margin-bottom:.375rem">
                  <span style="font-size:.8rem;font-weight:600">${p.label}</span>
                  <span style="font-size:.8rem;color:var(--txt2)">${p.count} users (${pct}%)</span>
                </div>
                <div class="adm-bar-wrap"><div class="adm-bar-fill" style="width:${pct}%;background:${p.color}"></div></div>
              </div>`;
          }).join('')}
        </div>`;
    },

    //  System tab 
    renderSystemTab(content) {
      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:1rem">
          <div style="background:var(--bgcard);border:1px solid var(--border);border-radius:1rem;padding:1.25rem">
            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;margin-bottom:1rem">⚙️ Data Management</div>
            <div style="display:flex;gap:.75rem;flex-wrap:wrap">
              <button class="btn btn-s btn-sm" onclick="LFAuth.clearAllUsers()">🗑 Clear All Users</button>
              <button class="btn btn-s btn-sm" onclick="LFAuth.clearAllAssignments()">🎁 Clear Assignments</button>
              <button class="btn btn-s btn-sm" onclick="LFAuth.exportUsers()">📥 Export Users JSON</button>
            </div>
          </div>
          <div style="background:rgba(255,107,138,.06);border:1px solid rgba(255,107,138,.15);border-radius:1rem;padding:1.25rem">
            <div style="font-size:.82rem;color:#FF6B8A;font-weight:700;margin-bottom:.5rem">⚠️ Admin Note</div>
            <p style="font-size:.8rem;color:var(--txt2);line-height:1.65">Admin accounts cannot add items to cart or watch video previews. Use a student account for store access.</p>
          </div>
          <div style="background:var(--bgcard);border:1px solid var(--border);border-radius:1rem;padding:1.25rem">
            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;margin-bottom:.875rem">🔑 Admin Credentials</div>
            <div style="font-size:.82rem;color:var(--txt2);line-height:1.8">
              Username: <code style="background:rgba(255,255,255,.06);padding:.1rem .4rem;border-radius:.375rem;font-size:.82rem">admin</code><br>
              Password: <code style="background:rgba(255,255,255,.06);padding:.1rem .4rem;border-radius:.375rem;font-size:.82rem">admin123</code>
            </div>
          </div>
        </div>`;
    },

    //  Add / Edit student 
    openAddStudent(usernameToEdit) {
      _editingUsername = usernameToEdit || null;
      ['as-fname','as-lname','as-username','as-email','as-password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('edit-username-original').value = '';
      document.getElementById('as-plan').value = 'free';
      ['as-fname','as-username','as-email','as-password'].forEach(id => {
        const errEl = document.getElementById(id + '-err');
        if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
        const inp = document.getElementById(id);
        if (inp) inp.classList.remove('err');
      });

      const title     = document.getElementById('add-student-title');
      const submitBtn = document.getElementById('add-student-submit');
      const passLabel = document.getElementById('as-password-label');

      if (usernameToEdit) {
        const u = getUsers().find(x => x.username === usernameToEdit);
        if (u) {
          document.getElementById('as-fname').value    = u.firstName || '';
          document.getElementById('as-lname').value    = u.lastName  || '';
          document.getElementById('as-username').value = u.username  || '';
          document.getElementById('as-email').value    = u.email     || '';
          document.getElementById('as-plan').value     = u.plan      || 'free';
          document.getElementById('edit-username-original').value = u.username;
        }
        if (passLabel) passLabel.textContent = 'Password (leave blank to keep)';
        title.textContent     = '✏️ Edit Student';
        submitBtn.textContent = 'Save Changes →';
      } else {
        if (passLabel) passLabel.textContent = 'Password *';
        title.textContent     = '➕ Add New Student';
        submitBtn.textContent = 'Add Student →';
      }

      document.getElementById('add-student-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => { const inp = document.getElementById('as-fname'); if (inp) inp.focus(); }, 300);
    },

    editStudent(username) { this.openAddStudent(username); },

    closeAddStudent(e) { if (e && e.target.id !== 'add-student-overlay') return; this.closeAddStudentDirect(); },
    closeAddStudentDirect() {
      document.getElementById('add-student-overlay').classList.remove('open');
      const adminOpen = document.getElementById('admin-overlay')?.classList.contains('open');
      if (!adminOpen) document.body.style.overflow = '';
    },

    submitAddStudent(e) {
      e.preventDefault();
      const fname    = document.getElementById('as-fname').value.trim();
      const lname    = document.getElementById('as-lname').value.trim();
      const username = document.getElementById('as-username').value.trim();
      const email    = document.getElementById('as-email').value.trim();
      const password = document.getElementById('as-password').value;
      const plan     = document.getElementById('as-plan').value;
      const orig     = document.getElementById('edit-username-original').value;
      const isEdit   = !!orig;

      ['as-fname','as-username','as-email','as-password'].forEach(id => {
        const errEl = document.getElementById(id+'-err');
        if (errEl) { errEl.textContent=''; errEl.style.display='none'; }
        const inp = document.getElementById(id);
        if (inp) inp.classList.remove('err');
      });

      let valid = true;
      if (!fname)                                     { this.err('as-fname','First name required'); valid=false; }
      if (!username || username.length < 3)           { this.err('as-username','At least 3 characters'); valid=false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.err('as-email','Valid email required'); valid=false; }
      if (!isEdit && password.length < 8)             { this.err('as-password','Min 8 characters'); valid=false; }
      if (isEdit && password && password.length < 8)  { this.err('as-password','Min 8 characters'); valid=false; }
      if (!valid) return;

      let users = getUsers();
      if (isEdit) {
        const idx = users.findIndex(u => u.username === orig);
        if (idx === -1) return;
        if (users.find(u => u.username === username && u.username !== orig)) { this.err('as-username','Already taken'); return; }
        if (users.find(u => u.email === email && u.username !== orig))       { this.err('as-email','Already registered'); return; }
        users[idx] = { ...users[idx], firstName:fname, lastName:lname, username, email, plan, ...(password?{password}:{}) };
        saveUsers(users);
        if (typeof toast === 'function') toast(`@${username} updated! ✏️`, '✅');
      } else {
        if (users.find(u => u.username === username)) { this.err('as-username','Already taken'); return; }
        if (users.find(u => u.email === email))       { this.err('as-email','Already registered'); return; }
        users.push({ username, email, password, firstName:fname, lastName:lname, role:'user', plan, joinedAt:new Date().toISOString(), coursesEnrolled:0 });
        saveUsers(users);
        if (typeof toast === 'function') toast(`@${username} added! 🎉`, '✅');
      }

      this.closeAddStudentDirect();
      this._refreshBadges();
      this.renderAdminTab('students');
      document.querySelectorAll('.adm-nav-item').forEach(b => b.classList.toggle('active', b.dataset.admintab === 'students'));
    },

    deleteUser(username) {
      if (!confirm(`Delete student @${username}? This cannot be undone.`)) return;
      saveUsers(getUsers().filter(u => u.username !== username));
      this._refreshBadges();
      this.renderAdminTab('students');
      if (typeof toast === 'function') toast(`@${username} deleted`, '🗑️');
    },
    clearAllUsers() {
      if (!confirm('Delete ALL registered students? This cannot be undone.')) return;
      saveUsers([]);
      this._refreshBadges();
      this.renderAdminTab('students');
      if (typeof toast === 'function') toast('All students cleared', '🗑️');
    },
    clearAllAssignments() {
      if (!confirm('Clear ALL item assignments? This cannot be undone.')) return;
      saveAssignments({});
      this.renderAdminTab(_currentAdminTab);
      if (typeof toast === 'function') toast('All assignments cleared', '🗑️');
    },
    exportUsers() {
      const data = JSON.stringify(getUsers(), null, 2);
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(new Blob([data], { type:'application/json' }));
      a.download = 'learnflow-students.json';
      a.click();
    },

    closeAdmin(e) { if (e && e.target.id !== 'admin-overlay') return; this.closeAdminDirect(); },
    closeAdminDirect() {
      document.getElementById('admin-overlay').classList.remove('open');
      document.body.style.overflow = '';
    },

    goProfile() { this.closeUserMenu(); if (typeof toast === 'function') toast('Profile page coming soon! 🚧', '⚙️'); },
    handleMainSearch(v) {},

    // ── Errors 
    err(fieldId, msg) {
      const el  = document.getElementById(fieldId + '-err');
      if (el)  { el.textContent = msg; el.style.display = 'block'; }
      const inp = document.getElementById(fieldId);
      if (inp) inp.classList.add('err');
    },
    clearErrors() {
      document.querySelectorAll('.field-err').forEach(el => { el.textContent=''; el.style.display='none'; });
      document.querySelectorAll('.field-input').forEach(inp => inp.classList.remove('err'));
      ['login-err','register-err'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=''; });
    },

    //  Initialization and global patches
    init() {
      if (_initialized) return;
      _initialized = true;

      const user = getSession();
      if (user) this.updateNav(user);

      document.querySelectorAll('.btn-s, .btn-p').forEach(btn => {
        const t = btn.textContent.trim();
        if (t === 'Login')    btn.onclick = () => this.open('login');
        if (t === 'Register') btn.onclick = () => this.open('register');
      });

      document.addEventListener('click', e => {
        const chip = document.getElementById('auth-user-chip');
        if (chip && !chip.contains(e.target)) this.closeUserMenu();
      });

      document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        const addOverlay = document.getElementById('add-student-overlay');
        if (addOverlay?.classList.contains('open')) { this.closeAddStudentDirect(); return; }
        const siOverlay = document.getElementById('si-overlay');
        if (siOverlay?.classList.contains('open')) { siOverlay.classList.remove('open'); return; }
        if (document.getElementById('admin-overlay')?.classList.contains('open')) { this.closeAdminDirect(); return; }
        this.close();
        this.closeUserMenu();
        this.closeGuestBlockDirect();
      });

      this._patchCartAndVideo();
    },

    _patchCartAndVideo() {
      const patch = () => {
        if (typeof window.toggleCart === 'function' && !window._toggleCartPatched) {
          const orig = window.toggleCart;
          window.toggleCart = function(id) {
            const session = getSession();
            if (!session) { LFAuth.requireLogin('🛒','Login to Add to Cart','Create a free account to add courses, books, and videos to your cart!'); return; }
            if (session.role === 'admin') { if (typeof toast==='function') toast('Admin accounts cannot add items to cart','🛡️'); return; }
            orig(id);
          };
          window._toggleCartPatched = true;
        }
        if (typeof window.openVidModal === 'function' && !window._openVidModalPatched) {
          const orig = window.openVidModal;
          window.openVidModal = function(id) {
            const session = getSession();
            if (!session) { LFAuth.requireLogin('🎬','Login to Watch Videos','Sign in or register free to access video lessons!'); return; }
            if (session.role === 'admin') { if (typeof toast==='function') toast('Use a student account to watch video previews','🛡️'); return; }
            orig(id);
          };
          window._openVidModalPatched = true;
        }
      };
      patch();
      setTimeout(patch, 200);
      setTimeout(patch, 800);
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LFAuth.init());
  } else {
    LFAuth.init();
  }

})();