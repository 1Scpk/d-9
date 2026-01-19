(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/animation.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function animation() {
    var fadeIn = 2;
    var lyricsDesktop = Array.from(document.getElementById('lyrics-desktop').getElementsByClassName('lyric'));
    var lyricsMobile = Array.from(document.getElementsByClassName('player__playlist__lyric'));
    var credits = Array.from(document.getElementsByClassName('credit'));
    var creditsMobile = Array.from(document.getElementsByClassName('creditMobile'));
    var lyricsMobileArr = [];
    lyricsMobile.forEach(function (el, index) {
        el.getElementsByClassName('lyric')[0].innerHTML = lyricsDesktop[index].innerHTML;
        el.getElementsByClassName('lyric')[0].className = lyricsDesktop[index].classList;
        lyricsMobileArr.push(el.getElementsByClassName('lyric')[0]);
    });

    TweenMax.to(['.player', '.external', '.press', '.shop', '.shop-cd'], .1, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
    TweenMax.to('.App__view-cart', .1, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
    TweenMax.to(['.shop-holder', '.shop-cd-holder'], .1, { autoAlpha: 0 });
    $('#internal').on('click', function () {
        $('.player-col').removeClass('wide');
        TweenMax.to('.credit-mobile', .5, { force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .5, force3D: true, x: 0, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('#lyrics-desktop', .5, { delay: .7, force3D: true, x: 0, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.cred-desk', .5, { delay: .7, force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.external', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.press', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-cd-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        $('.product--open').click();
    });
    $('#home').on('click', function () {
        TweenMax.to(['.cred-desk', '.credit-mobile'], .1, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        // TweenMax.to(['.player', '#lyrics-desktop', '.cred-desk'], .1, {force3D:true,  autoAlpha:0, ease: Power1.easeOut}) 
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .2, force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.external', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.press', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-cd-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        $('.product--open').click();
    });
    $('#external').on('click', function () {
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to(['.cred-desk', '.credit-mobile'], .01, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.external', .5, { delay: .6, force3D: true, x: 0, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .2, force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-cd-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.press', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        $('.product--open').click();
    });
    $('#info').on('click', function () {
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.cred-desk', .1, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.press', .5, { force3D: true, x: 0, delay: .6, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .2, force3D: true, x: -100, autoAlpha: 0, onComplete: function onComplete() {
                $('.player-col').addClass('wide');
            } });
        TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        $('.product--open').click();
        TweenMax.to('.shop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-cd-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.external', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
    });
    $('#shop').on('click', function () {
        $('.product--open').click();
        $('.App__view-cart--open').click();
        $('.App__header').css('display', 'flex');
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop-holder', .01, { force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.cred-desk', .1, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop', .5, { force3D: true, x: 0, delay: .6, autoAlpha: 1, ease: Power1.easeOut, onComplete: function onComplete() {} });
        TweenMax.to('.App__view-cart', 0.5, { delay: .7, force3D: true, autoAlpha: 1, x: 0, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .2, force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                $('.player-col').addClass('wide');
            } });
        TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-cd-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.press', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.external', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
    });
    $('#physical').on('click', function () {
        $('.product--open').click();
        $('.App__view-cart--open').click();
        $('.App__header').css('display', 'flex');
        TweenMax.to('.App__view-cart', .5, { force3D: true, x: 100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop-cd-holder', .01, { force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        TweenMax.to('.cred-desk', .1, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop-cd', .5, { force3D: true, x: 0, delay: .6, autoAlpha: 1, ease: Power1.easeOut, onComplete: function onComplete() {} });
        TweenMax.to('.App__view-cart', 0.5, { delay: .7, force3D: true, autoAlpha: 1, x: 0, ease: Power1.easeOut });
        TweenMax.to('.player', .5, { delay: .2, force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                $('.player-col').addClass('wide');
            } });
        TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.shop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                TweenMax.to('.shop-holder', .1, { autoAlpha: 0 });
                $('.App__view-cart--open').click();
            } });
        TweenMax.to('.press', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
        TweenMax.to('.external', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut });
    });
}

exports.default = animation;
});

require.register("js/initialize.js", function(exports, require, module) {
'use strict';

var _musicPlayer = require('./musicPlayer');

var _musicPlayer2 = _interopRequireDefault(_musicPlayer);

var _animation = require('./animation');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  console.log('initialized');
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  window.addEventListener('resize', function () {
    // We execute the same script as before
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });
  (0, _musicPlayer2.default)();
  (0, _animation2.default)();
});
});

require.register("js/musicPlayer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import {Howl, Howler} from 'howler';
function musicPlayer() {

    var tracknumber = 0;
    var playingId = null;
    var tracklist = ["sound_01", "sound_02", "sound_03", "sound_04", "sound_05", "sound_06", "sound_07", "sound_08", "sound_09", "sound_10", "sound_11", "sound_12"];
    var fadeOut = 1.2;
    var playBtns = Array.from(document.getElementsByClassName('player__playlist__track'));
    var lyricsDesktop = Array.from(document.getElementById('lyrics-desktop').getElementsByClassName('lyric'));
    var lyricsMobile = Array.from(document.getElementsByClassName('player__playlist__lyric'));
    var credits = Array.from(document.getElementsByClassName('credit'));
    var creditsMobile = Array.from(document.getElementsByClassName('creditMobile'));
    var lyricsMobileArr = [];
    lyricsMobile.forEach(function (el, index) {
        el.getElementsByClassName('lyric')[0].innerHTML = lyricsDesktop[index].innerHTML;
        el.getElementsByClassName('lyric')[0].className = lyricsDesktop[index].classList;
        lyricsMobileArr.push(el.getElementsByClassName('lyric')[0]);
    });
    $('.global-play').hide();
    // $('#lyrics-desktop').addClass('hidden');
    $('.play').hide();
    Howler.autoUnlock = false;
    var players = {
        sound_01: new Howl({
            src: ['trax/01_AAA_Powerline.mp3'],
            onend: function onend() {
                endHandler(0);
            },
            autoSuspend: false
        }),
        sound_02: new Howl({
            src: ['trax/02_Peroxide.mp3'],
            onend: function onend() {
                endHandler(1);
            },
            autoSuspend: false
        }),
        sound_03: new Howl({
            src: ['trax/03_Fragile.mp3'],
            onend: function onend() {
                endHandler(2);
            },
            autoSuspend: false
        }),
        sound_04: new Howl({
            src: ['trax/04_Bliss_Fields.mp3'],
            onend: function onend() {
                endHandler(3);
            },
            autoSuspend: false
        }),
        sound_05: new Howl({
            src: ['trax/05_Fruit_Bleed_Juice.mp3'],
            onend: function onend() {
                endHandler(4);
            },
            autoSuspend: false
        }),
        sound_06: new Howl({
            src: ['trax/06_Cc.mp3'],
            onend: function onend() {
                endHandler(5);
            },
            autoSuspend: false
        }),
        sound_07: new Howl({
            src: ['trax/07_Calcium.mp3'],
            onend: function onend() {
                endHandler(6);
            },
            autoSuspend: false
        }),
        sound_08: new Howl({
            src: ['trax/08_Sugar_&_Diesel.mp3'],
            onend: function onend() {
                endHandler(7);
            },
            autoSuspend: false
        }),
        sound_09: new Howl({
            src: ['trax/09_Dont_Ask.mp3'],
            onend: function onend() {
                endHandler(7);
            },
            autoSuspend: false
        }),
        sound_10: new Howl({
            src: ['trax/10_Security!.mp3'],
            onend: function onend() {
                endHandler(7);
            },
            autoSuspend: false
        }),
        sound_11: new Howl({
            src: ['trax/11_Time.mp3'],
            onend: function onend() {
                endHandler(7);
            },
            autoSuspend: false
        }),
        sound_12: new Howl({
            src: ['trax/12_Blue_Eyes.mp3'],
            onend: function onend() {
                endHandler(7);
            },
            autoSuspend: false
        })
    };

    function endHandler(id) {
        $('.play').show();
        $('.pause').hide();
    }

    var isPlaying = false;
    function playHandler(id) {

        if (!$('.bg-holder__image').hasClass('animate')) {
            setTimeout(function () {
                $('.bg-holder__image').addClass('animate');
            }, 1000);
        }
        $('.global-play').show();
        tracknumber = id;
        playingId = tracklist[id];

        if (isPlaying) {} else {
            players[tracklist[tracknumber]].play();
            setTimeout(function () {
                isPlaying = true;
            }, 100);
        }
        var staggerGroup = Array.from(lyricsDesktop[tracknumber].getElementsByTagName('p'));
        var staggerGroupMobile = Array.from(lyricsMobileArr[tracknumber].getElementsByTagName('p'));
        players[playingId].fade(0, 1, 1000);
        TweenMax.to([lyricsDesktop, credits, creditsMobile], 0.2, { force3D: true, autoAlpha: 0, ease: Power1.easeIn });
        TweenMax.to([lyricsDesktop[tracknumber], lyricsMobileArr[tracknumber]], 0.1, { force3D: true, delay: .1, autoAlpha: 1 });
        TweenMax.to([lyricsDesktop[tracknumber], lyricsMobileArr[tracknumber]], 0.1, { force3D: true, delay: .1, autoAlpha: 1 });
        TweenMax.to(credits[tracknumber], .4, { delay: .2, autoAlpha: 1, force3D: true, ease: Power4.easeInOut });
        TweenMax.to(creditsMobile[tracknumber], .4, { delay: .4, autoAlpha: 1, force3D: true, ease: Power4.easeInOut });
        if ($('#lyrics-desktop').hasClass('hidden')) {
            TweenMax.to('#lyrics-desktop', .5, { delay: .1, force3D: true, x: 0, autoAlpha: 1, ease: Power1.easeOut });
            TweenMax.to('.cred-desk', .4, { delay: .2, force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        }
        TweenMax.from(staggerGroup, .5, { delay: .1, x: -100, autoAlpha: 0, force3D: true, ease: "Power4.in" });
        TweenMax.from(staggerGroupMobile, .1, { autoAlpha: 0, force3D: true, ease: Power4.easeInOut });
    }

    function stopHandler(playingId, id) {

        $('.bg-holder__image').removeClass('animate');

        if (playingId) {
            players[playingId].fade(1, 0, 1000);
            isPlaying = false;
            setTimeout(function () {
                players[playingId].stop();
            }, 1000);
        }
    }
    function pauseHandler(id) {
        // if(isPlaying && $('#lyrics-desktop').hasClass('hidden')) {

        // }

        if ($('#lyrics-desktop').hasClass('hidden')) {
            // players[playingId].fade(0, 1, 1000)
            // players[tracklist[tracknumber]].play();
            console.log('asdfasdfasdf');
            $('.global-play').show();

            TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: 0, autoAlpha: 1, ease: Power1.easeOut, onComplete: function onComplete() {
                    $('#lyrics-desktop').removeClass('hidden');
                } });
            TweenMax.to('.cred-desk', .5, { force3D: true, autoAlpha: 1, ease: Power1.easeOut });
        } else {

            $('.global-play').hide();
            TweenMax.to('#lyrics-desktop', .5, { force3D: true, x: -100, autoAlpha: 0, ease: Power1.easeOut, onComplete: function onComplete() {
                    $('#lyrics-desktop').addClass('hidden');
                } });

            TweenMax.to('.cred-desk', .5, { force3D: true, autoAlpha: 0, ease: Power1.easeOut });
        }
    }

    $('.global-play').on('click', function (e) {
        var id = e.target.dataset.player;
        console.log(id);
        tracknumber = id;
        playingId = tracklist[id];

        if (players[tracklist[id]].playing()) {
            $('.bg-holder__image').addClass('animation-pause');
            $('.global-play').removeClass('playing');
            $('.play').show();
            $('.pause').hide();
            players[playingId].fade(1, 0, 1000);
            setTimeout(function () {
                players[tracklist[id]].pause();
            }, 1000);
        } else {
            $('.global-play').addClass('playing');
            $('.bg-holder__image').removeClass('animation-pause');

            $('.pause').show();
            $('.play').hide();
            players[playingId].fade(0, 1, 1000);
            players[tracklist[tracknumber]].play();
        }
        // pauseHandler(e.target.dataset.player);
    });

    playBtns.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            var $btn = $(btn);
            var sameTrack = playingId === tracklist[index];

            $('.global-play').attr('data-player', index);
            if (!$('.global-play').hasClass('playing')) {
                $('.global-play').addClass('playing');
            }

            if (!sameTrack) {
                stopHandler(playingId, btn.dataset.id);
                playHandler(index);
                if ($('.open').length) {
                    $('.open').removeClass('open');

                    setTimeout(function () {
                        $btn.addClass('open');
                    }, 1000);
                } else {
                    $btn.addClass('open');
                }
            } else {
                pauseHandler(index);
                if ($btn.hasClass('open')) {
                    $btn.removeClass('open');
                    TweenMax.to('.credit-mobile', .4, { force3D: true, autoAlpha: 0, ease: Power4.easeOut });
                } else {
                    $btn.addClass('open');
                    TweenMax.to('.credit-mobile', .4, { force3D: true, autoAlpha: 1, ease: Power4.easeOut });
                }
            }
        });
    });
}

exports.default = musicPlayer;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");
window.bootstrap = require("bootstrap");


});})();require('___globals___');

require('js/initialize');
//# sourceMappingURL=app.js.map