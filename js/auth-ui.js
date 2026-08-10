(function () {
  'use strict';

  function googleIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style="flex-shrink:0">' +
      '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
      '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
      '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>' +
      '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
      '</svg>';
  }

  function renderSignedOut(container) {
    container.innerHTML =
      '<button class="auth-google-btn" id="auth-signin-btn" type="button">' +
        googleIcon() +
        '<span>Sign in to sync</span>' +
      '</button>';
    document.getElementById('auth-signin-btn').addEventListener('click', function () {
      window.CourseStore.signInWithGoogle();
    });
  }

  function renderSignedIn(container, user) {
    var name = (user.user_metadata && user.user_metadata.full_name) || user.email || 'You';
    var email = user.email || '';
    var avatarUrl = user.user_metadata && user.user_metadata.avatar_url;
    var initial = name[0].toUpperCase();

    container.innerHTML =
      '<div class="auth-user" tabindex="0">' +
        (avatarUrl
          ? '<img class="auth-avatar" src="' + avatarUrl + '" alt="' + initial + '" title="' + email + '">'
          : '<span class="auth-avatar auth-avatar--initial" title="' + email + '">' + initial + '</span>') +
        '<div class="auth-popover">' +
          '<span class="auth-email">' + email + '</span>' +
          '<button class="auth-signout-btn" id="auth-signout-btn" type="button">Sign out</button>' +
        '</div>' +
      '</div>';

    document.getElementById('auth-signout-btn').addEventListener('click', function () {
      window.CourseStore.signOut().then(function () {
        location.reload();
      });
    });
  }

  // Supabase reports OAuth failures (e.g. a Google code-exchange error) by
  // redirecting back with ?error=&error_description= in the query and/or
  // hash — never as a JS exception, so it fails completely silently unless
  // something explicitly looks for it.
  function showAuthError(message) {
    var banner = document.createElement('div');
    banner.className = 'auth-error-banner';
    banner.innerHTML =
      '<span>Sign-in failed: ' + message + '</span>' +
      '<button type="button" aria-label="Dismiss">Dismiss</button>';
    var topbar = document.querySelector('.topbar');
    if (topbar) topbar.insertAdjacentElement('afterend', banner);
    banner.querySelector('button').addEventListener('click', function () {
      banner.remove();
    });
  }

  function checkAuthErrorInUrl() {
    var url = new URL(location.href);
    var hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    var error = url.searchParams.get('error') || hashParams.get('error');
    var description = url.searchParams.get('error_description') || hashParams.get('error_description');
    if (!error) return;

    console.error('Supabase auth error:', error, description);
    showAuthError(description || error);

    ['error', 'error_code', 'error_description'].forEach(function (k) { url.searchParams.delete(k); });
    ['error', 'error_code', 'error_description', 'sb'].forEach(function (k) { hashParams.delete(k); });
    var newHash = hashParams.toString();
    url.hash = newHash ? '#' + newHash : '';
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  function init() {
    var container = document.getElementById('auth-ui');
    if (!container || !window.CourseStore) return;

    checkAuthErrorInUrl();

    window.CourseStore.ready.then(function () {
      window.CourseStore.getUser().then(function (user) {
        if (user && !user.is_anonymous) {
          renderSignedIn(container, user);
        } else {
          renderSignedOut(container);
        }
      });

      window.CourseStore.onAuthChange(function (event, session) {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          var user = session ? session.user : null;
          if (user && !user.is_anonymous) {
            renderSignedIn(container, user);
          } else {
            renderSignedOut(container);
          }
        } else if (event === 'SIGNED_OUT') {
          renderSignedOut(container);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
