
var BindImgui = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  
  return (
function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_memory","___indirect_function_table","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = true;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
readAsync = (url) => {
    assert(!isFileURI(url), "readAsync does not work with file:// URLs");
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_WORKER, 'worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.');

assert(!ENVIRONMENT_IS_NODE, 'node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.');

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary; 
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}
// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABuARHYAF/AX9gAn9/AX9gAn9/AGADf39/AX9gAX8AYAZ/f39/f38Bf2ADf39/AGAAAGAEf39/fwBgAAF/YAV/f39/fwF/YAZ/f39/f38AYAR/f39/AX9gCH9/f39/f39/AX9gBX9/f39/AGAHf39/f39/fwBgB39/f39/f38Bf2AFf35+fn4AYAABfmADf35/AX5gBX9/f39+AX9gBH9/f38BfmAGf39/f35/AX9gCn9/f39/f39/f38AYAd/f39/f35+AX9gBH9+fn8AYAV/f35/fwBgCn9/f39/f39/f38Bf2AGf39/f35+AX9gA319fQF9YAJ8fwF8YAJ/fwF9YAJ/fwF8YAZ/fH9/f38Bf2ACfn8Bf2AEf39/fgF+YAR+fn5+AX9gA39/fwF+YAN/f38BfWADf39/AXxgDH9/f39/f39/f39/fwF/YAV/f39/fAF/YAZ/f39/fH8Bf2AHf39/f35+fwF/YAt/f39/f39/f39/fwF/YA9/f39/f39/f39/f39/f38AYAh/f39/f39/fwBgBH99fX0BfWABfQF9YAF/AX1gAn9+AGACfn4Bf2ADf35+AGACf38BfmADfn9/AX9gAXwBfmADf39+AGACf3wAYAJ/fQBgAn5+AXxgAn5+AX1gAn9+AX9gAn5/AX5gAX8BfmAEf39+fwF+YAZ/f39+f38AYAZ/f39/f34Bf2AIf39/f39/fn4Bf2AJf39/f39/f39/AX9gBX9/f35+AGAEf35/fwF/AvsEFQNlbnYVX2VtYmluZF9yZWdpc3Rlcl92b2lkAAIDZW52FV9lbWJpbmRfcmVnaXN0ZXJfYm9vbAAIA2VudhhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIADgNlbnYWX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAAGA2VudhtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcAAgNlbnYcX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZwAGA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2VtdmFsAAQDZW52HF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcABgNlbnYZX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgAPA2Vudg1fX2Fzc2VydF9mYWlsAAgDZW52FV9lbXNjcmlwdGVu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BCQAIAQgADYCDCAEIAE6AAsgBCgCDCEFIAQtAAshBiAFKAIAIQcgBygCHCEIQRghCSAGIAl0IQogCiAJdSELIAUgCyAIEQEAIQxBGCENIAwgDXQhDiAOIA11IQ9BECEQIAQgEGohESARJAAgDw8LBQAQGw8LBABBAAsGAEHElAULjgQBA38CQCACQYAESQ0AIAAgASACEAogAA8LIAAgAmohAwJAAkAgASAAc0EDcQ0AAkACQCAAQQNxDQAgACECDAELAkAgAg0AIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAkEDcUUNASACIANJDQALCwJAIANBfHEiBEHAAEkNACACIARBQGoiBUsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYCMCACIAEoAjQ2AjQgAiABKAI4NgI4IAIgASgCPDYCPCABQcAAaiEBIAJBwABqIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQAMAgsACwJAIANBBE8NACAAIQIMAQsCQCADQXxqIgQgAE8NACAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLAkAgAiADTw0AA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLIAAL9gIBAn8CQCAAIAFGDQACQCABIAAgAmoiA2tBACACQQF0a0sNACAAIAEgAhBdDwsgASAAc0EDcSEEAkACQAJAIAAgAU8NAAJAIARFDQAgACEDDAMLAkAgAEEDcQ0AIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcUUNAgwACwALAkAgBA0AAkAgA0EDcUUNAANAIAJFDQUgACACQX9qIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBfGoiAmogASACaigCADYCACACQQNL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C88BAQN/AkACQCACKAIQIgMNAEEAIQQgAhBqDQEgAigCECEDCwJAIAMgAigCFCIEayABTw0AIAIgACABIAIoAiQRAwAPCwJAAkAgAigCUEEASA0AIAFFDQAgASEDAkADQCAAIANqIgVBf2otAABBCkYNASADQX9qIgNFDQIMAAsACyACIAAgAyACKAIkEQMAIgQgA0kNAiABIANrIQEgAigCFCEEDAELIAAhBUEAIQMLIAQgBSABEF0aIAIgAigCFCABajYCFCADIAFqIQQLIAQLVwECfyACIAFsIQQCQAJAIAMoAkxBf0oNACAAIAQgAxBrIQAMAQsgAxBhIQUgACAEIAMQayEAIAVFDQAgAxBiCwJAIAAgBEcNACACQQAgARsPCyAAIAFuC4gBAQR/AkAgAEE9EIMBIgEgAEcNAEEADwtBACECAkAgACABIABrIgNqLQAADQBBACgCyJQFIgFFDQAgASgCACIERQ0AAkADQAJAIAAgBCADEIcBDQAgASgCACADaiIELQAAQT1GDQILIAEoAgQhBCABQQRqIQEgBA0ADAILAAsgBEEBaiECCyACCwQAQSoLBAAQbgs5AQF/IwBBEGsiAyQAIAAgASACQf8BcSADQQhqEKUOELUBIQIgAykDCCEBIANBEGokAEJ/IAEgAhsL6QEBAn8gAkEARyEDAkACQAJAIABBA3FFDQAgAkUNACABQf8BcSEEA0AgAC0AACAERg0CIAJBf2oiAkEARyEDIABBAWoiAEEDcUUNASACDQALCyADRQ0BAkAgAC0AACABQf8BcUYNACACQQRJDQAgAUH/AXFBgYKECGwhBANAQYCChAggACgCACAEcyIDayADckGAgYKEeHFBgIGChHhHDQIgAEEEaiEAIAJBfGoiAkEDSw0ACwsgAkUNAQsgAUH/AXEhAwNAAkAgAC0AACADRw0AIAAPCyAAQQFqIQAgAkF/aiICDQALC0EAC4cBAQJ/AkACQAJAIAJBBEkNACABIAByQQNxDQEDQCAAKAIAIAEoAgBHDQIgAUEEaiEBIABBBGohACACQXxqIgJBA0sNAAsLIAJFDQELAkADQCAALQAAIgMgAS0AACIERw0BIAFBAWohASAAQQFqIQAgAkF/aiICRQ0CDAALAAsgAyAEaw8LQQALBABBAAsEAEEACwQAQQALBABBAAsEAEEACwIACwIACwwAQYSVBRB4QYiVBQsIAEGElQUQeQsGAEGMlQULFgBBAEHslAU2AuyVBUEAEG82AqSVBQuuAQACQAJAIAFBgAhIDQAgAEQAAAAAAADgf6IhAAJAIAFB/w9PDQAgAUGBeGohAQwCCyAARAAAAAAAAOB/oiEAIAFB/RcgAUH9F0kbQYJwaiEBDAELIAFBgXhKDQAgAEQAAAAAAABgA6IhAAJAIAFBuHBNDQAgAUHJB2ohAQwBCyAARAAAAAAAAGADoiEAIAFB8GggAUHwaEsbQZIPaiEBCyAAIAFB/wdqrUI0hr+iCyoBAX8jAEEQayIEJAAgBCADNgIMIAAgASACIAMQqQEhAyAEQRBqJAAgAwsoAQF/IwBBEGsiAyQAIAMgAjYCDCAAIAEgAhCzASECIANBEGokACACCwQAQQALBABCAAv5AQEDfwJAAkACQAJAIAFB/wFxIgJFDQACQCAAQQNxRQ0AIAFB/wFxIQMDQCAALQAAIgRFDQUgBCADRg0FIABBAWoiAEEDcQ0ACwtBgIKECCAAKAIAIgNrIANyQYCBgoR4cUGAgYKEeEcNASACQYGChAhsIQIDQEGAgoQIIAMgAnMiBGsgBHJBgIGChHhxQYCBgoR4Rw0CIAAoAgQhAyAAQQRqIgQhACADQYCChAggA2tyQYCBgoR4cUGAgYKEeEYNAAwDCwALIAAgABCGAWoPCyAAIQQLA0AgBCIALQAAIgNFDQEgAEEBaiEEIAMgAUH/AXFHDQALCyAAC1kBAn8gAS0AACECAkAgAC0AACIDRQ0AIAMgAkH/AXFHDQADQCABLQABIQIgAC0AASIDRQ0BIAFBAWohASAAQQFqIQAgAyACQf8BcUYNAAsLIAMgAkH/AXFrCyMBAn8CQCAAEIYBQQFqIgEQugEiAg0AQQAPCyACIAAgARBdC4gBAQN/IAAhAQJAAkAgAEEDcUUNAAJAIAAtAAANACAAIABrDwsgACEBA0AgAUEBaiIBQQNxRQ0BIAEtAAANAAwCCwALA0AgASICQQRqIQFBgIKECCACKAIAIgNrIANyQYCBgoR4cUGAgYKEeEYNAAsDQCACIgFBAWohAiABLQAADQALCyABIABrC3UBAn8CQCACDQBBAA8LAkACQCAALQAAIgMNAEEAIQAMAQsCQANAIANB/wFxIAEtAAAiBEcNASAERQ0BIAJBf2oiAkUNASABQQFqIQEgAC0AASEDIABBAWohACADDQALQQAhAwsgA0H/AXEhAAsgACABLQAAawsWAQF/IABBACABEHEiAiAAayABIAIbC0ABAn8jAEEQayIBJABBfyECAkAgABBpDQAgACABQQ9qQQEgACgCIBEDAEEBRw0AIAEtAA8hAgsgAUEQaiQAIAILRwECfyAAIAE3A3AgACAAKAIsIAAoAgQiAmusNwN4IAAoAgghAwJAIAFQDQAgAyACa6wgAVcNACACIAGnaiEDCyAAIAM2AmgL3QECA38CfiAAKQN4IAAoAgQiASAAKAIsIgJrrHwhBAJAAkACQCAAKQNwIgVQDQAgBCAFWQ0BCyAAEIkBIgJBf0oNASAAKAIEIQEgACgCLCECCyAAQn83A3AgACABNgJoIAAgBCACIAFrrHw3A3hBfw8LIARCAXwhBCAAKAIEIQEgACgCCCEDAkAgACkDcCIFQgBRDQAgBSAEfSIFIAMgAWusWQ0AIAEgBadqIQMLIAAgAzYCaCAAIAQgACgCLCIDIAFrrHw3A3gCQCABIANLDQAgAUF/aiACOgAACyACCzwAIAAgATcDACAAIARCMIinQYCAAnEgAkKAgICAgIDA//8Ag0IwiKdyrUIwhiACQv///////z+DhDcDCAvnAgEBfyMAQdAAayIEJAACQAJAIANBgIABSA0AIARBIGogASACQgBCgICAgICAgP//ABDOASAEQSBqQQhqKQMAIQIgBCkDICEBAkAgA0H//wFPDQAgA0GBgH9qIQMMAgsgBEEQaiABIAJCAEKAgICAgICA//8AEM4BIANB/f8CIANB/f8CSRtBgoB+aiEDIARBEGpBCGopAwAhAiAEKQMQIQEMAQsgA0GBgH9KDQAgBEHAAGogASACQgBCgICAgICAgDkQzgEgBEHAAGpBCGopAwAhAiAEKQNAIQECQCADQfSAfk0NACADQY3/AGohAwwBCyAEQTBqIAEgAkIAQoCAgICAgIA5EM4BIANB6IF9IANB6IF9SxtBmv4BaiEDIARBMGpBCGopAwAhAiAEKQMwIQELIAQgASACQgAgA0H//wBqrUIwhhDOASAAIARBCGopAwA3AwggACAEKQMANwMAIARB0ABqJAALSwIBfgJ/IAFC////////P4MhAgJAAkAgAUIwiKdB//8BcSIDQf//AUYNAEEEIQQgAw0BQQJBAyACIACEUBsPCyACIACEUCEECyAEC9IGAgR/A34jAEGAAWsiBSQAAkACQAJAIAMgBEIAQgAQxAFFDQAgAyAEEI4BRQ0AIAJCMIinIgZB//8BcSIHQf//AUcNAQsgBUEQaiABIAIgAyAEEM4BIAUgBSkDECIEIAVBEGpBCGopAwAiAyAEIAMQxgEgBUEIaikDACECIAUpAwAhBAwBCwJAIAEgAkL///////////8AgyIJIAMgBEL///////////8AgyIKEMQBQQBKDQACQCABIAkgAyAKEMQBRQ0AIAEhBAwCCyAFQfAAaiABIAJCAEIAEM4BIAVB+ABqKQMAIQIgBSkDcCEEDAELIARCMIinQf//AXEhCAJAAkAgB0UNACABIQQMAQsgBUHgAGogASAJQgBCgICAgICAwLvAABDOASAFQegAaikDACIJQjCIp0GIf2ohByAFKQNgIQQLAkAgCA0AIAVB0ABqIAMgCkIAQoCAgICAgMC7wAAQzgEgBUHYAGopAwAiCkIwiKdBiH9qIQggBSkDUCEDCyAKQv///////z+DQoCAgICAgMAAhCELIAlC////////P4NCgICAgICAwACEIQkCQCAHIAhMDQADQAJAAkAgCSALfSAEIANUrX0iCkIAUw0AAkAgCiAEIAN9IgSEQgBSDQAgBUEgaiABIAJCAEIAEM4BIAVBKGopAwAhAiAFKQMgIQQMBQsgCkIBhiAEQj+IhCEJDAELIAlCAYYgBEI/iIQhCQsgBEIBhiEEIAdBf2oiByAISg0ACyAIIQcLAkACQCAJIAt9IAQgA1StfSIKQgBZDQAgCSEKDAELIAogBCADfSIEhEIAUg0AIAVBMGogASACQgBCABDOASAFQThqKQMAIQIgBSkDMCEEDAELAkAgCkL///////8/Vg0AA0AgBEI/iCEDIAdBf2ohByAEQgGGIQQgAyAKQgGGhCIKQoCAgICAgMAAVA0ACwsgBkGAgAJxIQgCQCAHQQBKDQAgBUHAAGogBCAKQv///////z+DIAdB+ABqIAhyrUIwhoRCAEKAgICAgIDAwz8QzgEgBUHIAGopAwAhAiAFKQNAIQQMAQsgCkL///////8/gyAHIAhyrUIwhoQhAgsgACAENwMAIAAgAjcDCCAFQYABaiQACxwAIAAg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Gw0AIANCAFIgCUKAgICAgIDAgIB/fCILQoCAgICAgMCAgH9WIAtCgICAgICAwICAf1EbDQELAkAgBiAKQoCAgICAgMD//wBUIApCgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEEIAEhAwwCCwJAIANQIAlCgICAgICAwP//AFQgCUKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQQMAgsCQCABIApCgICAgICAwP//AIWEQgBSDQBCgICAgICA4P//ACACIAMgAYUgBCAChUKAgICAgICAgIB/hYRQIgYbIQRCACABIAYbIQMMAgsgAyAJQoCAgICAgMD//wCFhFANAQJAIAEgCoRCAFINACADIAmEQgBSDQIgAyABgyEDIAQgAoMhBAwCCyADIAmEUEUNACABIQMgAiEEDAELIAMgASADIAFWIAkgClYgCSAKURsiBxshCSAEIAIgBxsiC0L///////8/gyEKIAIgBCAHGyIMQjCIp0H//wFxIQgCQCALQjCIp0H//wFxIgYNACAFQeAAaiAJIAogCSAKIApQIgYbeSAGQQZ0rXynIgZBcWoQwwFBECAGayEGIAVB6ABqKQMAIQogBSkDYCEJCyABIAMgBxshAyAMQv///////z+DIQECQCAIDQAgBUHQAGogAyABIAMgASABUCIHG3kgB0EGdK18pyIHQXFqEMMBQRAgB2shCCAFQdgAaikDACEBIAUpA1AhAwsgAUIDhiADQj2IhEKAgICAgICABIQhASAKQgOGIAlCPYiEIQwgA0IDhiEKIAQgAoUhAwJAIAYgCEYNAAJAIAYgCGsiB0H/AE0NAEIAIQFCASEKDAELIAVBwABqIAogAUGAASAHaxDDASAFQTBqIAogASAHEM0BIAUpAzAgBSkDQCAFQcAAakEIaikDAIRCAFKthCEKIAVBMGpBCGopAwAhAQsgDEKAgICAgICABIQhDCAJQgOGIQkCQAJAIANCf1UNAEIAIQNCACEEIAkgCoUgDCABhYRQDQIgCSAKfSECIAwgAX0gCSAKVK19IgRC/////////wNWDQEgBUEgaiACIAQgAiAEIARQIgcbeSAHQQZ0rXynQXRqIgcQwwEgBiAHayEGIAVBKGopAwAhBCAFKQMgIQIMAQsgASAMfCAKIAl8IgIgClStfCIEQoCAgICAgIAIg1ANACACQgGIIARCP4aEIApCAYOEIQIgBkEBaiEGIARCAYghBAsgC0KAgICAgICAgIB/gyEKAkAgBkH//wFIDQAgCkKAgICAgIDA//8AhCEEQgAhAwwBC0EAIQcCQAJAIAZBAEwNACAGIQcMAQsgBUEQaiACIAQgBkH/AGoQwwEgBSACIARBASAGaxDNASAFKQMAIAUpAxAgBUEQakEIaikDAIRCAFKthCECIAVBCGopAwAhBAsgAkIDiCAEQj2GhCEDIAetQjCGIARCA4hC////////P4OEIAqEIQQgAqdBB3EhBgJAAkACQAJAAkAQywEOAwABAgMLAkAgBkEERg0AIAQgAyAGQQRLrXwiCiADVK18IQQgCiEDDAMLIAQgAyADQgGDfCIKIANUrXwhBCAKIQMMAwsgBCADIApCAFIgBkEAR3GtfCIKIANUrXwhBCAKIQMMAQsgBCADIApQIAZBAEdxrXwiCiADVK18IQQgCiEDCyAGRQ0BCxDMARoLIAAgAzcDACAAIAQ3AwggBUHwAGokAAtTAQF+AkACQCADQcAAcUUNACABIANBQGqthiECQgAhAQwBCyADRQ0AIAFBwAAgA2utiCACIAOtIgSGhCECIAEgBIYhAQsgACABNwMAIAAgAjcDCAvgAQIBfwJ+QQEhBAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNAAJAIAIgAIQgBiAFhIRQRQ0AQQAPCwJAIAMgAYNCAFMNAEF/IQQgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LQX8hBCAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQL2AECAX8CfkF/IQQCQCAAQgBSIAFC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAJCAFIgA0L///////////8AgyIGQoCAgICAgMD//wBWIAZCgICAgICAwP//AFEbDQACQCACIACEIAYgBYSEUEUNAEEADwsCQCADIAGDQgBTDQAgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LIAAgAlYgASADVSABIANRGw0AIAAgAoUgASADhYRCAFIhBAsgBAvnEAIFfw9+IwBB0AJrIgUkACAEQv///////z+DIQogAkL///////8/gyELIAQgAoVCgICAgICAgICAf4MhDCAEQjCIp0H//wFxIQYCQAJAAkAgAkIwiKdB//8BcSIHQYGAfmpBgoB+SQ0AQQAhCCAGQYGAfmpBgYB+Sw0BCwJAIAFQIAJC////////////AIMiDUKAgICAgIDA//8AVCANQoCAgICAgMD//wBRGw0AIAJCgICAgICAIIQhDAwCCwJAIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRGw0AIARCgICAgICAIIQhDCADIQEMAgsCQCABIA1CgICAgICAwP//AIWEQgBSDQACQCADIAJCgICAgICAwP//AIWEUEUNAEIAIQFCgICAgICA4P//ACEMDAMLIAxCgICAgICAwP//AIQhDEIAIQEMAgsCQCADIAJCgICAgICAwP//AIWEQgBSDQBCACEBDAILAkAgASANhEIAUg0AQoCAgICAgOD//wAgDCADIAKEUBshDEIAIQEMAgsCQCADIAKEQgBSDQAgDEKAgICAgIDA//8AhCEMQgAhAQwCC0EAIQgCQCANQv///////z9WDQAgBUHAAmogASALIAEgCyALUCIIG3kgCEEGdK18pyIIQXFqEMMBQRAgCGshCCAFQcgCaikDACELIAUpA8ACIQELIAJC////////P1YNACAFQbACaiADIAogAyAKIApQIgkbeSAJQQZ0rXynIglBcWoQwwEgCSAIakFwaiEIIAVBuAJqKQMAIQogBSkDsAIhAwsgBUGgAmogA0IxiCAKQoCAgICAgMAAhCIOQg+GhCICQgBCgICAgLDmvIL1ACACfSIEQgAQzwEgBUGQAmpCACAFQaACakEIaikDAH1CACAEQgAQzwEgBUGAAmogBSkDkAJCP4ggBUGQAmpBCGopAwBCAYaEIgRCACACQgAQzwEgBUHwAWogBEIAQgAgBUGAAmpBCGopAwB9QgAQzwEgBUHgAWogBSkD8AFCP4ggBUHwAWpBCGopAwBCAYaEIgRCACACQgAQzwEgBUHQAWogBEIAQgAgBUHgAWpBCGopAwB9QgAQzwEgBUHAAWogBSkD0AFCP4ggBUHQAWpB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H3UiA3MgA2siA61CACADZyIDQdEAahDDASACQQhqKQMAQoCAgICAgMAAhUGegAEgA2utQjCGfCABQYCAgIB4ca1CIIaEIQUgAikDACEECyAAIAQ3AwAgACAFNwMIIAJBEGokAAt1AgF/An4jAEEQayICJAACQAJAIAENAEIAIQNCACEEDAELIAIgAa1CAEHwACABZyIBQR9zaxDDASACQQhqKQMAQoCAgICAgMAAhUGegAEgAWutQjCGfCEEIAIpAwAhAwsgACADNwMAIAAgBDcDCCACQRBqJAALBABBAAsEAEEAC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC5oLAgV/D34jAEHgAGsiBSQAIARC////////P4MhCiAEIAKFQoCAgICAgICAgH+DIQsgAkL///////8/gyIMQiCIIQ0gBEIwiKdB//8BcSEGAkACQAJAIAJCMIinQf//AXEiB0GBgH5qQYKAfkkNAEEAIQggBkGBgH5qQYGAfksNAQsCQCABUCACQv///////////wCDIg5CgICAgICAwP//AFQgDkKAgICAgIDA//8AURsNACACQoCAgICAgCCEIQsMAgsCQCADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQsgAyEBDAILAkAgASAOQoCAgICAgMD//wCFhEIAUg0AAkAgAyAChFBFDQBCgICAgICA4P//ACELQgAhAQwDCyALQoCAgICAgMD//wCEIQtCACEBDAILAkAgAyACQoCAgICAgMD//wCFhEIAUg0AIAEgDoQhAkIAIQECQCACUEUNAEKAgICAgIDg//8AIQsMAwsgC0KAgICAgIDA//8AhCELDAILAkAgASAOhEIAUg0AQgAhAQwCCwJAIAMgAoRCAFINAEIAIQEMAgtBACEIAkAgDkL///////8/Vg0AIAVB0ABqIAEgDCABIAwgDFAiCBt5IAhBBnStfKciCEFxahDDAUEQIAhrIQggBUHYAGopAwAiDEIgiCENIAUpA1AhAQsgAkL///////8/Vg0AIAVBwABqIAMgCiADIAogClAiCRt5IAlBBnStfKciCUFxahDDASAIIAlrQRBqIQggBUHIAGopAwAhCiAFKQNAIQMLIANCD4YiDkKAgP7/D4MiAiABQiCIIgR+Ig8gDkIgiCIOIAFC/////w+DIgF+fCIQQiCGIhEgAiABfnwiEiARVK0gAiAMQv////8PgyIMfiITIA4gBH58IhEgA0IxiCAKQg+GIhSEQv////8PgyIDIAF+fCIVIBBCIIggECAPVK1CIIaEfCIQIAIgDUKAgASEIgp+IhYgDiAMfnwiDSAUQiCIQoCAgIAIhCICIAF+fCIPIAMgBH58IhRCIIZ8Ihd8IQEgByAGaiAIakGBgH9qIQYCQAJAIAIgBH4iGCAOIAp+fCIEIBhUrSAEIAMgDH58Ig4gBFStfCACIAp+fCAOIBEgE1StIBUgEVStfHwiBCAOVK18IAMgCn4iAyACIAx+fCICIANUrUIghiACQiCIhHwgBCACQiCGfCICIARUrXwgAiAUQiCIIA0gFlStIA8gDVStfCAUIA9UrXxCIIaEfCIEIAJUrXwgBCAQIBVUrSAXIBBUrXx8IgIgBFStfCIEQoCAgICAgMAAg1ANACAGQQFqIQYMAQsgEkI/iCEDIARCAYYgAkI/iIQhBCACQgGGIAFCP4iEIQIgEkIBhiESIAMgAUIBhoQhAQsCQCAGQf//AUgNACALQoCAgICAgMD//wCEIQtCACEBDAELAkACQCAGQQBKDQACQEEBIAZrIgdB/wBLDQAgBUEwaiASIAEgBkH/AGoiBhDDASAFQSBqIAIgBCAGEMMBIAVBEGogEiABIAcQzQEgBSACIAQgBxDNASAFKQMgIAUpAxCEIAUpAzAgBUEwakEIaikDAIRCAFKthCESIAVBIGpBCGopAwAgBUEQakEIaikDAIQhASAFQQhqKQMAIQQgBSkDACECDAILQgAhAQwCCyAGrUIwhiAEQv///////z+DhCEECyAEIAuEIQsCQCASUCABQn9VIAFCgICAgICAgICAf1EbDQAgCyACQgF8IgFQrXwhCwwBCwJAIBIgAUKAgICAgICAgIB/hYRCAFENACACIQEMAQsgCyACIAJCAYN8IgEgAlStfCELCyAAIAE3AwAgACALNwMIIAVB4ABqJAALdQEBfiAAIAQgAX4gAiADfnwgA0IgiCICIAFCIIgiBH58IANC/////w+DIgMgAUL/////D4MiAX4iBUIgiCADIAR+fCIDQiCIfCADQv////8PgyACIAF+fCIBQiCIfDcDCCAAIAFCIIYgBUL/////D4OENwMAC0gBAX8jAEEQayIFJAAgBSABIAIgAyAEQoCAgICAgICAgH+FEMIBIAUpAwAhBCAAIAVBCGopAwA3AwggACAENwMAIAVBEGokAAuLBAIFfwR+IwBBIGsiAiQAIAFC////////P4MhBwJAAkAgAUIwiEL//wGDIginIgNB/4d/akH9D0sNACAAQjyIIAdCBIaEIQcgA0GAiH9qrSEJAkACQCAAQv//////////D4MiAEKBgICAgICAgAhUDQAgB0IBfCEHDAELIABCgICAgICAgIAIUg0AIAdCAYMgB3whBwtCACAHIAdC/////////wdWIgMbIQogA60gCXwhCQwBCwJAIAAgB4RQDQAgCEL//wFSDQAgAEI8iCAHQgSGhEKAgICAgICABIQhCkL/DyEJDAELAkAgA0H+hwFNDQBC/w8hCUIAIQoMAQtCACEKQgAhCUGA+ABBgfgAIAhQIgQbIgUgA2siBkHwAEoNACACQRBqIAAgByAHQoCAgICAgMAAhCAEGyIHQYABIAZrEMMBIAIgACAHIAYQzQEgAikDACIHQjyIIAJBCGopAwBCBIaEIQACQAJAIAdC//////////8PgyAFIANHIAIpAxAgAkEQakEIaikDAIRCAFJxrYQiB0KBgICAgICAgAhUDQAgAEIBfCEADAELIAdCgICAgICAgIAIUg0AIABCAYMgAHwhAAsgAEKAgICAgICACIUgACAAQv////////8HViIDGyEKIAOtIQkLIAJBIGokACAJQjSGIAFCgICAgICAgICAf4OEIAqEvwvsAwIHfwJ+IwBBIGsiAiQAIAFC////////P4MhCQJAAkAgAUIwiEL//wGDIgqnIgNB/4B/akH9AUsNACAJQhmIpyEEAkACQCAAUCABQv///w+DIglCgICACFQgCUKAgIAIURsNACAEQQFqIQQMAQsgACAJQoCAgAiFhEIAUg0AIARBAXEgBGohBAtBACAEIARB////A0siBRshBEGBgX9BgIF/IAUbIANqIQUMAQsCQCAAIAmEUA0AIApC//8BUg0AIAlCGYinQYCAgAJyIQRB/wEhBQwBCwJAIANB/oABTQ0AQf8BIQVBACEEDAELQQAhBEEAIQVBgP8AQYH/ACAKUCIGGyIHIANrIghB8ABKDQAgAkEQaiAAIAkgCUKAgICAgIDAAIQgBhsiCUGAASAIaxDDASACIAAgCSAIEM0BIAJBCGopAwAiAEIZiKchBAJAAkAgAikDACAHIANHIAIpAxAgAkEQakEIaikDAIRCAFJxrYQiCVAgAEL///8PgyIAQoCAgAhUIABCgICACFEbDQAgBEEBaiEEDAELIAkgAEKAgIAIhYRCAFINACAEQQFxIARqIQQLIARBgICABHMgBCAEQf///wNLIgUbIQQLIAJBIGokACAFQRd0IAFCIIinQYCAgIB4cXIgBHK+CwgAENQBQQBKCwUAEO0NCwUAEBEACwcAIAAQ7wMLEAAgABDWARogAEHQABC7DQsWACAAQaScBDYCACAAQQRqEIQFGiAACw8AIAAQ2AEaIABBIBC7DQsxACAAQaScBDYCACAAQQRqEOYJGiAAQRhqQgA3AgAgAEEQakIANwIAIABCADcCCCAACwIACwQAIAALCgAgAEJ/EN4BGgsSACAAIAE3AwggAEIANwMAIAALCgAgAEJ/EN4BGgsEAEEACwQAQQALwgEBBH8jAEEQayIDJABBACEEAkADQCACIARMDQECQAJAIAAoAgwiBSAAKAIQIgZPDQAgA0H/////BzYCDCADIAYgBWs2AgggAyACIARrNgIEIANBDGogA0EIaiADQQRqEOMBEOMBIQUgASAAKAIMIAUoAgAiBRDkARogACAFEOUBDAELIAAgACgCACgCKBEAACIFQX9GDQIgASAFEOYBOgAAQQEhBQsgASAFaiEBIAUgBGohBAwACwALIANBEGokACAECwkAIAAgARDnAQsOACABIAIgABDoARogAAsPACAAIAAoAgwgAWo2AgwLBQAgAMALKQECfyMAQRBrIgIkACACQQ9qIAEgABD5AiEDIAJBEGokACABIAAgAxsLDgAgACAAIAFqIAIQ+gILBQAQ6gELBABBfws1AQF/AkAgACAAKAIAKAIkEQAAEOoBRw0AEOoBDwsgACAAKAIMIgFBAWo2AgwgASwAABDsAQsIACAAQf8BcQsFABDqAQu9AQEFfyMAQRBrIgMkAEEAIQQQ6gEhBQJAA0AgAiAETA0BAkAgACgCGCIGIAAoAhwiB0kNACAAIAEsAAAQ7AEgACgC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KAIAKAIQEQ0ACwYAENUBAAspAQJ/IwBBEGsiAiQAIAJBD2ogASAAEOIDIQMgAkEQaiQAIAEgACADGwsdACAAIAEgAiADIAQgBSAGIAcgACgCACgCDBENAAsPACAAIAAoAgAoAhgRAAALFwAgACABIAIgAyAEIAAoAgAoAhQRCgALDQAgASgCACACKAIASAsrAQF/IwBBEGsiAyQAIANBCGogACABIAIQ+wIgAygCDCECIANBEGokACACCw0AIAAgASACIAMQ/AILDQAgACABIAIgAxD9AgtpAQF/IwBBIGsiBCQAIARBGGogASACEP4CIARBEGogBEEMaiAEKAIYIAQoAhwgAxD/AhCAAyAEIAEgBCgCEBCBAzYCDCAEIAMgBCgCFBCCAzYCCCAAIARBDGogBEEIahCDAyAEQSBqJAALCwAgACABIAIQhAMLBwAgABCGAwsNACAAIAIgAyAEEIUDCwkAIAAgARCIAwsJACAAIAEQiQMLDAAgACABIAIQhwMaCzgBAX8jAEEQayIDJAAgAyABEIoDNgIMIAMgAhCKAzYCCCAAIANBDGogA0EIahCLAxogA0EQaiQAC0MBAX8jAEEQayIEJAAgBCACNgIMIAMgASACIAFrIgIQjgMaIAQgAyACajYCCCAAIARBDGogBEEIahCPAyAEQRBqJAALBwAgABDZAgsYACAAIAEoAgA2AgAgACACKAIANgIEIAALCQAgACABEJEDCw0AIAAgASAAENkCa2oLBwAgABCMAwsYACAAIAEoAgA2AgAgACACKAIANgIEIAALBwAgABCNAwsEACAACxUAAkAgAkUNACAAIAEgAhBeGgsgAAsMACAAIAEgAhCQAxoLGAAgACABKAIANgIAIAAgAigCADYCBCAACwkAIAAgARCSAwsNACAAIAEgABCNA2tqCysBAX8jAEEQayIDJAAgA0EIaiAAIAEgAhCUAyADKAIMIQIgA0EQaiQAIAILDQAgACABIAIgAxCVAwsNACAAIAEgAiADEJYDC2kBAX8jAEEgayIEJAAgBEEYaiABIAIQlwMgBEEQaiAEQQxqIAQoAhggBCgCHCADEJgDEJkDIAQgASAEKAIQEJoDNgIMIAQgAyAEKAIUEJsDNgIIIAAgBEEMaiAEQQhqEJwDIARBIGokAAsLACAAIAEgAhCdAwsHACAAEJ8DCw0AIAAgAiADIAQQngMLCQAgACABEKEDCwkAIAAgARCiAwsMACAAIAEgAhCgAxoLOAEBfyMAQRBrIgMkACADIAEQowM2AgwgAyACEKMDNgIIIAAgA0EMaiADQQhqEKQDGiADQRBqJAALRgEBfyMAQRBrIgQkACAEIAI2AgwgAyABIAIgAWsiAkECdRCnAxogBCADIAJqNgIIIAAgBEEMaiAEQQhqEKgDIARBEGokAAsHACAAEKoDCxgAIAAgASgCADYCACAAIAIoAgA2AgQgAAsJACAAIAEQqwMLDQAgACABIAAQqgNragsHACAAEKUDCxgAIAAgASgCADYCACAAIAIoAgA2AgQgAAsHACAAEKYDCwQAIAALGAACQCACRQ0AIAAgASACQQJ0EF4aCyAACwwAIAAgASACEKkDGgsYACAAIAEoAgA2AgAgACACKAIANgIEIAALBAAgAAsJACAAIAEQrAMLDQAgACABIAAQpgNragsVACAAQgA3AgAgAEEIakEANgIAIAALBwAgABCvAwsHACAAELADCwQAIAALCgAgABDeAigCAAsKACAAEN4CELMDCwQAIAALBAAgAAsEACAACwsAIAAgASACELoDCwkAIAAgARC8AwsxAQF/IAAQ3gIiAiACLQALQYABcSABQf8AcXI6AAsgABDeAiIAIAAtAAtB/wBxOgALCwwAIAAgAS0AADoAAAsLACABIAJBARC9AwsHACAAEMMDCw4AIAEQ3wIaIAAQ3wIaCx4AAkAgAhC+A0UNACAAIAEgAhC/Aw8LIAAgARDAAwsHACAAQQhLCwsAIAAgASACEMEDCwkAIAAgARDCAwsLACAAIAEgAhDCDQsJACAAIAEQuw0LBAAgAAsHACAAEMUDCwQAIAALBAAgAAsEACAACwkAIAAgARDKAwu/AQECfyMAQRBrIgQkAAJAIAAQywMgA0kNAAJAAkAgAxDMA0UNACAAIAMQuAMgABCyAyEFDAELIARBCGogABDfAiADEM0DQQFqEM4DIAQoAggiBSAEKAIMEM8DIAAgBRDQAyAAIAQoAgwQ0QMgACADENIDCwJAA0AgASACRg0BIAUgARC5AyAFQQFqIQUgAUEBaiEBDAALAAsgBEEAOgAHIAUgBEEHahC5AyAAIAMQ1AIgBEEQaiQADwsgABDTAwALBwAgASAAawsZACAAEOICENQDIgAgABDVA0EBdkt2QXhqCwcAIABBC0kLLQEBf0EKIQECQCAAQQtJDQAgAEEBahDYAyIAIABBf2oiACAAQQtGGyEBCyABCxkAIAEgAhDXAyEBIAAgAjYCBCAAIAE2AgALAgALDAAgABDeAiABNgIACzoBAX8gABDeAiICIAIoAghBgICAgHhxIAFB/////wdxcjYCCCAAEN4CIgAgACgCCEGAgICAeHI2AggLDAAgABDeAiABNgIECwoAQfSDBBDWAwALBQAQ1QMLBQAQ2QMLBgAQ1QEACxoAAkAgABDUAyABTw0AENoDAAsgAUEBENsDCwoAIABBB2pBeHELBABBfwsGABDVAQALGgACQCABEL4DRQ0AIAAgARDcAw8LIAAQ3QMLCQAgACABEL0NCwcAIAAQtw0LGAACQCAAENwCRQ0AIAAQ3wMPCyAAEOADCwoAIAAQ5gIoAgALCgAgABDmAhDhAwsEACAACw0AIAEoAgAgAigCAEkLMQEBfwJAIAAoAgAiAUUNAAJAIAEQhAIQ6gEQhwINACAAKAIARQ8LIABBADYCAAtBAQsRACAAIAEgACgCACgCHBEBAAsxAQF/AkAgACgCACIBRQ0AAkAgARDDAhCrAhDFAg0AIAAoAgBFDwsgAEEANgIAC0EBCxEAIAAgASAAKAIAKAIsEQEACzEBAX8jAEEQayICJAAgACACQQ9qIAJBDmoQ6AMiACABIAEQ6QMQzA0gAkEQaiQAIAALCgAgABDGAxCuAwsHACAAEPMDC0ABAn8gACgCKCECA0ACQCACDQAPCyABIAAgACgCJCACQX9qIgJBAnQiA2ooAgAgACgCICADaigCABEGAAwACwALDQAgACABQRxqEOMJGgsJACAAIAEQ7gMLKAAgACAAKAIYRSABciIBNgIQAkAgACgCFCABcUUNAEG3ggQQ8QMACwspAQJ/IwBBEGsiAiQAIAJBD2ogACABEOIDIQMgAkEQaiQAIAEgACADGws9ACAAQYyjBDYCACAAQQAQ6gMgAEEcahCEBRogACgCIBC8ASAAKAIkELwBIAAoAjAQvAEgACgCPBC8ASAACw0AIAAQ7wNByAAQuw0LBgAQ1QEAC0AAIABBADYCFCAAIAE2AhggAEEANgIMIABCgqCAgOAANwIEIAAgAUU2AhAgAEEgakEAQSgQXxogAEEcahDmCRoLBwAgABCGAQsOACAAIAEoAgA2AgAgAAsEACAAC50BAQN/QX8hAgJAIABBf0YNAAJAAkAgASgCTEEATg0AQQEhAwwBCyABEGFFIQMLAkACQAJAIAEoAgQiBA0AIAEQaRogASgCBCIERQ0BCyAEIAEoAixBeGpLDQELIAMNASABEGJBfw8LIAEgBEF/aiICNgIEIAIgADoAACABIAEoAgBBb3E2AgACQCADDQAgARBiCyAAQf8BcSECCyACCwcAIAAQ+AMLWQEBfwJAAkAgACgCTCIBQQBIDQAgAUUNASABQf////8DcRB8KAIYRw0BCwJAIAAoAgQiASAAKAIIRg0AIAAgAUEBajYCBCABLQAADwsgABCJAQ8LIAAQ+QMLYgECfwJAIABBzABqIgEQ+gNFDQAgABBhGgsCQAJAIAAoAgQiAiAAKAIIRg0AIAAgAkEBajYCBCACLQAAIQAMAQsgABCJASEACwJAIAEQ+wNBgICAgARxRQ0AIAEQ/AMLIAALGwEBfyAAIAAoAgAiAUH/////AyABGzYCACABCxQBAX8gACgCACEBIABBADYCACABCwkAIABBARBzGgt9AQJ/AkACQCAAKAJMQQBODQBBASECDAELIAAQYUUhAgsCQAJAIAENACAAKAJIIQMMAQsCQCAAKAKIAQ0AIABBkKQEQfijBBB8KAJgKAIAGzYCiAELIAAoAkgiAw0AIABBf0EBIAFBAUgbIgM2AkgLAkAgAg0AIAAQYgsgAwvQAgECfwJAIAENAEEADwsCQAJAIAJFDQACQCABLQAAIgPAIgRBAEgNAAJAIABFDQAgACADNgIACyAEQQBHDwsCQBB8KAJgKAIADQBBASEBIABFDQIgACAEQf+/A3E2AgBBAQ8LIANBvn5qIgRBMksNACAEQQJ0QdCaBGooAgAhBAJAIAJBA0sNACAEIAJBBmxBemp0QQBIDQELIAEtAAEiA0EDdiICQXBqIAIgBEEadWpyQQdLDQACQCADQYB/aiAEQQZ0ciICQQBIDQBBAiEBIABFDQIgACACNgIAQQIPCyABLQACQYB/aiIEQT9LDQAgBCACQQZ0IgJyIQQCQCACQQBIDQBBAyEBIABFDQIgACAENgIAQQMPCyABLQADQYB/aiICQT9LDQBBBCEBIABFDQEgACACIARBBnRyNgIAQQQPCxBcQRk2AgBBfyEBCyABCz0BAn8QfCIBKAJgIQICQCAAKAJIQQBKDQAgAEEBEP0DGgsgASAAKAKIATYCYCAAEIAEIQAgASACNgJgIAALogIBBH8jAEEgayIBJAACQAJAAkAgACgCBCICIAAoAggiA0YNACABQRxqIAIgAyACaxD+AyICQX9GDQAgACAAKAIEIAJBASACQQFLG2o2AgQMAQsgAUIANwMQQQAhAgNAIAIhBAJAAkAgACgCBCICIAAoAghGDQAgACACQQFqNgIEIAEgAi0AADoADwwBCyABIAAQiQEiAjoADyACQX9KDQBBfyECIARBAXFFDQMgACAAKAIAQSByNgIAEFxBGTYCAAwDC0EBIQIgAUEcaiABQQ9qQQEgAUEQahCtASIDQX5GDQALQX8hAiADQX9HDQAgBEEBcUUNASAAIAAoAgBBIHI2AgAgAS0ADyAAEPYDGgwBCyABKAIcIQILIAFBIGokACACCzIBAn8CQCAAKAJMQX9KDQAgABD/Aw8LIAAQYSEBIAAQ/wMhAgJAIAFFDQAgABBiCyACCwcAIAAQgQQLjwIBB38jAEEQayICJAAQfCIDKAJgIQQCQAJAIAEoAkxBAE4NAEEBIQUMAQsgARBhRSEFCwJAIAEoAkhBAEoNACABQQEQ/QMaCyADIAEoAogBNgJgQQAhBgJAIAEoAgQNACABEGkaIAEoAgRFIQYLQX8hBwJAIABBf0YNACAGDQAgAkEMaiAAQQAQtgEiBkEASA0AIAEoAgQiCCABKAIsIAZqQXhqSQ0AAkACQCAAQf8ASw0AIAEgCEF/aiIHNgIEIAcgADoAAAwBCyABIAggBmsiBzYCBCAHIAJBDGogBhBdGgsgASABKAIAQW9xNgIAIAAhBwsCQCAFDQAgARBiCyADIAQ2AmAgAkEQaiQAIAcLkAEBA38jAEEQayICJAAgAiABOgAPAkACQCAAKAIQIgMNAEF/IQMgABBqDQEgACgCECEDCwJAIAAoAhQiBCADRg0AIAAoAlAgAUH/AXEiA0YNACAAIARBAWo2AhQgBCABOgAADAELQX8hAyAAIAJBD2pBASAAKAIkEQMAQQFHDQAgAi0ADyEDCyACQRBqJAAgAwv/AQEEfyMAQRBrIgIkABB8IgMoAmAhBAJAIAEoAkhBAEoNACABQQEQ/QMaCyADIAEoAogBNgJgAkACQAJAAkAgAEH/AEsNAAJAIAEoAlAgAEYNACABKAIUIgUgASgCEEYNACABIAVBAWo2AhQgBSAAOgAADAQLIAEgABCEBCEADAELAkAgASgCFCIFQQRqIAEoAhBPDQAgBSAAELcBIgVBAEgNAiABIAEoAhQgBWo2AhQMAQsgAkEMaiAAELcBIgVBAEgNASACQQxqIAUgARBrIAVJDQELIABBf0cNAQsgASABKAIAQSByNgIAQX8hAAsgAyAENgJgIAJBEGokACAACzYBAX8CQCABKAJMQX9KDQAgACABEIUEDwsgARBhIQIgACABEIUEIQACQCACRQ0AIAEQYgsgAAsKAEHIrwUQiAQaCy0AAkBBAC0ArbIFDQBBrLIFEIkEGkHEAEEAQYCABBBbGkEAQQE6AK2yBQsgAAuFAwEDf0HMrwVBACgCsKMEIgFBhLAFEIoEGkGgqgVBzK8FEIsEGkGMsAVBACgCgJQEIgJBvLAFEIwEGkHQqwVBjLAFEI0EGkHEsAVBACgCtKMEIgNB9LAFEIwEGkH4rAVBxLAFEI0EGkGgrgVBACgC+KwFQXRqKAIAQfisBWoQgAIQjQQaQQAoAqCqBUF0aigCAEGgqgVqQdCrBRCOBBpBACgC+KwFQXRqKAIAQfisBWoQjwQaQQAoAvisBUF0aigCAEH4rAVqQdCrBRCOBBpB/LAFIAFBtLEFEJAEGkH4qgVB/LAFEJEEGkG8sQUgAkHssQUQkgQaQaSsBUG8sQUQkwQaQfSxBSADQaSyBRCSBBpBzK0FQfSxBRCTBBpB9K4FQQAoAsytBUF0aigCAEHMrQVqEL8CEJMEGkEAKAL4qgVBdGooAgBB+KoFakGkrAUQlAQaQQAoAsytBUF0aigCAEHMrQVqEI8EGkEAKALMrQVBdGooAgBBzK0FakGkrAUQlAQaIAALagEBfyMAQRBrIgMkACAAENoBIgAgAjYCKCAAIAE2AiAgAEGwpAQ2AgAQ6gEhAiAAQQA6ADQgACACNgIwIANBDGogABDXAiAAIANBDGogACgCACgCCBECACADQQxqEIQFGiADQRBqJAAgAAs+AQF/IABBCGoQlQQhAiAAQdycBEEMajYCACACQdycBEEgajYCACAAQQA2AgQgAEEAKALcnARqIAEQlgQgAAtgAQF/IwBBEGsiAyQAIAAQ2gEiACABNgIgIABBlKUENgIAIANBDGogABDXAiADQQxqEPACIQEgA0EMahCEBRogACACNgIoIAAgATYCJCAAIAEQ8QI6ACwgA0EQaiQAIAALNwEBfyAAQQRqEJUEIQIgAEGMnQRBDGo2AgAgAkGMnQRBIGo2AgAgAEEAKAKMnQRqIAEQlgQgAAsUAQF/IAAoAkghAiAAIAE2AkggAgsOACAAQYDAABCXBBogAAtqAQF/IwBBEGsiAyQAIAAQngIiACACNgIoIAAgATYCICAAQfylBDYCABCrAiECIABBADoANCAAIAI2AjAgA0EMaiAAEJgEIAAgA0EMaiAAKAIAKAIIEQIAIANBDGoQhAUaIANBEGokACAACz4BAX8gAEEIahCZBCECIABB/J0EQQxqNgIAIAJB/J0EQSBqNgIAIABBADYCBCAAQQAoAvydBGogARCaBCAAC2ABAX8jAEEQayIDJAAgABCeAiIAIAE2AiAgAEHgpgQ2AgAgA0EMaiAAEJgEIANBDGoQmwQhASADQQxqEIQFGiAAIAI2AiggACABNgIkIAAgARCcBDoALCADQRBqJAAgAAs3AQF/IABBBGoQmQQhAiAAQayeBEEMajYCACACQayeBEEgajYCACAAQQAoAqyeBGogARCaBCAACxQBAX8gACgCSCECIAAgATYCSCACCxUAIAAQqgQiAEHcngRBCGo2AgAgAAsYACAAIAEQ8gMgAEEANgJIIAAQ6gE2AkwLFQEBfyAAIAAoAgQiAiABcjYCBCACCw0AIAAgAUEEahDjCRoLFQAgABCqBCIAQfCgBEEIajYCACAACxgAIAAgARDyAyAAQQA2AkggABCrAjYCTAsLACAAQZC3BRCJBQsPACAAIAAoAgAoAhwRAAALJABB0KsFEPcBGkGgrgUQ9wEaQaSsBRC4AhpB9K4FELgCGiAACwoAQayyBRCdBBoLDAAgABDYAUE4ELsNCzoAIAAgARDwAiIBNgIkIAAgARD3AjYCLCAAIAAoAiQQ8QI6ADUCQCAAKAIsQQlIDQBBioEEEMQNAAsLCQAgAEEAEKIEC+MDAgV/AX4jAEEgayICJAACQAJAIAAtADRBAUcNACAAKAIwIQMgAUUNARDqASEEIABBADoANCAAIAQ2AjAMAQsCQAJAIAAtADVBAUcNACAAKAIgIAJBGGoQpgRFDQEgAiwAGBDsASEDAkACQCABDQAgAyAAKAIgIAIsABgQpQRFDQMMAQsgACADNgIwCyACLAAYEOwBIQMMAgsgAkEBNgIYQQAhAyACQRhqIABBLGoQpwQoAgAiBUEAIAVBAEobIQYCQANAIAMgBkYNASAAKAIgEPcDIgRBf0YNAiACQRhqIANqIAQ6AAAgA0EBaiEDDAALAAsgAkEXakEBaiEGAkACQANAIAAoAigiAykCACEHAkAgACgCJCADIAJBGGogAkEYaiAFaiIEIAJBEGogAkEXaiAGIAJBDGoQ8wJBf2oOAwAEAgMLIAAoAiggBzcCACAFQQhGDQMgACgCIBD3AyIDQX9GDQMgBCADOgAAIAVBAWohBQwACwALIAIgAi0AGDoAFwsCQAJAIAENAANAIAVBAUgNAiACQRhqIAVBf2oiBWosAAAQ7AEgACgCIBD2A0F/Rg0DDAALAAsgACACLAAXEOwBNgIwCyACLAAXEOwBIQMMAQsQ6gEhAwsgAkEgaiQAIAMLCQAgAEEBEKIEC74CAQJ/IwBBIGsiAiQAAkACQCABEOoBEIcCRQ0AIAAtADQNASAAIAAoAjAiARDqARCHAkEBczoANAwBCyAALQA0IQMCQAJAAkACQCAALQA1DQAgA0EBcQ0BDAMLAkAgA0EBcSIDRQ0AIAAoAjAhAyADIAAoAiAgAxDmARClBA0DDAILIANFDQILIAIgACgCMBDmAToAEwJAAkAgACgCJCAAKAIoIAJBE2ogAkETakEBaiACQQxqIAJBGGogAkEgaiACQRRqEPYCQX9qDgMCAgABCyAAKAIwIQMgAiACQRhqQQFqNgIUIAIgAzoAGAsDQCACKAIUIgMgAkEYak0NAiACIANBf2oiAzYCFCADLAAAIAAoAiAQ9gNBf0cNAAsLEOoBIQEMAQsgAEEBOgA0IAAgATYCMAsgAkEgaiQAIAELDAAgACABEPYDQX9HCx0AAkAgABD3AyIAQX9GDQAgASAAOgAACyAAQX9HCwkAIAAgARCoBAspAQJ/IwBBEGsiAiQAIAJBD2ogACABEKkEIQMgAkEQaiQAIAEgACADGwsNACABKAIAIAIoAgBICxAAIABBhKMEQQhqNgIAIAALDAAgABDYAUEwELsNCyYAIAAgACgCACgCGBEAABogACABEPACIgE2AiQgACABEPECOgAsC30BBX8jAEEQayIBJAAgAUEQaiECAkADQCAAKAIkIAAoAiggAUEIaiACIAFBBGoQ+AIhA0F/IQQgAUEIakEBIAEoAgQgAUEIamsiBSAAKAIgEGwgBUcNAQJAIANBf2oOAgECAAsLQX9BACAAKAIgEGMbIQQLIAFBEGokACAEC24BAX8CQAJAIAAtACwNAEEAIQMgAkEAIAJBAEobIQIDQCADIAJGDQICQCAAIAEsAAAQ7AEgACgCACgCNBEBABDqAUcNACADDwsgAUEBaiEBIANBAWohAwwACwALIAFBASACIAAoAiAQbCECCyACC4UCAQV/IwBBIGsiAiQAAkACQAJAIAEQ6gEQhwINACACIAEQ5gEiAzoAFwJAIAAtACxBAUcNACADIAAoAiAQsARFDQIMAQsgAiACQRhqNgIQIAJBIGohBCACQRdqQQFqIQUgAkEXaiEGA0AgACgCJCAAKAIoIAYgBSACQQxqIAJBGGogBCACQRBqEPYCIQMgAigCDCAGRg0CAkAgA0EDRw0AIAZBAUEBIAAoAiAQbEEBRg0CDAMLIANBAUsNAiACQRhqQQEgAigCECACQRhqayIGIAAoAiAQbCAGRw0CIAIoAgwhBiADQQFGDQALCyABEOwCIQAMAQsQ6gEhAAsgAkEgaiQAIAALLwEBfyMAQRBrIgIkACACIAA6AA8gAkEPakEBQQEgARBsIQAgAkEQaiQAIABBAUYLDAAgABCcAkE4ELsNCzoAIAAgARCbBCIBNgIkIAAgARCzBDYCLCAAIAAoAiQQnAQ6ADUCQCAAKAIsQQlIDQBBioEEEMQNAAsLDwAgACAAKAIAKAIYEQAACwkAIABBABC1BAvgAwIFfwF+IwBBIGsiAiQAAkACQCAALQA0QQFHDQAgACgCMCEDIAFFDQEQqwIhBCAAQQA6ADQgACAENgIwDAELAkACQCAALQA1QQFHDQAgACgCICACQRhqELoERQ0BIAIoAhgQrQIhAwJAAkAgAQ0AIAMgACgCICACKAIYELgERQ0DDAELIAAgAzYCMAsgAigCGBCtAiEDDAILIAJBATYCGEEAIQMgAkEYaiAAQSxqEKcEKAIAIgVBACAFQQBKGyEGAkADQCADIAZGDQEgACgCIBD3AyIEQX9GDQIgAkEYaiADaiAEOgAAIANBAWohAwwACwALIAJBGGohBgJAAkADQCAAKAIoIgMpAgAhBwJAIAAoAiQgAyACQRhqIAJBGGogBWoiBCACQRBqIAJBFGogBiACQQxqELsEQX9qDgMABAIDCyAAKAIoIAc3AgAgBUEIRg0DIAAoAiAQ9wMiA0F/Rg0DIAQgAzoAACAFQQFqIQUMAAsACyACIAIsABg2AhQLAkACQCABDQADQCAFQQFIDQIgAkEYaiAFQX9qIgVqLAAAEK0CIAAoAiAQ9gNBf0YNAwwACwALIAAgAigCFBCtAjYCMAsgAigCFBCtAiEDDAELEKsCIQMLIAJBIGokACADCwkAIABBARC1BAu4AgECfyMAQSBrIgIkAAJAAkAgARCrAhDFAkUNACAALQA0DQEgACAAKAIwIgEQqwIQxQJBAXM6ADQMAQsgAC0ANCEDAkACQAJAAkAgAC0ANQ0AIANBAXENAQwDCwJAIANBAXEiA0UNACAAKAIwIQMgAyAAKAIgIAMQqAIQuAQNAwwCCyADRQ0CCyACIAAoAjAQqAI2AhACQAJAIAAoAiQgACgCKCACQRBqIAJBFGogAkEMaiACQRhqIAJBIGogAkEUahC5BEF/ag4DAgIAAQsgACgCMCEDIAIgAkEZajYCFCACIAM6ABgLA0AgAigCFCIDIAJBGGpNDQIgAiADQX9qIgM2AhQgAywAACAAKAIgEPYDQX9HDQALCxCrAiEBDAELIABBAToANCAAIAE2AjALIAJBIGokACABCwwAIAAgARCDBEF/RwsdACAAIAEgAiADIAQgBSAGIAcgACgCACgCDBENAAsdAAJAIAAQggQiAEF/Rg0AIAEgADYCAAsgAEF/RwsdACAAIAEgAiADIAQgBSAGIAcgACgCACgCEBENAAsMACAAEJwCQTAQuw0LJgAgACAAKAIAKAIYEQAAGiAAIAEQmwQiATYCJCAAIAEQnAQ6ACwLfQEFfyMAQRBrIgEkACABQRBqIQICQANAIAAoAiQgACgCKCABQQhqIAIgAUEEahC/BCEDQX8hBCABQQhqQQEgASgCBCABQQhqayIFIAAoAiAQbCAFRw0BAkAgA0F/ag4CAQIACwtBf0EAIAAoAiAQYxshBAsgAUEQaiQAIAQLFwAgACABIAIgAyAEIAAoAgAoAhQRCgALbgEBfwJAAkAgAC0ALA0AQQAhAyACQQAgAkEAShshAgNAIAMgAkYNAgJAIAAgASgCABCtAiAAKAIAKAI0EQEAEKsCRw0AIAMPCyABQQRqIQEgA0EBaiEDDAALAAsgAUEEIAIgACgCIBBsIQILIAILggIBBX8jAEEgayICJAACQAJAAkAgARCrAhDFAg0AIAIgARCoAiIDNgIUAkAgAC0ALEEBRw0AIAMgACgCIBDCBEUNAgwBCyACIAJBGGo2AhAgAkEgaiEEIAJBGGohBSACQRRqIQYDQCAAKAIkIAAoAiggBiAFIAJBDGogAkEYaiAEIAJBEGoQuQQhAyACKAIMIAZGDQICQCADQQNHDQAgBkEBQQEgACgCIBBsQQFGDQIMAwsgA0EBSw0CIAJBGGpBASACKAIQIAJBGGprIgYgACgCIBBsIAZHDQIgAigCDCEGIANBAUYNAAsLIAEQwwQhAAwBCxCrAiEACyACQSBqJAAgAAsMACAAIAEQhgRBf0cLGgACQCAAEKsCEMUCRQ0AEKsCQX9zIQALIAALBQAQhwQL/wIBA38CQCABLQAADQACQEHRhQQQbSIBRQ0AIAEtAAANAQsCQCAAQQxsQcCnBGoQbSIBRQ0AIAEtAAANAQsCQEHehQQQbSIBRQ0AIAEtAAANAQtBl4sEIQELQQAhAgJAAkADQCABIAJqLQAAIgNFDQEgA0EvRg0BQRchAyACQQFqIgJBF0cNAAwCCwALIAIhAwtBl4sEIQQCQAJAAkACQAJAIAEtAAAiAkEuRg0AIAEgA2otAAANACABIQQgAkHDAEcNAQsgBC0AAUUNAQsgBEGXiwQQhAFFDQAgBEGyhQQQhAENAQsCQCAADQBB1KMEIQIgBC0AAUEuRg0CC0EADwsCQEEAKAK0sgUiAkUNAANAIAQgAkEIahCEAUUNAiACKAIgIgINAAsLAkBBJBC6ASICRQ0AIAJBACkC1KMENwIAIAJBCGoiASAEIAMQXRogASADakEAOgAAIAJBACgCtLIFNgIgQQAgAjYCtLIFCyACQdSjBCAAIAJyGyECCyACCycAIABB0LIFRyAAQbiyBUcgAEGQpARHIABBAEcgAEH4owRHcXFxcQsbAEGwsgUQeCAAIAEgAhDIBCECQbCyBRB5IAIL7AIBA38jAEEgayIDJABBACEEAkACQANAQQEgBHQgAHEhBQJAAkAgAkUNACAFDQAgAiAEQQJ0aigCACEFDAELIAQgAUHEjAQgBRsQxQQhBQsgA0EIaiAEQQJ0aiAFNgIAIAVBf0YNASAEQQFqIgRBBkcNAAsCQCACEMYEDQBB+KMEIQIgA0EIakH4owRBGBByRQ0CQZCkBCECIANBCGpBkKQEQRgQckUNAkEAIQQCQEEALQDosgUNAANAIARBAnRBuLIFaiAEQcSMBBDFBDYCACAEQQFqIgRBBkcNAAtBAEEBOgDosgVBAEEAKAK4sgU2AtCyBQtBuLIFIQIgA0EIakG4sgVBGBByRQ0CQdCyBSECIANBCGpB0LIFQRgQckUNAkEYELoBIgJFDQELIAIgAykCCDcCACACQRBqIANBCGpBEGopAgA3AgAgAkEIaiADQQhqQQhqKQIANwIADAELQQAhAgsgA0EgaiQAIAILEwAgAEEgciAAIABBv39qQRpJGwsXACAAQVBqQQpJIABBIHJBn39qQQZJcgsHACAAEMoECwoAIABBUGpBCkkLBwAgABDMBAvYAgIEfwJ+AkAgAEJ+fEKIAVYNACAApyICQbx/akECdSEDAkACQAJAIAJBA3ENACADQX9qIQNBASEEIAENAQwCC0EAIQQgAUUNAQsgASAENgIACyACQYDnhA9sIANBgKMFbGpBgNav4wdqrA8LIABCnH98IgAgAEKQA38iBkKQA359IgdCP4enIAanaiEDAkACQAJAAkACQCAHpyICQZADaiACIAdCAFMbIgINAEEBIQJBACEEDAELAkACQCACQcgBSA0AAkAgAkGsAkkNACACQdR9aiECQQMhBAwCCyACQbh+aiECQQIhBAwBCyACQZx/aiACIAJB4wBKIgQbIQILIAINAUEAIQILQQAhBSABDQEMAgsgAkECdiEFIAJBA3FFIQIgAUUNAQsgASACNgIACyAAQoDnhA9+IAUgBEEYbCADQeEAbGpqIAJrrEKAowV+fEKAqrrDA3wLJQEBfyAAQQJ0QZCoBGooAgAiAkGAowVqIAIgARsgAiAAQQFKGwusAQIEfwR+IwBBEGsiASQAIAA0AhQhBQJAIAAoAhAiAkEMSQ0AIAIgAkEMbSIDQQxsayIEQQxqIAQgBEEASBshAiADIARBH3VqrCAFfCEFCyAFIAFBDGoQzgQhBSACIAEoAgwQzwQhAiAAKAIMIQQgADQCCCEGIAA0AgQhByAANAIAIQggAUEQaiQAIAggBSACrHwgBEF/aqxCgKMFfnwgBkKQHH58IAdCPH58fAtfAAJAQQAtAJizBUEBcQ0AQYCzBRB0GgJAQQAtAJizBUEBcQ0AQeyyBUHwsgVBoLMFQcCzBRASQQBBwLMFNgL4sgVBAEGgswU2AvSyBUEAQQE6AJizBQtBgLMFEHUaCwtOAQF/IAAoAighAEH8sgUQeEHAqAQhARDRBAJAIABBwKgERg0AIAAgAEHEjAQgAEEAKAL4sgVGGyAAQQAoAvSyBUYbIQELQfyyBRB5IAEL0wEBA38CQCAAQQ5HDQBBmYsEQdiFBCABKAIAGw8LIABBEHUhAgJAIABB//8DcSIDQf//A0cNACACQQVKDQAgASACQQJ0aigCACIAQQhqQeeFBCAAGw8LQcSMBCEEAkACQAJAAkACQCACQX9qDgUAAQQEAgQLQcSoBCEAIANBAU0NAgwDC0HQqAQhACADQTFNDQEMAgtBkKsEIQAgA0EDSw0BCwJAIAMNACAADwsDQCAALQAAIQEgAEEBaiIEIQAgAQ0AIAQhACADQX9qIgMNAAsLIAQLDQAgACABIAJCfxDVBAu8BAIHfwR+IwBBEGsiBCQAAkACQAJAAkAgAkEkSg0AQQAhBSAALQAAIgYNASAAIQcMAgsQXEEcNgIAQgAhAwwCCyAAIQcCQANAIAbAENYERQ0BIActAAEhBiAHQQFqIgghByAGDQALIAghBwwBCwJAIAZB/wFxIgZBVWoOAwABAAELQX9BACAGQS1GGyEFIAdBAWohBwsCQAJAIAJBEHJBEEcNACAHLQAAQTBHDQBBASEJAkAgBy0AAUHfAXFB2ABHDQAgB0ECaiEHQRAhCgwCCyAHQQFqIQcgAkEIIAIbIQoMAQsgAkEKIAIbIQpBACEJCyAKrSELQQAhAkIAIQwCQANAAkAgBy0AACIIQVBqIgZB/wFxQQpJDQACQCAIQZ9/akH/AXFBGUsNACAIQal/aiEGDAELIAhBv39qQf8BcUEZSw0CIAhBSWohBgsgCiAGQf8BcUwNASAEIAtCACAMQgAQzwFBASEIAkAgBCkDCEIAUg0AIAwgC34iDSAGrUL/AYMiDkJ/hVYNACANIA58IQxBASEJIAIhCAsgB0EBaiEHIAghAgwACwALAkAgAUUNACABIAcgACAJGzYCAAsCQAJAAkAgAkUNABBcQcQANgIAIAVBACADQgGDIgtQGyEFIAMhDAwBCyAMIANUDQEgA0IBgyELCwJAIAunDQAgBQ0AEFxBxAA2AgAgA0J/fCEDDAILIAwgA1gNABBcQcQANgIADAELIAwgBawiC4UgC30hAwsgBEEQaiQAIAMLEAAgAEEgRiAAQXdqQQVJcgsWACAAIAEgAkKAgICAgICAgIB/ENUECxIAIAAgASACQv////8PENUEpwuJCgIFfwJ+IwBB0ABrIgYkAEHcgAQhB0EwIQhBqIAIIQlBACEKAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAkFbag5WICoqKioqKioqKioqKioqKioqKioqKioqKioqKgEDBCcqBwgJCioqKg0qKioqDxETFRcWGx0fKioqKioqAAImBgUqCAIqCyoqDA4qIiolEBIUKhgaHB4qC0GhiwQhCiADKAIYIgBBBksNIyAAQYCACHIhCgwiC0GhiwQhCiADKAIYIgBBBksNIiAAQYeACGohCgwhC0GhiwQhCiADKAIQIgBBC0sNISAAQY6ACGohCgwgC0GhiwQhCiADKAIQIgBBC0sNICAAQZqACGohCgwfCyADNAIUQuwOfELkAH8hCwwjC0HfACEICyADNAIMIQtBAiEKDCILQYyFBCEHDB8LIAM0AhQiDELsDnwhCwJAAkAgAygCHCIKQQJKDQAgCyAMQusOfCADENoEQQFGGyELDAELIApB6QJJDQAgDELtDnwgCyADENoEQQFGGyELC0EwIQhBBCEKIAJB5wBHDSAgC0LkAIEhC0ECIQoMIAsgAzQCCCELDB4LQTAhCEECIQogAygCCCIDDRZCDCELDB4LIAMoAhxBAWqsIQtBMCEIQQMhCgwdCyADKAIQQQFqrCELDBsLIAM0AgQhCwwaCyABQQE2AgBBwYwEIQoMGwtBy4UEIQcMFwsgAxDQBCADNAIkfSELDAgLIAM0AgAhCwwWCyABQQE2AgBBw4wEIQoMFwtBuIUEIQcMEwsgAygCGCIKQQcgChusIQsMBAsgAygCHCADKAIYa0EHakEHbq0hCwwSCyADKAIcIAMoAhhBBmpBB3BrQQdqQQdurSELDBELIAMQ2gStIQsMEAsgAzQCGCELC0EwIQhBASEKDA8LQamACCEJDAsLQaqACCEJDAoLIAM0AhRC7A58QuQAgSILIAtCP4ciC4UgC30hCwwLCyADNAIUIgxC7A58IQsCQCAMQqQ/WQ0AQTAhCEEEIQoMDAsgBiALNwMwIAEgAEHkAEHhhAQgBkEwahB/NgIAIAAhCgwMCwJAIAMoAiBBf0oNACABQQA2AgBBxIwEIQoMDAsgBiADKAIkIgpBkBxtIgNB5ABsIAogA0GQHGxrwUE8bcFqNgJAIAEgAEHkAEHnhAQgBkHAAGoQfzYCACAAIQoMCwsCQCADKAIgQX9KDQAgAUEANgIAQcSMBCEKDAsLIAMQ0gQhCgwECyABQQE2AgBBqosEIQoMCQsgA6wiC0J0fCALIANBDEobIQsMBwtBp4AIQaaACCADKAIIQQtKGyEKCyAKIAQQ0wQhCgsgASAKEIYBNgIADAULQauACCEJCyAJIAQQ0wQhBwsgASAAQeQAIAcgAyAEENsEIgo2AgAgAEEAIAobIQoMAgtBMCEIQQIhCgsCQAJAIAUgCCAFGyIDQd8ARg0AIANBLUcNASAGIAs3AxAgASAAQeQAQeKEBCAGQRBqEH82AgAgACEKDAILIAYgCzcDKCAGIAo2AiAgASAAQeQAQduEBCAGQSBqEH82AgAgACEKDAELIAYgCzcDCCAGIAo2AgAgASAAQeQAQdSEBCAGEH82AgAgACEKCyAGQdAAaiQAIAoLoAEBA39BNSEBAkACQCAAKAIcIgIgACgCGCIDQQZqQQdwa0EHakEHbiADIAJrIgNB8QJqQQdwQQNJaiICQTVGDQAgAiEBIAINAUE0IQECQAJAIANBBmpBB3BBfGoOAgEAAwsgACgCFEGQA29Bf2oQ3ARFDQILQTUPCwJAAkAgA0HzAmpBB3BBfWoOAgACAQsgACgCFBDcBA0BC0EBIQELIAELgQYBCX8jAEGAAWsiBSQAAkACQCABRQ0AQQAhBgJAAkADQAJAAkAgAi0AACIHQSVGDQACQCAHDQAgBiEHDAULIAAgBmogBzoAACAGQQFqIQYMAQtBACEIQQEhCQJAAkACQCACLQABIgdBU2oOBAECAgEACyAHQd8ARw0BCyAHIQggAi0AAiEHQQIhCQsCQAJAIAIgCWogB0H/AXEiCkErRmoiCywAAEFQakEJSw0AIAsgBUEMakEKENgEIQIgBSgCDCEJDAELIAUgCzYCDEEAIQIgCyEJC0EAIQwCQCAJLQAAIgdBvX9qIg1BFksNAEEBIA10QZmAgAJxRQ0AIAIhDCACDQAgCSALRyEMCwJAAkAgB0HPAEYNACAHQcUARg0AIAkhAgwBCyAJQQFqIQIgCS0AASEHCyAFQRBqIAVB/ABqIAfAIAMgBCAIENkEIgtFDQICQAJAIAwNACAFKAJ8IQgMAQsCQAJAAkAgCy0AACIHQVVqDgMBAAEACyAFKAJ8IQgMAQsgBSgCfEF/aiEIIAstAAEhByALQQFqIQsLAkAgB0H/AXFBMEcNAANAIAssAAEiB0FQakEJSw0BIAtBAWohCyAIQX9qIQggB0EwRg0ACwsgBSAINgJ8QQAhBwNAIAciCUEBaiEHIAsgCWosAABBUGpBCkkNAAsgDCAIIAwgCEsbIQdBLSEMAkACQCADKAIUQZRxSA0AIApBK0cNAUErIQwgByAIayAJakEDQQUgBSgCDC0AAEHDAEYbSQ0BCyAAIAZqIAw6AAAgB0F/aiEHIAZBAWohBgsgByAITQ0AIAYgAU8NAANAIAAgBmpBMDoAACAGQQFqIQYgB0F/aiIHIAhNDQEgBiABSQ0ACwsgBSAIIAEgBmsiByAIIAdJGyIHNgJ8IAAgBmogCyAHEF0aIAUoAnwgBmohBgsgAkEBaiECIAYgAUkNAAsgAUUNAgsgAUF/aiAGIAYgAUYbIQZBACEHCyAAIAZqQQA6AAAMAQtBACEHCyAFQYABaiQAIAcLQQEBf0EAIQECQCAAQbBwaiAAIABBk/H//wdKGyIAQQNxDQBBASEBIABB7A5qIgBB5ABvDQAgAEGQA29FIQELIAELYwEDfyMAQRBrIgMkACADIAI2AgwgAyACNgIIQX8hBAJAQQBBACABIAIQqQEiAkEASA0AIAAgAkEBaiIFELoBIgI2AgAgAkUNACACIAUgASADKAIMEKkBIQQLIANBEGokACAEC20AQdSzBRDfBBoCQANAIAAoAgBBAUcNAUHsswVB1LMFEOAEGgwACwALAkAgACgCAA0AIAAQ4QRB1LMFEOIEGiABIAIRBABB1LMFEN8EGiAAEOMEQdSzBRDiBBpB7LMFEOQEGg8LQdSzBRDiBBoLBgAgABB0CwgAIAAgARB2CwkAIABBATYCAAsGACAAEHULCQAgAEF/NgIACwYAIAAQdwsSAAJAIAAQxgRFDQAgABC8AQsLIwECfyAAIQEDQCABIgJBBGohASACKAIADQALIAIgAGtBAnULBgBBpKsECwYAQbC3BAvUAQEEfyMAQRBrIgUkAEEAIQYCQCABKAIAIgdFDQAgAkUNACADQQAgABshCEEAIQYDQAJAIAVBDGogACAIQQRJGyAHKAIAQQAQtgEiA0F/Rw0AQX8hBgwCCwJAAkAgAA0AQQAhAAwBCwJAIAhBA0sNACAIIANJDQMgACAFQQxqIAMQXRoLIAggA2shCCAAIANqIQALAkAgBygCAA0AQQAhBwwCCyADIAZqIQYgB0EEaiEHIAJBf2oiAg0ACwsCQCAARQ0AIAEgBzYCAAsgBUEQaiQAIAYLgAkBBn8gASgCACEEAkACQAJAAkACQAJAAkACQAJAAkACQAJAIANFDQAgAygCACIFRQ0AAkAgAA0AIAIhAwwDCyADQQA2AgAgAiEDDAELAkACQBB8KAJgKAIADQAgAEUNASACRQ0MIAIhBQJAA0AgBCwAACIDRQ0BIAAgA0H/vwNxNgIAIABBBGohACAEQQFqIQQgBUF/aiIFDQAMDgsACyAAQQA2AgAgAUEANgIAIAIgBWsPCyACIQMgAEUNAyACIQNBACEGDAULIAQQhgEPC0EBIQYMAwtBACEGDAELQQEhBgsDQAJAAkAgBg4CAAEBCyAELQAAQQN2IgZBcGogBUEadSAGanJBB0sNAyAEQQFqIQYCQAJAIAVBgICAEHENACAGIQQMAQsCQCAGLQAAQcABcUGAAUYNACAEQX9qIQQMBwsgBEECaiEGAkAgBUGAgCBxDQAgBiEEDAELAkAgBi0AAEHAAXFBgAFGDQAgBEF/aiEEDAcLIARBA2ohBAsgA0F/aiEDQQEhBgwBCwNAIAQtAAAhBQJAIARBA3ENACAFQX9qQf4ASw0AIAQoAgAiBUH//ft3aiAFckGAgYKEeHENAANAIANBfGohAyAEKAIEIQUgBEEEaiIGIQQgBSAFQf/9+3dqckGAgYKEeHFFDQALIAYhBAsCQCAFQf8BcSIGQX9qQf4ASw0AIANBf2ohAyAEQQFqIQQMAQsLIAZBvn5qIgZBMksNAyAEQQFqIQQgBkECdEHQmgRqKAIAIQVBACEGDAALAAsDQAJAAkAgBg4CAAEBCyADRQ0HAkADQAJAAkACQCAELQAAIgZBf2oiB0H+AE0NACAGIQUMAQsgA0EFSQ0BIARBA3ENAQJAA0AgBCgCACIFQf/9+3dqIAVyQYCBgoR4cQ0BIAAgBUH/AXE2AgAgACAELQABNgIEIAAgBC0AAjYCCCAAIAQtAAM2AgwgAEEQaiEAIARBBGohBCADQXxqIgNBBEsNAAsgBC0AACEFCyAFQf8BcSIGQX9qIQcLIAdB/gBLDQILIAAgBjYCACAAQQRqIQAgBEEBaiEEIANBf2oiA0UNCQwACwALIAZBvn5qIgZBMksNAyAEQQFqIQQgBkECdEHQmgRqKAIAIQVBASEGDAELIAQtAAAiB0EDdiIGQXBqIAYgBUEadWpyQQdLDQEgBEEBaiEIAkACQAJAAkAgB0GAf2ogBUEGdHIiBkF/TA0AIAghBAwBCyAILQAAQYB/aiIHQT9LDQEgBEECaiEIIAcgBkEGdCIJciEGAkAgCUF/TA0AIAghBAwBCyAILQAAQYB/aiIHQT9LDQEgBEEDaiEEIAcgBkEGdHIhBgsgACAGNgIAIANBf2ohAyAAQQRqIQAMAQsQXEEZNgIAIARBf2ohBAwFC0EAIQYMAAsACyAEQX9qIQQgBQ0BIAQtAAAhBQsgBUH/AXENAAJAIABFDQAgAEEANgIAIAFBADYCAAsgAiADaw8LEFxBGTYCACAARQ0BCyABIAQ2AgALQX8PCyABIAQ2AgAgAguUAwEHfyMAQZAIayIFJAAgBSABKAIAIgY2AgwgA0GAAiAAGyEDIAAgBUEQaiAAGyEHQQAhCAJAAkACQAJAIAZFDQAgA0UNAANAIAJBAnYhCQJAIAJBgwFLDQAgCSADTw0AIAYhCQwECyAHIAVBDGogCSADIAkgA0kbIAQQ6gQhCiAFKAIMIQkCQCAKQX9HDQBBACEDQX8hCAwDCyADQQAgCiAHIAVBEGpGGyILayEDIAcgC0ECdGohByACIAZqIAlrQQAgCRshAiAKIAhqIQggCUUNAiAJIQYgAw0ADAILAAsgBiEJCyAJRQ0BCyADRQ0AIAJFDQAgCCEKA0ACQAJAAkAgByAJIAIgBBCtASIIQQJqQQJLDQACQAJAIAhBAWoOAgYAAQsgBUEANgIMDAILIARBADYCAAwBCyAFIAUoAgwgCGoiCTYCDCAKQQFqIQogA0F/aiIDDQELIAohCAwCCyAHQQRqIQcgAiAIayECIAohCCACDQALCwJAIABFDQAgASAFKAIMNgIACyAFQZAIaiQAIAgLDwBBBEEBEHwoAmAoAgAbCxQAQQAgACABIAJBnLQFIAIbEK0BCzIBAn8QfCIBKAJgIQICQCAARQ0AIAFB7JQFIAAgAEF/Rhs2AmALQX8gAiACQeyUBUYbCy8AAkAgAkUNAANAAkAgACgCACABRw0AIAAPCyAAQQRqIQAgAkF/aiICDQALC0EACwkAIAAgARCWAQsJACAAIAEQmAELOgIBfwF+IwBBEGsiBCQAIAQgASACEJkBIAQpAwAhBSAAIARBCGopAwA3AwggACAFNwMAIARBEGokAAsHACAAEPQECwcAIAAQtA0LDwAgABDzBBogAEEIELsNC2EBBH8gASAEIANraiEFAkACQANAIAMgBEYNAUF/IQYgASACRg0CIAEsAAAiByADLAAAIghIDQICQCAIIAdODQBBAQ8LIANBAWohAyABQQFqIQEMAAsACyAFIAJHIQYLIAYLDAAgACACIAMQ+AQaCy4BAX8jAEEQayIDJAAgACADQQ9qIANBDmoQ6AMiACABIAIQ+QQgA0EQaiQAIAALEgAgACABIAIgASACEJYLEJcLC0IBAn9BACEDA38CQCABIAJHDQAgAw8LIANBBHQgASwAAGoiA0GAgICAf3EiBEEYdiAEciADcyEDIAFBAWohAQwACwsHACAAEPQECw8AIAAQ+wQaIABBCBC7DQtXAQN/AkACQANAIAMgBEYNAUF/IQUgASACRg0CIAEoAgAiBiADKAIAIgdIDQICQCAHIAZODQBBAQ8LIANBBGohAyABQQRqIQEMAAsACyABIAJHIQULIAULDAAgACACIAMQ/wQaCy4BAX8jAEEQayIDJAAgACADQQ9qIANBDmoQgAUiACABIAIQgQUgA0EQaiQAIAALCgAgABCZCxCaCwsSACAAIAEgAiABIAIQmwsQnAsLQgECf0EAIQMDfwJAIAEgAkcNACADDwsgASgCACADQQR0aiIDQYCAgIB/cSIEQRh2IARyIANzIQMgAUEEaiEBDAALC/UBAQF/IwBBIGsiBiQAIAYgATYCHAJAAkAgAxD4AUEBcQ0AIAZBfzYCACAAIAEgAiADIAQgBiAAKAIAKAIQEQUAIQECQAJAAkAgBigCAA4CAAECCyAFQQA6AAAMAwsgBUEBOgAADAILIAVBAToAACAEQQQ2AgAMAQsgBiADEOsDIAYQ+QEhASAGEIQFGiAGIAMQ6wMgBhCFBSEDIAYQhAUaIAYgAxCGBSAGQQxyIAMQhwUgBSAGQRxqIAIgBiAGQRhqIgMgASAEQQEQiAUgBkY6AAAgBigCHCEBA0AgA0F0ahDJDSIDIAZHDQALCyAGQSBqJAAgAQsMACAAKAIAEOUJIAALCwAgAEG4twUQiQULEQAgACABIAEoAgAoAhgRAgALEQAgACABIAEoAgAoAhwRAgALzgQBC38jAEGAAWsiByQAIAcgATYCfCACIAMQigUhCCAHQdkANgIQQQAhCSAHQQhqQQAgB0EQahCLBSEKIAdBEGohCwJAAkACQAJAIAhB5QBJDQAgCBC6ASILRQ0BIAogCxCMBQsgCyEMIAIhAQNAAkAgASADRw0AQQAhDQNAAkACQCAAIAdB/ABqEPoBDQAgCA0BCwJAIAAgB0H8AGoQ+gFFDQAgBSAFKAIAQQJyNgIACwNAIAIgA0YNBiALLQAAQQJGDQcgC0EBaiELIAJBDGohAgwACwALIAAQ+wEhDgJAIAYNACAEIA4QjQUhDgsgDUEBaiEPQQAhECALIQwgAiEBA0ACQCABIANHDQAgDyENIBBBAXFFDQIgABD9ARogDyENIAshDCACIQEgCSAIakECSQ0CA0ACQCABIANHDQAgDyENDAQLAkAgDC0AAEECRw0AIAEQ6QIgD0YNACAMQQA6AAAgCUF/aiEJCyAMQQFqIQwgAUEMaiEBDAALAAsCQCAMLQAAQQFHDQAgASANEI4FLAAAIRECQCAGDQAgBCAREI0FIRELAkACQCAOIBFHDQBBASEQIAEQ6QIgD0cNAiAMQQI6AABBASEQIAlBAWohCQwBCyAMQQA6AAALIAhBf2ohCAsgDEEBaiEMIAFBDGohAQwACwALAAsgDEECQQEgARCPBSIRGzoAACAMQQFqIQwgAUEMaiEBIAkgEWohCSAIIBFrIQgMAAsACxDDDQALIAUgBSgCAEEEcjYCAAsgChCQBRogB0GAAWokACACCw8AIAAoAgAgARCeCRDGCQsJACAAIAEQlw0LKwEBfyMAQRBrIgMkACADIAE2AgwgACADQQxqIAIQkQ0hASADQRBqJAAgAQstAQF/IAAQkg0oAgAhAiAAEJINIAE2AgACQCACRQ0AIAIgABCTDSgCABEEAAsLEQAgACABIAAoAgAoAgwRAQALCgAgABDoAiABagsIACAAEOkCRQsLACAAQQAQjAUgAAsRACAAIAEgAiADIAQgBRCSBQu6AwECfyMAQYACayIGJAAgBiACNgL4ASAGIAE2AvwBIAMQkwUhASAAIAMgBkHQAWoQlAUhACAGQcQBaiADIAZB9wFqEJUFIAZBuAFqENICIQMgAyADEOoCEOsCIAYgA0EAEJYFIgI2ArQBIAYgBkEQajYCDCAGQQA2AggCQANAIAZB/AFqIAZB+AFqEPoBDQECQCAGKAK0ASACIAMQ6QJqRw0AIAMQ6QIhByADIAMQ6QJBAXQQ6wIgAyADEOoCEOsCIAYgByADQQAQlgUiAmo2ArQBCyAGQfwBahD7ASABIAIgBkG0AWogBkEIaiAGLAD3ASAGQcQBaiAGQRBqIAZBDGogABCXBQ0BIAZB/AFqEP0BGgwACwALAkAgBkHEAWoQ6QJFDQAgBigCDCIAIAZBEGprQZ8BSg0AIAYgAEEEajYCDCAAIAYoAgg2AgALIAUgAiAGKAK0ASAEIAEQmAU2AgAgBkHEAWogBkEQaiAGKAIMIAQQmQUCQCAGQfwBaiAGQfgBahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAvwBIQIgAxDJDRogBkHEAWoQyQ0aIAZBgAJqJAAgAgszAAJAAkAgABD4AUHKAHEiAEUNAAJAIABBwABHDQBBCA8LIABBCEcNAUEQDwtBAA8LQQoLCwAgACABIAIQ5AULQAEBfyMAQRBrIgMkACADQQxqIAEQ6wMgAiADQQxqEIUFIgEQ4AU6AAAgACABEOEFIANBDGoQhAUaIANBEGokAAsKACAAENgCIAFqC/sCAQR/IwBBEGsiCiQAIAogADoADwJAAkACQCADKAIAIgsgAkcNAEErIQwCQCAJLQAYIABB/wFxIg1GDQBBLSEMIAktABkgDUcNAQsgAyALQQFqNgIAIAsgDDoAAAwBCwJAIAYQ6QJFDQAgACAFRw0AQQAhACAIKAIAIgkgB2tBnwFKDQIgBCgCACEAIAggCUEEajYCACAJIAA2AgAMAQtBfyEAIAkgCUEaaiAKQQ9qELgFIAlrIglBF0oNAQJAAkACQCABQXhqDgMAAgABCyAJIAFIDQEMAwsgAUEQRw0AIAlBFkgNACADKAIAIgYgAkYNAiAGIAJrQQJKDQJBfyEAIAZBf2otAABBMEcNAkEAIQAgBEEANgIAIAMgBkEBajYCACAGIAlBwMMEai0AADoAAAwCCyADIAMoAgAiAEEBajYCACAAIAlBwMMEai0AADoAACAEIAQoAgBBAWo2AgBBACEADAELQQAhACAEQQA2AgALIApBEGokACAAC9ABAgN/AX4jAEEQayIEJAACQAJAAkACQAJAIAAgAUYNABBcIgUoAgAhBiAFQQA2AgAgACAEQQxqIAMQtgUQmA0hBwJAAkAgBSgCACIARQ0AIAQoAgwgAUcNASAAQcQARg0FDAQLIAUgBjYCACAEKAIMIAFGDQMLIAJBBDYCAAwBCyACQQQ2AgALQQAhAQwCCyAHEJkNrFMNACAHEIoCrFUNACAHpyEBDAELIAJBBDYCAAJAIAdCAVMNABCKAiEBDAELEJkNIQELIARBEGokACABC60BAQJ/IAAQ6QIhBAJAIAIgAWtBBUgNACAERQ0AIAEgAhDpByACQXxqIQQgABDoAiICIAAQ6QJqIQUCQAJAA0AgAiwAACEAIAEgBE8NAQJAIABBAUgNACAAEPcGTg0AIAEoAgAgAiwAAEcNAwsgAUEEaiEBIAIgBSACa0EBSmohAgwACwALIABBAUgNASAAEPcGTg0BIAQoAgBBf2ogAiwAAEkNAQsgA0EENgIACwsRACAAIAEgAiADIAQgBRCbBQu6AwECfyMAQYACayIGJAAgBiACNgL4ASAGIAE2AvwBIAMQkwUhASAAIAMgBkHQAWoQlAUhACAGQcQBaiADIAZB9wFqEJUFIAZBuAFqENICIQMgAyADEOoCEOsCIAYgA0EAEJYFIgI2ArQBIAYgBkEQajYCDCAGQQA2AggCQANAIAZB/AFqIAZB+AFqEPoBDQECQCAGKAK0ASACIAMQ6QJqRw0AIAMQ6QIhByADIAMQ6QJBAXQQ6wIgAyADEOoCEOsCIAYgByADQQAQlgUiAmo2ArQBCyAGQfwBahD7ASABIAIgBkG0AWogBkEIaiAGLAD3ASAGQcQBaiAGQRBqIAZBDGogABCXBQ0BIAZB/AFqEP0BGgwACwALAkAgBkHEAWoQ6QJFDQAgBigCDCIAIAZBEGprQZ8BSg0AIAYgAEEEajYCDCAAIAYoAgg2AgALIAUgAiAGKAK0ASAEIAEQnAU3AwAgBkHEAWogBkEQaiAGKAIMIAQQmQUCQCAGQfwBaiAGQfgBahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAvwBIQIgAxDJDRogBkHEAWoQyQ0aIAZBgAJqJAAgAgvHAQIDfwF+IwBBEGsiBCQAAkACQAJAAkACQCAAIAFGDQAQXCIFKAIAIQYgBUEANgIAIAAgBEEMaiADELYFEJgNIQcCQAJAIAUoAgAiAEUNACAEKAIMIAFHDQEgAEHEAEYNBQwECyAFIAY2AgAgBCgCDCABRg0DCyACQQQ2AgAMAQsgAkEENgIAC0IAIQcMAgsgBxCbDVMNABCcDSAHWQ0BCyACQQQ2AgACQCAHQgFTDQAQnA0hBwwBCxCbDSEHCyAEQRBqJAAgBwsRACAAIAEgAiADIAQgBRCeBQu6AwECfyMAQYACayIGJAAgBiACNgL4ASAGIAE2AvwBIAMQkwUhASAAIAMgBkHQAWoQlAUhACAGQcQBaiADIAZB9wFqEJUFIAZBuAFqENICIQMgAyADEOoCEOsCIAYgA0EAEJYFIgI2ArQBIAYgBkEQajYCDCAGQQA2AggCQANAIAZB/AFqIAZB+AFqEPoBDQECQCAGKAK0ASACIAMQ6QJqRw0AIAMQ6QIhByADIAMQ6QJBAXQQ6wIgAyADEOoCEOsCIAYgByADQQAQlgUiAmo2ArQBCyAGQfwBahD7ASABIAIgBkG0AWogBkEIaiAGLAD3ASAGQcQBaiAGQRBqIAZBDGogABCXBQ0BIAZB/AFqEP0BGgwACwALAkAgBkHEAWoQ6QJFDQAgBigCDCIAIAZBEGprQZ8BSg0AIAYgAEEEajYCDCAAIAYoAgg2AgALIAUgAiAGKAK0ASAEIAEQnwU7AQAgBkHEAWogBkEQaiAGKAIMIAQQmQUCQCAGQfwBaiAGQfgBahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAvwBIQIgAxDJDRogBkHEAWoQyQ0aIAZBgAJqJAAgAgvvAQIEfwF+IwBBEGsiBCQAAkACQAJAAkACQAJAIAAgAUYNAAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0AIAJBBDYCAAwCCxBcIgYoAgAhByAGQQA2AgAgACAEQQxqIAMQtgUQnw0hCAJAAkAgBigCACIARQ0AIAQoAgwgAUcNASAAQcQARg0FDAQLIAYgBzYCACAEKAIMIAFGDQMLIAJBBDYCAAwBCyACQQQ2AgALQQAhAAwDCyAIEKANrVgNAQsgAkEENgIAEKANIQAMAQtBACAIpyIAayAAIAVBLUYbIQALIARBEGokACAAQf//A3ELEQAgACABIAIgAyAEIAUQoQULugMBAn8jAEGAAmsiBiQAIAYgAjYC+AEgBiABNgL8ASADEJMFIQEgACADIAZB0AFqEJQFIQAgBkHEAWogAyAGQfcBahCVBSAGQbgBahDSAiEDIAMgAxDqAhDrAiAGIANBABCWBSICNgK0ASAGIAZBEGo2AgwgBkEANgIIAkADQCAGQfwBaiAGQfgBahD6AQ0BAkAgBigCtAEgAiADEOkCakcNACADEOkCIQcgAyADEOkCQQF0EOsCIAMgAxDqAhDrAiAGIAcgA0EAEJYFIgJqNgK0AQsgBkH8AWoQ+wEgASACIAZBtAFqIAZBCGogBiwA9wEgBkHEAWogBkEQaiAGQQxqIAAQlwUNASAGQfwBahD9ARoMAAsACwJAIAZBxAFqEOkCRQ0AIAYoAgwiACAGQRBqa0GfAUoNACAGIABBBGo2AgwgACAGKAIINgIACyAFIAIgBigCtAEgBCABEKIFNgIAIAZBxAFqIAZBEGogBigCDCAEEJkFAkAgBkH8AWogBkH4AWoQ+gFFDQAgBCAEKAIAQQJyNgIACyAGKAL8ASECIAMQyQ0aIAZBxAFqEMkNGiAGQYACaiQAIAIL6gECBH8BfiMAQRBrIgQkAAJAAkACQAJAAkACQCAAIAFGDQACQCAALQAAIgVBLUcNACAAQQFqIgAgAUcNACACQQQ2AgAMAgsQXCIGKAIAIQcgBkEANgIAIAAgBEEMaiADELYFEJ8NIQgCQAJAIAYoAgAiAEUNACAEKAIMIAFHDQEgAEHEAEYNBQwECyAGIAc2AgAgBCgCDCABRg0DCyACQQQ2AgAMAQsgAkEENgIAC0EAIQAMAwsgCBC2CK1YDQELIAJBBDYCABC2CCEADAELQQAgCKciAGsgACAFQS1GGyEACyAEQRBqJAAgAAsRACAAIAEgAiADIAQgBRCkBQu6AwECfyMAQYACayIGJAAgBiACNgL4ASAGIAE2AvwBIAMQkwUhASAAIAMgBkHQAWoQlAUhACAGQcQBaiADIAZB9wFqEJUFIAZBuAFqENICIQMgAyADEOoCEOsCIAYgA0EAEJYFIgI2ArQBIAYgBkEQajYCDCAGQQA2AggCQANAIAZB/AFqIAZB+AFqEPoBDQECQCAGKAK0ASACIAMQ6QJqRw0AIAMQ6QIhByADIAMQ6QJBAXQQ6wIgAyADEOoCEOsCIAYgByADQQAQlgUiAmo2ArQBCyAGQfwBahD7ASABIAIgBkG0AWogBkEIaiAGLAD3ASAGQcQBaiAGQRBqIAZBDGogABCXBQ0BIAZB/AFqEP0BGgwACwALAkAgBkHEAWoQ6QJFDQAgBigCDCIAIAZBEGprQZ8BSg0AIAYgAEEEajYCDCAAIAYoAgg2AgALIAUgAiAGKAK0ASAEIAEQpQU2AgAgBkHEAWogBkEQaiAGKAIMIAQQmQUCQCAGQfwBaiAGQfgBahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAvwBIQIgAxDJDRogBkHEAWoQyQ0aIAZBgAJqJAAgAgvqAQIEfwF+IwBBEGsiBCQAAkACQAJAAkACQAJAIAAgAUYNAAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0AIAJBBDYCAAwCCxBcIgYoAgAhByAGQQA2AgAgACAEQQxqIAMQtgUQnw0hCAJAAkAgBigCACIARQ0AIAQoAgwgAUcNASAAQcQARg0FDAQLIAYgBzYCACAEKAIMIAFGDQMLIAJBBDYCAAwBCyACQQQ2AgALQQAhAAwDCyAIENUDrVgNAQsgAkEENgIAENUDIQAMAQtBACAIpyIAayAAIAVBLUYbIQALIARBEGokACAACxEAIAAgASACIAMgBCAFEKcFC7oDAQJ/IwBBgAJrIgYkACAGIAI2AvgBIAYgATYC/AEgAxCTBSEBIAAgAyAGQdABahCUBSEAIAZBxAFqIAMgBkH3AWoQlQUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkH8AWogBkH4AWoQ+gENAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZB/AFqEPsBIAEgAiAGQbQBaiAGQQhqIAYsAPcBIAZBxAFqIAZBEGogBkEMaiAAEJcFDQEgBkH8AWoQ/QEaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCoBTcDACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZB/AFqIAZB+AFqEPoBRQ0AIAQgBCgCAEECcjYCAAsgBigC/AEhAiADEMkNGiAGQcQBahDJDRogBkGAAmokACACC+YBAgR/AX4jAEEQayIEJAACQAJAAkACQAJAAkAgACABRg0AAkAgAC0AACIFQS1HDQAgAEEBaiIAIAFHDQAgAkEENgIADAILEFwiBigCACEHIAZBADYCACAAIARBDGogAxC2BRCfDSEIAkACQCAGKAIAIgBFDQAgBCgCDCABRw0BIABBxABGDQUMBAsgBiAHNgIAIAQoAgwgAUYNAwsgAkEENgIADAELIAJBBDYCAAtCACEIDAMLEKINIAhaDQELIAJBBDYCABCiDSEIDAELQgAgCH0gCCAFQS1GGyEICyAEQRBqJAAgCAsRACAAIAEgAiADIAQgBRCqBQvZAwEBfyMAQYACayIGJAAgBiACNgL4ASAGIAE2AvwBIAZBwAFqIAMgBkHQAWogBkHPAWogBkHOAWoQqwUgBkG0AWoQ0gIhAiACIAIQ6gIQ6wIgBiACQQAQlgUiATYCsAEgBiAGQRBqNgIMIAZBADYCCCAGQQE6AAcgBkHFADoABgJAA0AgBkH8AWogBkH4AWoQ+gENAQJAIAYoArABIAEgAhDpAmpHDQAgAhDpAiEDIAIgAhDpAkEBdBDrAiACIAIQ6gIQ6wIgBiADIAJBABCWBSIBajYCsAELIAZB/AFqEPsBIAZBB2ogBkEGaiABIAZBsAFqIAYsAM8BIAYsAM4BIAZBwAFqIAZBEGogBkEMaiAGQQhqIAZB0AFqEKwFDQEgBkH8AWoQ/QEaDAALAAsCQCAGQcABahDpAkUNACAGLQAHQQFHDQAgBigCDCIDIAZBEGprQZ8BSg0AIAYgA0EEajYCDCADIAYoAgg2AgALIAUgASAGKAKwASAEEK0FOAIAIAZBwAFqIAZBEGogBigCDCAEEJkFAkAgBkH8AWogBkH4AWoQ+gFFDQAgBCAEKAIAQQJyNgIACyAGKAL8ASEBIAIQyQ0aIAZBwAFqEMkNGiAGQYACaiQAIAELYAEBfyMAQRBrIgUkACAFQQxqIAEQ6wMgBUEMahD5AUHAwwRB4MMEIAIQtQUaIAMgBUEMahCFBSIBEN8FOgAAIAQgARDgBToAACAAIAEQ4QUgBUEMahCEBRogBUEQaiQAC/kDAQF/IwBBEGsiDCQAIAwgADoADwJAAkAgACAFRw0AQX8hACABLQAAQQFHDQFBACEAIAFBADoAACAEIAQoAgAiC0EBajYCACALQS46AAAgBxDpAkUNASAJKAIAIgsgCGtBnwFKDQEgCigCACEFIAkgC0EEajYCACALIAU2AgAMAQsCQCAAIAZHDQAgBxDpAkUNAEF/IQAgAS0AAEEBRw0BQQAhACAJKAIAIgsgCGtBnwFKDQEgCigCACEAIAkgC0EEajYCACALIAA2AgBBACEAIApBADYCAAwBC0F/IQAgCyALQSBqIAxBD2oQ4gUgC2siC0EfSg0AIAtBwMMEaiwAACEFAkACQAJAAkAgC0F+cUFqag4DAQIAAgsCQCAEKAIAIgsgA0YNAEF/IQAgC0F/aiwAABCaASACLAAAEJoBRw0ECyAEIAtBAWo2AgAgCyAFOgAAQQAhAAwDCyACQdAAOgAADAELIAUQmgEiACACLAAARw0AIAIgABDJBDoAACABLQAAQQFHDQAgAUEAOgAAIAcQ6QJFDQAgCSgCACIAIAhrQZ8BSg0AIAooAgAhASAJIABBBGo2AgAgACABNgIACyAEIAQoAgAiAEEBajYCACAAIAU6AABBACEAIAtBFUoNACAKIAooAgBBAWo2AgALIAxBEGokACAAC6MBAgN/An0jAEEQayIDJAACQAJAAkACQCAAIAFGDQAQXCIEKAIAIQUgBEEANgIAIAAgA0EMahCkDSEGIAQoAgAiAEUNAUMAAAAAIQcgAygCDCABRw0CIAYhByAAQcQARw0DDAILIAJBBDYCAEMAAAAAIQYMAgsgBCAFNgIAQwAAAAAhByADKAIMIAFGDQELIAJBBDYCACAHIQYLIANBEGokACAGCxEAIAAgASACIAMgBCAFEK8FC9kDAQF/IwBBgAJrIgYkACAGIAI2AvgBIAYgATYC/AEgBkHAAWogAyAGQdABaiAGQc8BaiAGQc4BahCrBSAGQbQBahDSAiECIAIgAhDqAhDrAiAGIAJBABCWBSIBNgKwASAGIAZBEGo2AgwgBkEANgIIIAZBAToAByAGQcUAOgAGAkADQCAGQfwBaiAGQfgBahD6AQ0BAkAgBigCsAEgASACEOkCakcNACACEOkCIQMgAiACEOkCQQF0EOsCIAIgAhDqAhDrAiAGIAMgAkEAEJYFIgFqNgKwAQsgBkH8AWoQ+wEgBkEHaiAGQQZqIAEgBkGwAWogBiwAzwEgBiwAzgEgBkHAAWogBkEQaiAGQQxqIAZBCGogBkHQAWoQrAUNASAGQfwBahD9ARoMAAsACwJAIAZBwAFqEOkCRQ0AIAYtAAdBAUcNACAGKAIMIgMgBkEQamtBnwFKDQAgBiADQQRqNgIMIAMgBigCCDYCAAsgBSABIAYoArABIAQQsAU5AwAgBkHAAWogBkEQaiAGKAIMIAQQmQUCQCAGQfwBaiAGQfgBahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAvwBIQEgAhDJDRogBkHAAWoQyQ0aIAZBgAJqJAAgAQuvAQIDfwJ8IwBBEGsiAyQAAkACQAJAAkAgACABRg0AEFwiBCgCACEFIARBADYCACAAIANBDGoQpQ0hBiAEKAIAIgBFDQFEAAAAAAAAAAAhByADKAIMIAFHDQIgBiEHIABBxABHDQMMAgsgAkEENgIARAAAAAAAAAAAIQYMAgsgBCAFNgIARAAAAAAAAAAAIQcgAygCDCABRg0BCyACQQQ2AgAgByEGCyADQRBqJAAgBgsRACAAIAEgAiADIAQgBRCyBQvzAwIBfwF+IwBBkAJrIgYkACAGIAI2AogCIAYgATYCjAIgBkHQAWogAyAGQeABaiAGQd8BaiAGQd4BahCrBSAGQcQBahDSAiECIAIgAhDqAhDrAiAGIAJBABCWBSIBNgLAASAGIAZBIGo2AhwgBkEANgIYIAZBAToAFyAGQcUAOgAWAkADQCAGQYwCaiAGQYgCahD6AQ0BAkAgBigCwAEgASACEOkCakcNACACEOkCIQMgAiACEOkCQQF0EOsCIAIgAhDqAhDrAiAGIAMgAkEAEJYFIgFqNgLAAQsgBkGMAmoQ+wEgBkEXaiAGQRZqIAEgBkHAAWogBiwA3wEgBiwA3gEgBkHQAWogBkEgaiAGQRxqIAZBGGogBkHgAWoQrAUNASAGQYwCahD9ARoMAAsACwJAIAZB0AFqEOkCRQ0AIAYtABdBAUcNACAGKAIcIgMgBkEgamtBnwFKDQAgBiADQQRqNgIcIAMgBigCGDYCAAsgBiABIAYoAsABIAQQswUgBikDACEHIAUgBkEIaikDADcDCCAFIAc3AwAgBkHQAWogBkEgaiAGKAIcIAQQmQUCQCAGQYwCaiAGQYgCahD6AUUNACAEIAQoAgBBAnI2AgALIAYoAowCIQEgAhDJDRogBkHQAWoQyQ0aIAZBkAJqJAAgAQvOAQIDfwR+IwBBIGsiBCQAAkACQAJAAkAgASACRg0AEFwiBSgCACEGIAVBADYCACAEQQhqIAEgBEEcahCmDSAEQRBqKQMAIQcgBCkDCCEIIAUoAgAiAUUNAUIAIQlCACEKIAQoAhwgAkcNAiAIIQkgByEKIAFBxABHDQMMAgsgA0EENgIAQgAhCEIAIQcMAgsgBSAGNgIAQgAhCUIAIQogBCgCHCACRg0BCyADQQQ2AgAgCSEIIAohBwsgACAINwMAIAAgBzcDCCAEQSBqJAALoQMBAn8jAEGAAmsiBiQAIAYgAjYC+AEgBiABNgL8ASAGQcQBahDSAiEHIAZBEGogAxDrAyAGQRBqEPkBQcDDBEHawwQgBkHQAWoQtQUaIAZBEGoQhAUaIAZBuAFqENICIQIgAiACEOoCEOsCIAYgAkEAEJYFIgE2ArQBIAYgBkEQajYCDCAGQQA2AggCQANAIAZB/AFqIAZB+AFqEPoBDQECQCAGKAK0ASABIAIQ6QJqRw0AIAIQ6QIhAyACIAIQ6QJBAXQQ6wIgAiACEOoCEOsCIAYgAyACQQAQlgUiAWo2ArQBCyAGQfwBahD7AUEQIAEgBkG0AWogBkEIakEAIAcgBkEQaiAGQQxqIAZB0AFqEJcFDQEgBkH8AWoQ/QEaDAALAAsgAiAGKAK0ASABaxDrAiACEO8CIQEQtgUhAyAGIAU2AgACQCABIANBi4MEIAYQtwVBAUYNACAEQQQ2AgALAkAgBkH8AWogBkH4AWoQ+gFFDQAgBCAEKAIAQQJyNgIACyAGKAL8ASEBIAIQyQ0aIAcQyQ0aIAZBgAJqJAAgAQsVACAAIAEgAiADIAAoAgAoAiARDAALPgEBfwJAQQAtAMS1BUUNAEEAKALAtQUPC0H/////B0HnhQRBABDHBCEAQQBBAToAxLUFQQAgADYCwLUFIAALRwEBfyMAQRBrIgQkACAEIAE2AgwgBCADNgIIIARBBGogBEEMahC5BSEDIAAgAiAEKAIIELMBIQEgAxC6BRogBEEQaiQAIAELMQEBfyMAQRBrIgMkACAAIAAQigMgARCKAyACIANBD2oQ5QUQkQMhACADQRBqJAAgAAsRACAAIAEoAgAQ7gQ2AgAgAAsZAQF/AkAgACgCACIBRQ0AIAEQ7gQaCyAAC/UBAQF/IwBBIGsiBiQAIAYgATYCHAJAAkAgAxD4AUEBcQ0AIAZBfzYCACAAIAEgAiADIAQgBiAAKAIAKAIQEQUAIQECQAJAAkAgBigCAA4CAAECCyAFQQA6AAAMAwsgBUEBOgAADAILIAVBAToAACAEQQQ2AgAMAQsgBiADEOsDIAYQuQIhASAGEIQFGiAGIAMQ6wMgBhC8BSEDIAYQhAUaIAYgAxC9BSAGQQxyIAMQvgUgBSAGQRxqIAIgBiAGQRhqIgMgASAEQQEQvwUgBkY6AAAgBigCHCEBA0AgA0F0ahDXDSIDIAZHDQALCyAGQSBqJAAgAQsLACAAQcC3BRCJBQsRACAAIAEgASgCACgCGBECAAsRACAAIAEgASgCACgCHBECAAvOBAELfyMAQYABayIHJAAgByABNgJ8IAIgAxDABSEIIAdB2QA2AhBBACEJIAdBCGpBACAHQRBqEIsFIQogB0EQaiELAkACQAJAAkAgCEHlAEkNACAIELoBIgtFDQEgCiALEIwFCyALIQwgAiEBA0ACQCABIANHDQBBACENA0ACQAJAIAAgB0H8AGoQugINACAIDQELAkAgACAHQfwAahC6AkUNACAFIAUoAgBBAnI2AgALA0AgAiADRg0GIAstAABBAkYNByALQQFqIQsgAkEMaiECDAALAAsgABC7AiEOAkAgBg0AIAQgDhDBBSEOCyANQQFqIQ9BACEQIAshDCACIQEDQAJAIAEgA0cNACAPIQ0gEEEBcUUNAiAAEL0CGiAPIQ0gCyEMIAIhASAJIAhqQQJJDQIDQAJAIAEgA0cNACAPIQ0MBAsCQCAMLQAAQQJHDQAgARDCBSAPRg0AIAxBADoAACAJQX9qIQkLIAxBAWohDCABQQxqIQEMAAsACwJAIAwtAABBAUcNACABIA0QwwUoAgAhEQJAIAYNACAEIBEQwQUhEQsCQAJAIA4gEUcNAEEBIRAgARDCBSAPRw0CIAxBAjoAAEEBIRAgCUEBaiEJDAELIAxBADoAAAsgCEF/aiEICyAMQQFqIQwgAUEMaiEBDAALAAsACyAMQQJBASABEMQFIhEbOgAAIAxBAWohDCABQQxqIQEgCSARaiEJIAggEWshCAwACwALEMMNAAsgBSAFKAIAQQRyNgIACyAKEJAFGiAHQYABaiQAIAILCQAgACABEKcNCxEAIAAgASAAKAIAKAIcEQEACxgAAkAgABDTBkUNACAAENQGDwsgABDVBgsNACAAENEGIAFBAnRqCwgAIAAQwgVFCxEAIAAgASACIAMgBCAFEMYFC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCYBTYCACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCwsAIAAgASACEOsFC0ABAX8jAEEQayIDJAAgA0EMaiABEOsDIAIgA0EMahC8BSIBEOcFNgIAIAAgARDoBSADQQxqEIQFGiADQRBqJAAL+QIBA38jAEEQayIKJAAgCiAANgIMAkACQAJAIAMoAgAiCyACRw0AQSshDAJAIAkoAmAgAEYNAEEtIQwgCSgCZCAARw0BCyADIAtBAWo2AgAgCyAMOgAADAELAkAgBhDpAkUNACAAIAVHDQBBACEAIAgoAgAiCSAHa0GfAUoNAiAEKAIAIQAgCCAJQQRqNgIAIAkgADYCAAwBC0F/IQAgCSAJQegAaiAKQQxqEN4FIAlrQQJ1IglBF0oNAQJAAkACQCABQXhqDgMAAgABCyAJIAFIDQEMAwsgAUEQRw0AIAlBFkgNACADKAIAIgYgAkYNAiAGIAJrQQJKDQJBfyEAIAZBf2otAABBMEcNAkEAIQAgBEEANgIAIAMgBkEBajYCACAGIAlBwMMEai0AADoAAAwCCyADIAMoAgAiAEEBajYCACAAIAlBwMMEai0AADoAACAEIAQoAgBBAWo2AgBBACEADAELQQAhACAEQQA2AgALIApBEGokACAACxEAIAAgASACIAMgBCAFEMsFC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCcBTcDACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCxEAIAAgASACIAMgBCAFEM0FC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCfBTsBACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCxEAIAAgASACIAMgBCAFEM8FC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCiBTYCACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCxEAIAAgASACIAMgBCAFENEFC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARClBTYCACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCxEAIAAgASACIAMgBCAFENMFC7oDAQJ/IwBB0AJrIgYkACAGIAI2AsgCIAYgATYCzAIgAxCTBSEBIAAgAyAGQdABahDHBSEAIAZBxAFqIAMgBkHEAmoQyAUgBkG4AWoQ0gIhAyADIAMQ6gIQ6wIgBiADQQAQlgUiAjYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkHMAmogBkHIAmoQugINAQJAIAYoArQBIAIgAxDpAmpHDQAgAxDpAiEHIAMgAxDpAkEBdBDrAiADIAMQ6gIQ6wIgBiAHIANBABCWBSICajYCtAELIAZBzAJqELsCIAEgAiAGQbQBaiAGQQhqIAYoAsQCIAZBxAFqIAZBEGogBkEMaiAAEMkFDQEgBkHMAmoQvQIaDAALAAsCQCAGQcQBahDpAkUNACAGKAIMIgAgBkEQamtBnwFKDQAgBiAAQQRqNgIMIAAgBigCCDYCAAsgBSACIAYoArQBIAQgARCoBTcDACAGQcQBaiAGQRBqIAYoAgwgBBCZBQJAIAZBzAJqIAZByAJqELoCRQ0AIAQgBCgCAEECcjYCAAsgBigCzAIhAiADEMkNGiAGQcQBahDJDRogBkHQAmokACACCxEAIAAgASACIAMgBCAFENUFC9kDAQF/IwBB8AJrIgYkACAGIAI2AugCIAYgATYC7AIgBkHMAWogAyAGQeABaiAGQdwBaiAGQdgBahDWBSAGQcABahDSAiECIAIgAhDqAhDrAiAGIAJBABCWBSIBNgK8ASAGIAZBEGo2AgwgBkEANgIIIAZBAToAByAGQcUAOgAGAkADQCAGQewCaiAGQegCahC6Ag0BAkAgBigCvAEgASACEOkCakcNACACEOkCIQMgAiACEOkCQQF0EOsCIAIgAhDqAhDrAiAGIAMgAkEAEJYFIgFqNgK8AQsgBkHsAmoQuwIgBkEHaiAGQQZqIAEgBkG8AWogBigC3AEgBigC2AEgBkHMAWogBkEQaiAGQQxqIAZBCGogBkHgAWoQ1wUNASAGQewCahC9AhoMAAsACwJAIAZBzAFqEOkCRQ0AIAYtAAdBAUcNACAGKAIMIgMgBkEQamtBnwFKDQAgBiADQQRqNgIMIAMgBigCCDYCAAsgBSABIAYoArwBIAQQrQU4AgAgBkHMAWogBkEQaiAGKAIMIAQQmQUCQCAGQewCaiAGQegCahC6AkUNACAEIAQoAgBBAnI2AgALIAYoAuwCIQEgAhDJDRogBkHMAWoQyQ0aIAZB8AJqJAAgAQtgAQF/IwBBEGsiBSQAIAVBDGogARDrAyAFQQxqELkCQcDDBEHgwwQgAhDdBRogAyAFQQxqELwFIgEQ5gU2AgAgBCABEOcFNgIAIAAgARDoBSAFQQxqEIQFGiAFQRBqJAALgwQBAX8jAEEQayIMJAAgDCAANgIMAkACQCAAIAVHDQBBfyEAIAEtAABBAUcNAUEAIQAgAUEAOgAAIAQgBCgCACILQQFqNgIAIAtBLjoAACAHEOkCRQ0BIAkoAgAiCyAIa0GfAUoNASAKKAIAIQUgCSALQQRqNgIAIAsgBTYCAAwBCwJAIAAgBkcNACAHEOkCRQ0AQX8hACABLQAAQQFHDQFBACEAIAkoAgAiCyAIa0GfAUoNASAKKAIAIQAgCSALQQRqNgIAIAsgADYCAEEAIQAgCkEANgIADAELQX8hACALIAtBgAFqIAxBDGoQ6QUgC2siBUECdSILQR9KDQAgC0HAwwRqLAAAIQYCQAJAAkAgBUF7cSIAQdgARg0AIABB4ABHDQECQCAEKAIAIgsgA0YNAEF/IQAgC0F/aiwAABCaASACLAAAEJoBRw0ECyAEIAtBAWo2AgAgCyAGOgAAQQAhAAwDCyACQdAAOgAADAELIAYQmgEiACACLAAARw0AIAIgABDJBDoAACABLQAAQQFHDQAgAUEAOgAAIAcQ6QJFDQAgCSgCACIAIAhrQZ8BSg0AIAooAgAhBSAJIABBBGo2AgAgACAFNgIACyAEIAQoAgAiAEEBajYCACAAIAY6AABBACEAIAtBFUoNACAKIAooAgBBAWo2AgALIAxBEGokACAACxEAIAAgASACIAMgBCAFENkFC9kDAQF/IwBB8AJrIgYkACAGIAI2AugCIAYgATYC7AIgBkHMAWogAyAGQeABaiAGQdwBaiAGQdgBahDWBSAGQcABahDSAiECIAIgAhDqAhDrAiAGIAJBABCWBSIBNgK8ASAGIAZBEGo2AgwgBkEANgIIIAZBAToAByAGQcUAOgAGAkADQCAGQewCaiAGQegCahC6Ag0BAkAgBigCvAEgASACEOkCakcNACACEOkCIQMgAiACEOkCQQF0EOsCIAIgAhDqAhDrAiAGIAMgAkEAEJYFIgFqNgK8AQsgBkHsAmoQuwIgBkEHaiAGQQZqIAEgBkG8AWogBigC3AEgBigC2AEgBkHMAWogBkEQaiAGQQxqIAZBCGogBkHgAWoQ1wUNASAGQewCahC9AhoMAAsACwJAIAZBzAFqEOkCRQ0AIAYtAAdBAUcNACAGKAIMIgMgBkEQamtBnwFKDQAgBiADQQRqNgIMIAMgBigCCDYCAAsgBSABIAYoArwBIAQQsAU5AwAgBkHMAWogBkEQaiAGKAIMIAQQmQUCQCAGQewCaiAGQegCahC6AkUNACAEIAQoAgBBAnI2AgALIAYoAuwCIQEgAhDJDRogBkHMAWoQyQ0aIAZB8AJqJAAgAQsRACAAIAEgAiADIAQgBRDbBQvzAwIBfwF+IwBBgANrIgYkACAGIAI2AvgCIAYgATYC/AIgBkHcAWogAyAGQfABaiAGQewBaiAGQegBahDWBSAGQdABahDSAiECIAIgAhDqAhDrAiAGIAJBABCWBSIBNgLMASAGIAZBIGo2AhwgBkEANgIYIAZBAToAFyAGQcUAOgAWAkADQCAGQfwCaiAGQfgCahC6Ag0BAkAgBigCzAEgASACEOkCakcNACACEOkCIQMgAiACEOkCQQF0EOsCIAIgAhDqAhDrAiAGIAMgAkEAEJYFIgFqNgLMAQsgBkH8AmoQuwIgBkEXaiAGQRZqIAEgBkHMAWogBigC7AEgBigC6AEgBkHcAWogBkEgaiAGQRxqIAZBGGogBkHwAWoQ1wUNASAGQfwCahC9AhoMAAsACwJAIAZB3AFqEOkCRQ0AIAYtABdBAUcNACAGKAIcIgMgBkEgamtBnwFKDQAgBiADQQRqNgIcIAMgBigCGDYCAAsgBiABIAYoAswBIAQQswUgBikDACEHIAUgBkEIaikDADcDCCAFIAc3AwAgBkHcAWogBkEgaiAGKAIcIAQQmQUCQCAGQfwCaiAGQfgCahC6AkUNACAEIAQoAgBBAnI2AgALIAYoAvwCIQEgAhDJDRogBkHcAWoQyQ0aIAZBgANqJAAgAQuhAwECfyMAQcACayIGJAAgBiACNgK4AiAGIAE2ArwCIAZBxAFqENICIQcgBkEQaiADEOsDIAZBEGoQuQJBwMMEQdrDBCAGQdABahDdBRogBkEQahCEBRogBkG4AWoQ0gIhAiACIAIQ6gIQ6wIgBiACQQAQlgUiATYCtAEgBiAGQRBqNgIMIAZBADYCCAJAA0AgBkG8AmogBkG4AmoQugINAQJAIAYoArQBIAEgAhDpAmpHDQAgAhDpAiEDIAIgAhDpAkEBdBDrAiACIAIQ6gIQ6wIgBiADIAJBABCWBSIBajYCtAELIAZBvAJqELsCQRAgASAGQbQBaiAGQQhqQQAgByAGQRBqIAZBDGogBkHQAWoQyQUNASAGQbwCahC9AhoMAAsACyACIAYoArQBIAFrEOsCIAIQ7wIhARC2BSEDIAYgBTYCAAJAIAEgA0GLgwQgBhC3BUEBRg0AIARBBDYCAAsCQCAGQbwCaiAGQbgCahC6AkUNACAEIAQoAgBBAnI2AgALIAYoArwCIQEgAhDJDRogBxDJDRogBkHAAmokACABCxUAIAAgASACIAMgACgCACgCMBEMAAsxAQF/IwBBEGsiAyQAIAAgABCjAyABEKMDIAIgA0EPahDsBRCrAyEAIANBEGokACAACw8AIAAgACgCACgCDBEAAAsPACAAIAAoAgAoAhARAAALEQAgACABIAEoAgAoAhQRAgALMQEBfyMAQRBrIgMkACAAIAAQ/wIgARD/AiACIANBD2oQ4wUQggMhACADQRBqJAAgAAsYACAAIAIsAAAgASAAaxC5CyIAIAEgABsLBgBBwMMECxgAIAAgAiwAACABIABrELoLIgAgASAAGwsPACAAIAAoAgAoAgwRAAALDwAgACAAKAIAKAIQEQAACxEAIAAgASABKAIAKAIUEQIACzEBAX8jAEEQayIDJAAgACAAEJgDIAEQmAMgAiADQQ9qEOoFEJsDIQAgA0EQaiQAIAALGwAgACACKAIAIAEgAGtBAnUQuwsiACABIAAbCz8BAX8jAEEQayIDJAAgA0EMaiABEOsDIANBDGoQuQJBwMMEQdrDBCACEN0FGiADQQxqEIQFGiADQRBqJAAgAgsbACAAIAIoAgAgASAAa0ECdRC8CyIAIAEgABsL9QEBAX8jAEEgayIFJAAgBSABNgIcAkACQCACEPgBQQFxDQAgACABIAIgAyAEIAAoAgAoAhgRCgAhAgwBCyAFQRBqIAIQ6wMgBUEQahCFBSECIAVBEGoQhAUaAkACQCAERQ0AIAVBEGogAhCGBQwBCyAFQRBqIAIQhwULIAUgBUEQahDuBTYCDANAIAUgBUEQahDvBTYCCAJAIAVBDGogBUEIahDwBQ0AIAUoAhwhAiAFQRBqEMkNGgwCCyAFQQxqEPEFLAAAIQIgBUEcahCVAiACEJYCGiAFQQxqEPIFGiAFQRxqEJcCGgwACwALIAVBIGokACACCwwAIAAgABDYAhDzBQsSACAAIAAQ2AIgABDpAmoQ8wULDAAgACABEPQFQQFzCwcAIAAoAgALEQAgACAAKAIAQQFqNgIAIAALJQEBfyMAQRBrIgIkACACQQxqIAEQvQsoAgAhASACQRBqJAAgAQsNACAAEN4HIAEQ3gdGCxMAIAAgASACIAMgBEG/gwQQ9gULswEBAX8jAEHAAGsiBiQAIAZCJTcDOCAGQThqQQFyIAVBASACEPgBEPcFELYFIQUgBiAENgIAIAZBK2ogBkEraiAGQStqQQ0gBSAGQThqIAYQ+AVqIgUgAhD5BSEEIAZBBGogAhDrAyAGQStqIAQgBSAGQRBqIAZBDGogBkEIaiAGQQRqEPoFIAZBBGoQhAUaIAEgBkEQaiAGKAIMIAYoAgggAiADEPsFIQIgBkHAAGokACACC8MBAQF/AkAgA0GAEHFFDQAgA0HKAHEiBEEIRg0AIARBwABGDQAgAkUNACAAQSs6AAAgAEEBaiEACwJAIANBgARxRQ0AIABBIzoAACAAQQFqIQALAkADQCABLQAAIgRFDQEgACAEOgAAIABBAWohACABQQFqIQEMAAsACwJAAkAgA0HKAHEiAUHAAEcNAEHvACEBDAELAkAgAUEIRw0AQdgAQfgAIANBgIABcRshAQwBC0HkAEH1ACACGyEBCyAAIAE6AAALSQEBfyMAQRBrIgUkACAFIAI2AgwgBSAENgIIIAVBBGogBUEMahC5BSEEIAAgASADIAUoAggQqQEhAiAEELoFGiAFQRBqJAAgAgtmAAJAIAIQ+AFBsAFxIgJBIEcNACABDwsCQCACQRBHDQACQAJAIAAtAAAiAkFVag4DAAEAAQsgAEEBag8LIAEgAGtBAkgNACACQTBHDQAgAC0AAUEgckH4AEcNACAAQQJqIQALIAAL8AMBCH8jAEEQayIHJAAgBhD5ASEIIAdBBGogBhCFBSIGEOEFAkACQCAHQQRqEI8FRQ0AIAggACACIAMQtQUaIAUgAyACIABraiIGNgIADAELIAUgAzYCACAAIQkCQAJAIAAtAAAiCkFVag4DAAEAAQsgCCAKwBDkAyEKIAUgBSgCACILQQFqNgIAIAsgCjoAACAAQQFqIQkLAkAgAiAJa0ECSA0AIAktAABBMEcNACAJLQABQSByQfgARw0AIAhBMBDkAyEKIAUgBSgCACILQQFqNgIAIAsgCjoAACAIIAksAAEQ5AMhCiAFIAUoAgAiC0EBajYCACALIAo6AAAgCUECaiEJCyAJIAIQrwZBACEKIAYQ4AUhDEEAIQsgCSEGA0ACQCAGIAJJDQAgAyAJIABraiAFKAIAEK8GIAUoAgAhBgwCCwJAIAdBBGogCxCWBS0AAEUNACAKIAdBBGogCxCWBSwAAEcNACAFIAUoAgAiCkEBajYCACAKIAw6AAAgCyALIAdBBGoQ6QJBf2pJaiELQQAhCgsgCCAGLAAAEOQDIQ0gBSAFKAIAIg5BAWo2AgAgDiANOgAAIAZBAWohBiAKQQFqIQoMAAsACyAEIAYgAyABIABraiABIAJGGzYCACAHQQRqEMkNGiAHQRBqJAALwgEBBH8jAEEQayIGJAACQAJAIAANAEEAIQcMAQsgBBCOBiEIQQAhBwJAIAIgAWsiCUEBSA0AIAAgASAJEJkCIAlHDQELAkAgCCADIAFrIgdrQQAgCCAHShsiAUEBSA0AIAAgBkEEaiABIAUQjwYiBxDVAiABEJkCIQggBxDJDRpBACEHIAggAUcNAQsCQCADIAJrIgFBAUgNAEEAIQcgACACIAEQmQIgAUcNAQsgBEEAEJAGGiAAIQcLIAZBEGokACAHCxMAIAAgASACIAMgBEG4gwQQ/QULuQEBAn8jAEHwAGsiBiQAIAZCJTcDaCAGQegAakEBciAFQQEgAhD4ARD3BRC2BSEFIAYgBDcDACAGQdAAaiAGQdAAaiAGQdAAakEYIAUgBkHoAGogBhD4BWoiBSACEPkFIQcgBkEUaiACEOsDIAZB0ABqIAcgBSAGQSBqIAZBHGogBkEYaiAGQRRqEPoFIAZBFGoQhAUaIAEgBkEgaiAGKAIcIAYoAhggAiADEPsFIQIgBkHwAGokACACCxMAIAAgASACIAMgBEG/gwQQ/wULswEBAX8jAEHAAGsiBiQAIAZCJTcDOCAGQThqQQFyIAVBACACEPgBEPcFELYFIQUgBiAENgIAIAZBK2ogBkEraiAGQStqQQ0gBSAGQThqIAYQ+AVqIgUgAhD5BSEEIAZBBGogAhDrAyAGQStqIAQgBSAGQRBqIAZBDGogBkEIaiAGQQRqEPoFIAZBBGoQhAUaIAEgBkEQaiAGKAIMIAYoAgggAiADEPsFIQIgBkHAAGokACACCxMAIAAgASACIAMgBEG4gwQQgQYLuQEBAn8jAEHwAGsiBiQAIAZCJTcDaCAGQegAakEBciAFQQAgAhD4ARD3BRC2BSEFIAYgBDcDACAGQdAAaiAGQdAAaiAGQdAAakEYIAUgBkHoAGogBhD4BWoiBSACEPkFIQcgBkEUaiACEOsDIAZB0ABqIAcgBSAGQSBqIAZBHGogBkEYaiAGQRRqEPoFIAZBFGoQhAUaIAEgBkEgaiAGKAIcIAYoAhggAiADEPsFIQIgBkHwAGokACACCxMAIAAgASACIAMgBEHEjAQQgwYLhwQBBn8jAEHQAWsiBiQAIAZCJTcDyAEgBkHIAWpBAXIgBSACEPgBEIQGIQcgBiAGQaABajYCnAEQtgUhBQJAAkAgB0UNACACEIUGIQggBiAEOQMoIAYgCDYCICAGQaABakEeIAUgBkHIAWogBkEgahD4BSEFDAELIAYgBDkDMCAGQaABakEeIAUgBkHIAWogBkEwahD4BSEFCyAGQdkANgJQIAZBlAFqQQAgBkHQAGoQhgYhCSAGQaABaiEIAkACQCAFQR5IDQAQtgUhBQJAAkAgB0UNACACEIUGIQggBiAEOQMIIAYgCDYCACAGQZwBaiAFIAZByAFqIAYQhwYhBQwBCyAGIAQ5AxAgBkGcAWogBSAGQcgBaiAGQRBqEIcGIQULIAVBf0YNASAJIAYoApwBEIgGIAYoApwBIQgLIAggCCAFaiIKIAIQ+QUhCyAGQdkANgJQIAZByABqQQAgBkHQAGoQhgYhCAJAAkAgBigCnAEiByAGQaABakcNACAGQdAAaiEFDAELIAVBAXQQugEiBUUNASAIIAUQiAYgBigCnAEhBwsgBkE8aiACEOsDIAcgCyAKIAUgBkHEAGogBkHAAGogBkE8ahCJBiAGQTxqEIQFGiABIAUgBigCRCAGKAJAIAIgAxD7BSECIAgQigYaIAkQigYaIAZB0AFqJAAgAg8LEMMNAAvsAQECfwJAIAJBgBBxRQ0AIABBKzoAACAAQQFqIQALAkAgAkGACHFFDQAgAEEjOgAAIABBAWohAAsCQCACQYQCcSIDQYQCRg0AIABBrtQAOwAAIABBAmohAAsgAkGAgAFxIQQCQANAIAEtAAAiAkUNASAAIAI6AAAgAEEBaiEAIAFBAWohAQwACwALAkACQAJAIANBgAJGDQAgA0EERw0BQcYAQeYAIAQbIQEMAgtBxQBB5QAgBBshAQwBCwJAIANBhAJHDQBBwQBB4QAgBBshAQwBC0HHAEHnACAEGyEBCyAAIAE6AAAgA0GEAkcLBwAgACgCCAsrAQF/IwBBEGsiAyQAIAMgATYCDCAAIANBDGogAhCwByEBIANBEGokACABC0cBAX8jAEEQayIEJAAgBCABNgIMIAQgAzYCCCAEQQRqIARBDGoQuQUhAyAAIAIgBCgCCBDdBCEBIAMQugUaIARBEGokACABCy0BAX8gABDBBygCACECIAAQwQcgATYCAAJAIAJFDQAgAiAAEMIHKAIAEQQACwvVBQEKfyMAQRBrIgckACAGEPkBIQggB0EEaiAGEIUFIgkQ4QUgBSADNgIAIAAhCgJAAkAgAC0AACIGQVVqDgMAAQABCyAIIAbAEOQDIQYgBSAFKAIAIgtBAWo2AgAgCyAGOgAAIABBAWohCgsgCiEGAkACQCACIAprQQFMDQAgCiEGIAotAABBMEcNACAKIQYgCi0AAUEgckH4AEcNACAIQTAQ5AMhBiAFIAUoAgAiC0EBajYCACALIAY6AAAgCCAKLAABEOQDIQYgBSAFKAIAIgtBAWo2AgAgCyAGOgAAIApBAmoiCiEGA0AgBiACTw0CIAYsAAAQtgUQywRFDQIgBkEBaiEGDAALAAsDQCAGIAJPDQEgBiwAABC2BRDNBEUNASAGQQFqIQYMAAsACwJAAkAgB0EEahCPBUUNACAIIAogBiAFKAIAELUFGiAFIAUoAgAgBiAKa2o2AgAMAQsgCiAGEK8GQQAhDCAJEOAFIQ1BACEOIAohCwNAAkAgCyAGSQ0AIAMgCiAAa2ogBSgCABCvBgwCCwJAIAdBBGogDhCWBSwAAEEBSA0AIAwgB0EEaiAOEJYFLAAARw0AIAUgBSgCACIMQQFqNgIAIAwgDToAACAOIA4gB0EEahDpAkF/aklqIQ5BACEMCyAIIAssAAAQ5AMhDyAFIAUoAgAiEEEBajYCACAQIA86AAAgC0EBaiELIAxBAWohDAwACwALA0ACQAJAAkAgBiACSQ0AIAYhCwwBCyAGQQFqIQsgBiwAACIGQS5HDQEgCRDfBSEGIAUgBSgCACIMQQFqNgIAIAwgBjoAAAsgCCALIAIgBSgCABC1BRogBSAFKAIAIAIgC2tqIgY2AgAgBCAGIAMgASAAa2ogASACRhs2AgAgB0EEahDJDRogB0EQaiQADwsgCCAGEOQDIQYgBSAFKAIAIgxBAWo2AgAgDCAGOgAAIAshBgwACwALCwAgAEEAEIgGIAALFQAgACABIAIgAyAEIAVB1oUEEIwGC7AEAQZ/IwBBgAJrIgckACAHQiU3A/gBIAdB+AFqQQFyIAYgAhD4ARCEBiEIIAcgB0HQAWo2AswBELYFIQYCQAJAIAhFDQAgAhCFBiEJIAdBwABqIAU3AwAgByAENwM4IAcgCTYCMCAHQdABakEeIAYgB0H4AWogB0EwahD4BSEGDAELIAcgBDcDUCAHIAU3A1ggB0HQAWpBHiAGIAdB+AFqIAdB0ABqEPgFIQYLIAdB2QA2AoABIAdBxAFqQQAgB0GAAWoQhgYhCiAHQdABaiEJAkACQCAGQR5IDQAQtgUhBgJAAkAgCEUNACACEIUGIQkgB0EQaiAFNwMAIAcgBDcDCCAHIAk2AgAgB0HMAWogBiAHQfgBaiAHEIcGIQYMAQsgByAENwMgIAcgBTcDKCAHQcwBaiAGIAdB+AFqIAdBIGoQhwYhBgsgBkF/Rg0BIAogBygCzAEQiAYgBygCzAEhCQsgCSAJIAZqIgsgAhD5BSEMIAdB2QA2AoABIAdB+ABqQQAgB0GAAWoQhgYhCQJAAkAgBygCzAEiCCAHQdABakcNACAHQYABaiEGDAELIAZBAXQQugEiBkUNASAJIAYQiAYgBygCzAEhCAsgB0HsAGogAhDrAyAIIAwgCyAGIAdB9ABqIAdB8ABqIAdB7ABqEIkGIAdB7ABqEIQFGiABIAYgBygCdCAHKAJwIAIgAxD7BSECIAkQigYaIAoQigYaIAdBgAJqJAAgAg8LEMMNAAuwAQEEfyMAQeAAayIFJAAQtgUhBiAFIAQ2AgAgBUHAAGogBUHAAGogBUHAAGpBFCAGQYuDBCAFEPgFIgdqIgQgAhD5BSEGIAVBEGogAhDrAyAFQRBqEPkBIQggBUEQahCEBRogCCAFQcAAaiAEIAVBEGoQtQUaIAEgBUEQaiAHIAVBEGpqIgcgBUEQaiAGIAVBwABqa2ogBiAERhsgByACIAMQ+wUhAiAFQeAAaiQAIAILBwAgACgCDAsuAQF/IwBBEGsiAyQAIAAgA0EPaiADQQ5qEOgDIgAgASACENENIANBEGokACAACxQBAX8gACgCDCECIAAgATYCDCACC/UBAQF/IwBBIGsiBSQAIAUgATYCHAJAAkAgAhD4AUEBcQ0AIAAgASACIAMgBCAAKAIAKAIYEQoAIQIMAQsgBUEQaiACEOsDIAVBEGoQvAUhAiAFQRBqEIQFGgJAAkAgBEUNACAFQRBqIAIQvQUMAQsgBUEQaiACEL4FCyAFIAVBEGoQkgY2AgwDQCAFIAVBEGoQkwY2AggCQCAFQQxqIAVBCGoQlAYNACAFKAIcIQIgBUEQahDXDRoMAgsgBUEMahCVBigCACECIAVBHGoQzgIgAhDPAhogBUEMahCWBhogBUEcahDQAhoMAAsACyAFQSBqJAAgAgsMACAAIAAQlwYQmAYLFQAgACAAEJcGIAAQwgVBAnRqEJgGCwwAIAAgARCZBkEBcwsHACAAKAIACxEAIAAgACgCAEEEajYCACAACxgAAkAgABDTBkUNACAAEIAIDwsgABCDCAslAQF/IwBBEGsiAiQAIAJBDGogARC+CygCACEBIAJBEGokACABCw0AIAAQogggARCiCEYLEwAgACABIAIgAyAEQb+DBBCbBgu6AQEBfyMAQZABayIGJAAgBkIlNwOIASAGQYgBakEBciAFQQEgAhD4ARD3BRC2BSEFIAYgBDYCACAGQfsAaiAGQfsAaiAGQfsAakENIAUgBkGIAWogBhD4BWoiBSACEPkFIQQgBkEEaiACEOsDIAZB+wBqIAQgBSAGQRBqIAZBDGogBkEIaiAGQQRqEJwGIAZBBGoQhAUaIAEgBkEQaiAGKAIMIAYoAgggAiADEJ0GIQIgBkGQAWokACACC/kDAQh/IwBBEGsiByQAIAYQuQIhCCAHQQRqIAYQvAUiBhDoBQJAAkAgB0EEahCPBUUNACAIIAAgAiADEN0FGiAFIAMgAiAAa0ECdGoiBjYCAAwBCyAFIAM2AgAgACEJAkACQCAALQAAIgpBVWoOAwABAAELIAggCsAQ5gMhCiAFIAUoAgAiC0EEajYCACALIAo2AgAgAEEBaiEJCwJAIAIgCWtBAkgNACAJLQAAQTBHDQAgCS0AAUEgckH4AEcNACAIQTAQ5gMhCiAFIAUoAgAiC0EEajYCACALIAo2AgAgCCAJLAABEOYDIQogBSAFKAIAIgtBBGo2AgAgCyAKNgIAIAlBAmohCQsgCSACEK8GQQAhCiAGEOcFIQxBACELIAkhBgNAAkAgBiACSQ0AIAMgCSAAa0ECdGogBSgCABCxBiAFKAIAIQYMAgsCQCAHQQRqIAsQlgUtAABFDQAgCiAHQQRqIAsQlgUsAABHDQAgBSAFKAIAIgpBBGo2AgAgCiAMNgIAIAsgCyAHQQRqEOkCQX9qSWohC0EAIQoLIAggBiwAABDmAyENIAUgBSgCACIOQQRqNgIAIA4gDTYCACAGQQFqIQYgCkEBaiEKDAALAAsgBCAGIAMgASAAa0ECdGogASACRhs2AgAgB0EEahDJDRogB0EQaiQAC8sBAQR/IwBBEGsiBiQAAkACQCAADQBBACEHDAELIAQQjgYhCEEAIQcCQCACIAFrQQJ1IglBAUgNACAAIAEgCRDRAiAJRw0BCwJAIAggAyABa0ECdSIHa0EAIAggB0obIgFBAUgNACAAIAZBBGogASAFEK0GIgcQrgYgARDRAiEIIAcQ1w0aQQAhByAIIAFHDQELAkAgAyACa0ECdSIBQQFIDQBBACEHIAAgAiABENECIAFHDQELIARBABCQBhogACEHCyAGQRBqJAAgBwsTACAAIAEgAiADIARBuIMEEJ8GC7oBAQJ/IwBBgAJrIgYkACAGQiU3A/gBIAZB+AFqQQFyIAVBASACEPgBEPcFELYFIQUgBiAENwMAIAZB4AFqIAZB4AFqIAZB4AFqQRggBSAGQfgBaiAGEPgFaiIFIAIQ+QUhByAGQRRqIAIQ6wMgBkHgAWogByAFIAZBIGogBkEcaiAGQRhqIAZBFGoQnAYgBkEUahCEBRogASAGQSBqIAYoAhwgBigCGCACIAMQnQYhAiAGQYACaiQAIAILEwAgACABIAIgAyAEQb+DBBChBgu6AQEBfyMAQZABayIGJAAgBkIlNwOIASAGQYgBakEBciAFQQAgAhD4ARD3BRC2BSEFIAYgBDYCACAGQfsAaiAGQfsAaiAGQfsAakENIAUgBkGIAWogBhD4BWoiBSACEPkFIQQgBkEEaiACEOsDIAZB+wBqIAQgBSAGQRBqIAZBDGogBkEIaiAGQQRqEJwGIAZBBGoQhAUaIAEgBkEQaiAGKAIMIAYoAgggAiADEJ0GIQIgBkGQAWokACACCxMAIAAgASACIAMgBEG4gwQQowYLugEBAn8jAEGAAmsiBiQAIAZCJTcD+AEgBkH4AWpBAXIgBUEAIAIQ+AEQ9wUQtgUhBSAGIAQ3AwAgBkHgAWogBkHgAWogBkHgAWpBGCAFIAZB+AFqIAYQ+AVqIgUgAhD5BSEHIAZBFGogAhDrAyAGQeABaiAHIAUgBkEgaiAGQRxqIAZBGGogBkEUahCcBiAGQRRqEIQFGiABIAZBIGogBigCHCAGKAIYIAIgAxCdBiECIAZBgAJqJAAgAgsTACAAIAEgAiADIARBxIwEEKUGC4cEAQZ/IwBB8AJrIgYkACAGQiU3A+gCIAZB6AJqQQFyIAUgAhD4ARCEBiEHIAYgBkHAAmo2ArwCELYFIQUCQAJAIAdFDQAgAhCFBiEIIAYgBDkDKCAGIAg2AiAgBkHAAmpBHiAFIAZB6AJqIAZBIGoQ+AUhBQwBCyAGIAQ5AzAgBkHAAmpBHiAFIAZB6AJqIAZBMGoQ+AUhBQsgBkHZADYCUCAGQbQCakEAIAZB0ABqEIYGIQkgBkHAAmohCAJAAkAgBUEeSA0AELYFIQUCQAJAIAdFDQAgAhCFBiEIIAYgBDkDCCAGIAg2AgAgBkG8AmogBSAGQegCaiAGEIcGIQUMAQsgBiAEOQMQIAZBvAJqIAUgBkHoAmogBkEQahCHBiEFCyAFQX9GDQEgCSAGKAK8AhCIBiAGKAK8AiEICyAIIAggBWoiCiACEPkFIQsgBkHZADYCUCAGQcgAakEAIAZB0ABqEKYGIQgCQAJAIAYoArwCIgcgBkHAAmpHDQAgBkHQAGohBQwBCyAFQQN0ELoBIgVFDQEgCCAFEKcGIAYoArwCIQcLIAZBPGogAhDrAyAHIAsgCiAFIAZBxABqIAZBwABqIAZBPGoQqAYgBkE8ahCEBRogASAFIAYoAkQgBigCQCACIAMQnQYhAiAIEKkGGiAJEIoGGiAGQfACaiQAIAIPCxDDDQALKwEBfyMAQRBrIgMkACADIAE2AgwgACADQQxqIAIQ7wchASADQRBqJAAgAQstAQF/IAAQvAgoAgAhAiAAELwIIAE2AgACQCACRQ0AIAIgABC9CCgCABEEAAsL5QUBCn8jAEEQayIHJAAgBhC5AiEIIAdBBGogBhC8BSIJEOgFIAUgAzYCACAAIQoCQAJAIAAtAAAiBkFVag4DAAEAAQsgCCAGwBDmAyEGIAUgBSgCACILQQRqNgIAIAsgBjYCACAAQQFqIQoLIAohBgJAAkAgAiAKa0EBTA0AIAohBiAKLQAAQTBHDQAgCiEGIAotAAFBIHJB+ABHDQAgCEEwEOYDIQYgBSAFKAIAIgtBBGo2AgAgCyAGNgIAIAggCiwAARDmAyEGIAUgBSgCACILQQRqNgIAIAsgBjYCACAKQQJqIgohBgNAIAYgAk8NAiAGLAAAELYFEMsERQ0CIAZBAWohBgwACwALA0AgBiACTw0BIAYsAAAQtgUQzQRFDQEgBkEBaiEGDAALAAsCQAJAIAdBBGoQjwVFDQAgCCAKIAYgBSgCABDdBRogBSAFKAIAIAYgCmtBAnRqNgIADAELIAogBhCvBkEAIQwgCRDnBSENQQAhDiAKIQsDQAJAIAsgBkkNACADIAogAGtBAnRqIAUoAgAQsQYMAgsCQCAHQQRqIA4QlgUsAABBAUgNACAMIAdBBGogDhCWBSwAAEcNACAFIAUoAgAiDEEEajYCACAMIA02AgAgDiAOIAdBBGoQ6QJBf2pJaiEOQQAhDAsgCCALLAAAEOYDIQ8gBSAFKAIAIhBBBGo2AgAgECAPNgIAIAtBAWohCyAMQQFqIQwMAAsACwJAAkADQCAGIAJPDQEgBkEBaiELAkAgBiwAACIGQS5GDQAgCCAGEOYDIQYgBSAFKAIAIgxBBGo2AgAgDCAGNgIAIAshBgwBCwsgCRDmBSEGIAUgBSgCACIOQQRqIgw2AgAgDiAGNgIADAELIAUoAgAhDCAGIQsLIAggCyACIAwQ3QUaIAUgBSgCACACIAtrQQJ0aiIGNgIAIAQgBiADIAEgAGtBAnRqIAEgAkYbNgIAIAdBBGoQyQ0aIAdBEGokAAsLACAAQQAQpwYgAAsVACAAIAEgAiADIAQgBUHWhQQQqwYLsAQBBn8jAEGgA2siByQAIAdCJTcDmAMgB0GYA2pBAXIgBiACEPgBEIQGIQggByAHQfACajYC7AIQtgUhBgJAAkAgCEUNACACEIUGIQkgB0HAAGogBTcDACAHIAQ3AzggByAJNgIwIAdB8AJqQR4gBiAHQZgDaiAHQTBqEPgFIQYMAQsgByAENwNQIAcgBTcDWCAHQfACakEeIAYgB0GYA2ogB0HQAGoQ+AUhBgsgB0HZADYCgAEgB0HkAmpBACAHQYABahCGBiEKIAdB8AJqIQkCQAJAIAZBHkgNABC2BSEGAkACQCAIRQ0AIAIQhQYhCSAHQRBqIAU3AwAgByAENwMIIAcgCTYCACAHQewCaiAGIAdBmANqIAcQhwYhBgwBCyAHIAQ3AyAgByAFNwMoIAdB7AJqIAYgB0GYA2ogB0EgahCHBiEGCyAGQX9GDQEgCiAHKALsAhCIBiAHKALsAiEJCyAJIAkgBmoiCyACEPkFIQwgB0HZADYCgAEgB0H4AGpBACAHQYABahCmBiEJAkACQCAHKALsAiIIIAdB8AJqRw0AIAdBgAFqIQYMAQsgBkEDdBC6ASIGRQ0BIAkgBhCnBiAHKALsAiEICyAHQewAaiACEOsDIAggDCALIAYgB0H0AGogB0HwAGogB0HsAGoQqAYgB0HsAGoQhAUaIAEgBiAHKAJ0IAcoAnAgAiADEJ0GIQIgCRCpBhogChCKBhogB0GgA2okACACDwsQww0AC7YBAQR/IwBB0AFrIgUkABC2BSEGIAUgBDYCACAFQbABaiAFQbABaiAFQbABakEUIAZBi4MEIAUQ+AUiB2oiBCACEPkFIQYgBUEQaiACEOsDIAVBEGoQuQIhCCAFQRBqEIQFGiAIIAVBsAFqIAQgBUEQahDdBRogASAFQRBqIAVBEGogB0ECdGoiByAFQRBqIAYgBUGwAWprQQJ0aiAGIARGGyAHIAIgAxCdBiECIAVB0AFqJAAgAgsuAQF/IwBBEGsiAyQAIAAgA0EPaiADQQ5qEIAFIgAgASACEN8NIANBEGokACAACwoAIAAQlwYQqgMLCQAgACABELAGCwkAIAAgARC/CwsJACAAIAEQsgYLCQAgACABEMILC+gDAQR/IwBBEGsiCCQAIAggAjYCCCAIIAE2AgwgCEEEaiADEOsDIAhBBGoQ+QEhAiAIQQRqEIQFGiAEQQA2AgBBACEBAkADQCAGIAdGDQEgAQ0BAkAgCEEMaiAIQQhqEPoBDQACQAJAIAIgBiwAAEEAELQGQSVHDQAgBkEBaiIBIAdGDQJBACEJAkACQCACIAEsAABBABC0BiIBQcUARg0AQQEhCiABQf8BcUEwRg0AIAEhCwwBCyAGQQJqIgkgB0YNA0ECIQogAiAJLAAAQQAQtAYhCyABIQkLIAggACAIKAIMIAgoAgggAyAEIAUgCyAJIAAoAgAoAiQRDQA2AgwgBiAKakEBaiEGDAELAkAgAkEBIAYsAAAQ/AFFDQACQANAIAZBAWoiBiAHRg0BIAJBASAGLAAAEPwBDQALCwNAIAhBDGogCEEIahD6AQ0CIAJBASAIQQxqEPsBEPwBRQ0CIAhBDGoQ/QEaDAALAAsCQCACIAhBDGoQ+wEQjQUgAiAGLAAAEI0FRw0AIAZBAWohBiAIQQxqEP0BGgwBCyAEQQQ2AgALIAQoAgAhAQwBCwsgBEEENgIACwJAIAhBDGogCEEIahD6AUUNACAEIAQoAgBBAnI2AgALIAgoAgwhBiAIQRBqJAAgBgsTACAAIAEgAiAAKAIAKAIkEQMACwQAQQILQQEBfyMAQRBrIgYkACAGQqWQ6anSyc6S0wA3AwggACABIAIgAyAEIAUgBkEIaiAGQRBqELMGIQUgBkEQaiQAIAULMwEBfyAAIAEgAiADIAQgBSAAQQhqIAAoAggoAhQRAAAiBhDoAiAGEOgCIAYQ6QJqELMGC1YBAX8jAEEQayIGJAAgBiABNgIMIAZBCGogAxDrAyAGQQhqEPkBIQEgBkEIahCEBRogACAFQRhqIAZBDGogAiAEIAEQuQYgBigCDCEBIAZBEGokACABC0IAAkAgAiADIABBCGogACgCCCgCABEAACIAIABBqAFqIAUgBEEAEIgFIABrIgBBpwFKDQAgASAAQQxtQQdvNgIACwtWAQF/IwBBEGsiBiQAIAYgATYCDCAGQQhqIAMQ6wMgBkEIahD5ASEBIAZBCGoQhAUaIAAgBUEQaiAGQQxqIAIgBCABELsGIAYoAgwhASAGQRBqJAAgAQtCAAJAIAIgAyAAQQhqIAAoAggoAgQRAAAiACAAQaACaiAFIARBABCIBSAAayIAQZ8CSg0AIAEgAEEMbUEMbzYCAAsLVgEBfyMAQRBrIgYkACAGIAE2AgwgBkEIaiADEOsDIAZBCGoQ+QEhASAGQQhqEIQFGiAAIAVBFGogBkEMaiACIAQgARC9BiAGKAIMIQEgBkEQaiQAIAELQwAgAiADIAQgBUEEEL4GIQUCQCAELQAAQQRxDQAgASAFQdAPaiAFQewOaiAFIAVB5ABJGyAFQcUASBtBlHFqNgIACwvJAQEDfyMAQRBrIgUkACAFIAE2AgxBACEBQQYhBgJAAkAgACAFQQxqEPoBDQBBBCEGIANBwAAgABD7ASIHEPwBRQ0AIAMgB0EAELQGIQECQANAIAAQ/QEaIAFBUGohASAAIAVBDGoQ+gENASAEQQJIDQEgA0HAACAAEPsBIgYQ/AFFDQMgBEF/aiEEIAFBCmwgAyAGQQAQtAZqIQEMAAsAC0ECIQYgACAFQQxqEPoBRQ0BCyACIAIoAgAgBnI2AgALIAVBEGokACABC7cHAQJ/IwBBEGsiCCQAIAggATYCDCAEQQA2AgAgCCADEOsDIAgQ+QEhCSAIEIQFGgJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAGQb9/ag45AAEXBBcFFwYHFxcXChcXFxcODxAXFxcTFRcXFxcXFxcAAQIDAxcXARcIFxcJCxcMFw0XCxcXERIUFgsgACAFQRhqIAhBDGogAiAEIAkQuQYMGAsgACAFQRBqIAhBDGogAiAEIAkQuwYMFwsgAEEIaiAAKAIIKAIMEQAAIQEgCCAAIAgoAgwgAiADIAQgBSABEOgCIAEQ6AIgARDpAmoQswY2AgwMFgsgACAFQQxqIAhBDGogAiAEIAkQwAYMFQsgCEKl2r2pwuzLkvkANwMAIAggACABIAIgAyAEIAUgCCAIQQhqELMGNgIMDBQLIAhCpbK1qdKty5LkADcDACAIIAAgASACIAMgBCAFIAggCEEIahCzBjYCDAwTCyAAIAVBCGogCEEMaiACIAQgCRDBBgwSCyAAIAVBCGogCEEMaiACIAQgCRDCBgwRCyAAIAVBHGogCEEMaiACIAQgCRDDBgwQCyAAIAVBEGogCEEMaiACIAQgCRDEBgwPCyAAIAVBBGogCEEMaiACIAQgCRDFBgwOCyAAIAhBDGogAiAEIAkQxgYMDQsgACAFQQhqIAhBDGogAiAEIAkQxwYMDAsgCEEAKADowwQ2AAcgCEEAKQDhwwQ3AwAgCCAAIAEgAiADIAQgBSAIIAhBC2oQswY2AgwMCwsgCEEEakEALQDwwwQ6AAAgCEEAKADswwQ2AgAgCCAAIAEgAiADIAQgBSAIIAhBBWoQswY2AgwMCgsgACAFIAhBDGogAiAEIAkQyAYMCQsgCEKlkOmp0snOktMANwMAIAggACABIAIgAyAEIAUgCCAIQQhqELMGNgIMDAgLIAAgBUEYaiAIQQxqIAIgBCAJEMkGDAcLIAAgASACIAMgBCAFIAAoAgAoAhQRBQAhBAwHCyAAQQhqIAAoAggoAhgRAAAhASAIIAAgCCgCDCACIAMgBCAFIAEQ6AIgARDoAiABEOkCahCzBjYCDAwFCyAAIAVBFGogCEEMaiACIAQgCRC9BgwECyAAIAVBFGogCEEMaiACIAQgCRDKBgwDCyAGQSVGDQELIAQgBCgCAEEEcjYCAAwBCyAAIAhBDGogAiAEIAkQywYLIAgoAgwhBAsgCEEQaiQAIAQLPgAgAiADIAQgBUECEL4GIQUgBCgCACEDAkAgBUF/akEeSw0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALOwAgAiADIAQgBUECEL4GIQUgBCgCACEDAkAgBUEXSg0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALPgAgAiADIAQgBUECEL4GIQUgBCgCACEDAkAgBUF/akELSw0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALPAAgAiADIAQgBUEDEL4GIQUgBCgCACEDAkAgBUHtAkoNACADQQRxDQAgASAFNgIADwsgBCADQQRyNgIAC0AAIAIgAyAEIAVBAhC+BiEDIAQoAgAhBQJAIANBf2oiA0ELSw0AIAVBBHENACABIAM2AgAPCyAEIAVBBHI2AgALOwAgAiADIAQgBUECEL4GIQUgBCgCACEDAkAgBUE7Sg0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALYgEBfyMAQRBrIgUkACAFIAI2AgwCQANAIAEgBUEMahD6AQ0BIARBASABEPsBEPwBRQ0BIAEQ/QEaDAALAAsCQCABIAVBDGoQ+gFFDQAgAyADKAIAQQJyNgIACyAFQRBqJAALigEAAkAgAEEIaiAAKAIIKAIIEQAAIgAQ6QJBACAAQQxqEOkCa0cNACAEIAQoAgBBBHI2AgAPCyACIAMgACAAQRhqIAUgBEEAEIgFIQQgASgCACEFAkAgBCAARw0AIAVBDEcNACABQQA2AgAPCwJAIAQgAGtBDEcNACAFQQtKDQAgASAFQQxqNgIACws7ACACIAMgBCAFQQIQvgYhBSAEKAIAIQMCQCAFQTxKDQAgA0EEcQ0AIAEgBTYCAA8LIAQgA0EEcjYCAAs7ACACIAMgBCAFQQEQvgYhBSAEKAIAIQMCQCAFQQZKDQAgA0EEcQ0AIAEgBTYCAA8LIAQgA0EEcjYCAAspACACIAMgBCAFQQQQvgYhBQJAIAQtAABBBHENACABIAVBlHFqNgIACwtnAQF/IwBBEGsiBSQAIAUgAjYCDEEGIQICQAJAIAEgBUEMahD6AQ0AQQQhAiAEIAEQ+wFBABC0BkElRw0AQQIhAiABEP0BIAVBDGoQ+gFFDQELIAMgAygCACACcjYCAAsgBUEQaiQAC+gDAQR/IwBBEGsiCCQAIAggAjYCCCAIIAE2AgwgCEEEaiADEOsDIAhBBGoQuQIhAiAIQQRqEIQFGiAEQQA2AgBBACEBAkADQCAGIAdGDQEgAQ0BAkAgCEEMaiAIQQhqELoCDQACQAJAIAIgBigCAEEAEM0GQSVHDQAgBkEEaiIBIAdGDQJBACEJAkACQCACIAEoAgBBABDNBiIBQcUARg0AQQQhCiABQf8BcUEwRg0AIAEhCwwBCyAGQQhqIgkgB0YNA0EIIQogAiAJKAIAQQAQzQYhCyABIQkLIAggACAIKAIMIAgoAgggAyAEIAUgCyAJIAAoAgAoAiQRDQA2AgwgBiAKakEEaiEGDAELAkAgAkEBIAYoAgAQvAJFDQACQANAIAZBBGoiBiAHRg0BIAJBASAGKAIAELwCDQALCwNAIAhBDGogCEEIahC6Ag0CIAJBASAIQQxqELsCELwCRQ0CIAhBDGoQvQIaDAALAAsCQCACIAhBDGoQuwIQwQUgAiAGKAIAEMEFRw0AIAZBBGohBiAIQQxqEL0CGgwBCyAEQQQ2AgALIAQoAgAhAQwBCwsgBEEENgIACwJAIAhBDGogCEEIahC6AkUNACAEIAQoAgBBAnI2AgALIAgoAgwhBiAIQRBqJAAgBgsTACAAIAEgAiAAKAIAKAI0EQMACwQAQQILZAEBfyMAQSBrIgYkACAGQRhqQQApA6jFBDcDACAGQRBqQQApA6DFBDcDACAGQQApA5jFBDcDCCAGQQApA5DFBDcDACAAIAEgAiADIAQgBSAGIAZBIGoQzAYhBSAGQSBqJAAgBQs2AQF/IAAgASACIAMgBCAFIABBCGogACgCCCgCFBEAACIGENEGIAYQ0QYgBhDCBUECdGoQzAYLCgAgABDSBhCmAwsYAAJAIAAQ0wZFDQAgABCqBw8LIAAQxgsLDQAgABCoBy0AC0EHdgsKACAAEKgHKAIECw4AIAAQqActAAtB/wBxC1YBAX8jAEEQayIGJAAgBiABNgIMIAZBCGogAxDrAyAGQQhqELkCIQEgBkEIahCEBRogACAFQRhqIAZBDGogAiAEIAEQ1wYgBigCDCEBIAZBEGokACABC0IAAkAgAiADIABBCGogACgCCCgCABEAACIAIABBqAFqIAUgBEEAEL8FIABrIgBBpwFKDQAgASAAQQxtQQdvNgIACwtWAQF/IwBBEGsiBiQAIAYgATYCDCAGQQhqIAMQ6wMgBkEIahC5AiEBIAZBCGoQhAUaIAAgBUEQaiAGQQxqIAIgBCABENkGIAYoAgwhASAGQRBqJAAgAQtCAAJAIAIgAyAAQQhqIAAoAggoAgQRAAAiACAAQaACaiAFIARBABC/BSAAayIAQZ8CSg0AIAEgAEEMbUEMbzYCAAsLVgEBfyMAQRBrIgYkACAGIAE2AgwgBkEIaiADEOsDIAZBCGoQuQIhASAGQQhqEIQFGiAAIAVBFGogBkEMaiACIAQgARDbBiAGKAIMIQEgBkEQaiQAIAELQwAgAiADIAQgBUEEENwGIQUCQCAELQAAQQRxDQAgASAFQdAPaiAFQewOaiAFIAVB5ABJGyAFQcUASBtBlHFqNgIACwvJAQEDfyMAQRBrIgUkACAFIAE2AgxBACEBQQYhBgJAAkAgACAFQQxqELoCDQBBBCEGIANBwAAgABC7AiIHELwCRQ0AIAMgB0EAEM0GIQECQANAIAAQvQIaIAFBUGohASAAIAVBDGoQugINASAEQQJIDQEgA0HAACAAELsCIgYQvAJFDQMgBEF/aiEEIAFBCmwgAyAGQQAQzQZqIQEMAAsAC0ECIQYgACAFQQxqELoCRQ0BCyACIAIoAgAgBnI2AgALIAVBEGokACABC68IAQJ/IwBBMGsiCCQAIAggATYCLCAEQQA2AgAgCCADEOsDIAgQuQIhCSAIEIQFGgJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAGQb9/ag45AAEXBBcFFwYHFxcXChcXFxcODxAXFxcTFRcXFxcXFxcAAQIDAxcXARcIFxcJCxcMFw0XCxcXERIUFgsgACAFQRhqIAhBLGogAiAEIAkQ1wYMGAsgACAFQRBqIAhBLGogAiAEIAkQ2QYMFwsgAEEIaiAAKAIIKAIMEQAAIQEgCCAAIAgoAiwgAiADIAQgBSABENEGIAEQ0QYgARDCBUECdGoQzAY2AiwMFgsgACAFQQxqIAhBLGogAiAEIAkQ3gYMFQsgCEEYakEAKQOYxAQ3AwAgCEEQakEAKQOQxAQ3AwAgCEEAKQOIxAQ3AwggCEEAKQOAxAQ3AwAgCCAAIAEgAiADIAQgBSAIIAhBIGoQzAY2AiwMFAsgCEEYakEAKQO4xAQ3AwAgCEEQakEAKQOwxAQ3AwAgCEEAKQOoxAQ3AwggCEEAKQOgxAQ3AwAgCCAAIAEgAiADIAQgBSAIIAhBIGoQzAY2AiwMEwsgACAFQQhqIAhBLGogAiAEIAkQ3wYMEgsgACAFQQhqIAhBLGogAiAEIAkQ4AYMEQsgACAFQRxqIAhBLGogAiAEIAkQ4QYMEAsgACAFQRBqIAhBLGogAiAEIAkQ4gYMDwsgACAFQQRqIAhBLGogAiAEIAkQ4wYMDgsgACAIQSxqIAIgBCAJEOQGDA0LIAAgBUEIaiAIQSxqIAIgBCAJEOUGDAwLIAhBwMQEQSwQXSEGIAYgACABIAIgAyAEIAUgBiAGQSxqEMwGNgIsDAsLIAhBEGpBACgCgMUENgIAIAhBACkD+MQENwMIIAhBACkD8MQENwMAIAggACABIAIgAyAEIAUgCCAIQRRqEMwGNgIsDAoLIAAgBSAIQSxqIAIgBCAJEOYGDAkLIAhBGGpBACkDqMUENwMAIAhBEGpBACkDoMUENwMAIAhBACkDmMUENwMIIAhBACkDkMUENwMAIAggACABIAIgAyAEIAUgCCAIQSBqEMwGNgIsDAgLIAAgBUEYaiAIQSxqIAIgBCAJEOcGDAcLIAAgASACIAMgBCAFIAAoAgAoAhQRBQAhBAwHCyAAQQhqIAAoAggoAhgRAAAhASAIIAAgCCgCLCACIAMgBCAFIAEQ0QYgARDRBiABEMIFQQJ0ahDMBjYCLAwFCyAAIAVBFGogCEEsaiACIAQgCRDbBgwECyAAIAVBFGogCEEsaiACIAQgCRDoBgwDCyAGQSVGDQELIAQgBCgCAEEEcjYCAAwBCyAAIAhBLGogAiAEIAkQ6QYLIAgoAiwhBAsgCEEwaiQAIAQLPgAgAiADIAQgBUECENwGIQUgBCgCACEDAkAgBUF/akEeSw0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALOwAgAiADIAQgBUECENwGIQUgBCgCACEDAkAgBUEXSg0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALPgAgAiADIAQgBUECENwGIQUgBCgCACEDAkAgBUF/akELSw0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALPAAgAiADIAQgBUEDENwGIQUgBCgCACEDAkAgBUHtAkoNACADQQRxDQAgASAFNgIADwsgBCADQQRyNgIAC0AAIAIgAyAEIAVBAhDcBiEDIAQoAgAhBQJAIANBf2oiA0ELSw0AIAVBBHENACABIAM2AgAPCyAEIAVBBHI2AgALOwAgAiADIAQgBUECENwGIQUgBCgCACEDAkAgBUE7Sg0AIANBBHENACABIAU2AgAPCyAEIANBBHI2AgALYgEBfyMAQRBrIgUkACAFIAI2AgwCQANAIAEgBUEMahC6Ag0BIARBASABELsCELwCRQ0BIAEQvQIaDAALAAsCQCABIAVBDGoQugJFDQAgAyADKAIAQQJyNgIACyAFQRBqJAALigEAAkAgAEEIaiAAKAIIKAIIEQAAIgAQwgVBACAAQQxqEMIFa0cNACAEIAQoAgBBBHI2AgAPCyACIAMgACAAQRhqIAUgBEEAEL8FIQQgASgCACEFAkAgBCAARw0AIAVBDEcNACABQQA2AgAPCwJAIAQgAGtBDEcNACAFQQtKDQAgASAFQQxqNgIACws7ACACIAMgBCAFQQIQ3AYhBSAEKAIAIQMCQCAFQTxKDQAgA0EEcQ0AIAEgBTYCAA8LIAQgA0EEcjYCAAs7ACACIAMgBCAFQQEQ3AYhBSAEKAIAIQMCQCAFQQZKDQAgA0EEcQ0AIAEgBTYCAA8LIAQgA0EEcjYCAAspACACIAMgBCAFQQQQ3AYhBQJAIAQtAABBBHENACABIAVBlHFqNgIACwtnAQF/IwBBEGsiBSQAIAUgAjYCDEEGIQICQAJAIAEgBUEMahC6Ag0AQQQhAiAEIAEQuwJBABDNBkElRw0AQQIhAiABEL0CIAVBDGoQugJFDQELIAMgAygCACACcjYCAAsgBUEQaiQAC0wBAX8jAEGAAWsiByQAIAcgB0H0AGo2AgwgAEEIaiAHQRBqIAdBDGogBCAFIAYQ6wYgB0EQaiAHKAIMIAEQ7AYhACAHQYABaiQAIAALaAEBfyMAQRBrIgYkACAGQQA6AA8gBiAFOgAOIAYgBDoADSAGQSU6AAwCQCAFRQ0AIAZBDWogBkEOahDtBgsgAiABIAEgASACKAIAEO4GIAZBDGogAyAAKAIAENsEajYCACAGQRBqJAALKwEBfyMAQRBrIgMkACADQQhqIAAgASACEO8GIAMoAgwhAiADQRBqJAAgAgscAQF/IAAtAAAhAiAAIAEtAAA6AAAgASACOgAACwcAIAEgAGsLDQAgACABIAIgAxDICwtMAQF/IwBBoANrIgckACAHIAdBoANqNgIMIABBCGogB0EQaiAHQQxqIAQgBSAGEPEGIAdBEGogBygCDCABEPIGIQAgB0GgA2okACAAC4QBAQF/IwBBkAFrIgYkACAGIAZBhAFqNgIcIAAgBkEgaiAGQRxqIAMgBCAFEOsGIAZCADcDECAGIAZBIGo2AgwCQCABIAZBDGogASACKAIAEPMGIAZBEGogACgCABD0BiIAQX9HDQBB84QEEMQNAAsgAiABIABBAnRqNgIAIAZBkAFqJAALKwEBfyMAQRBrIgMkACADQQhqIAAgASACEPUGIAMoAgwhAiADQRBqJAAgAgsKACABIABrQQJ1Cz8BAX8jAEEQayIFJAAgBSAENgIMIAVBCGogBUEMahC5BSEEIAAgASACIAMQ6gQhAyAEELoFGiAFQRBqJAAgAwsNACAAIAEgAiADENYLCwUAEPcGCwUAEPgGCwUAQf8ACwUAEPcGCwgAIAAQ0gIaCwgAIAAQ0gIaCwgAIAAQ0gIaCwwAIABBAUEtEI8GGgsEAEEACwwAIABBgoaAIDYAAAsMACAAQYKGgCA2AAALBQAQ9wYLBQAQ9wYLCAAgABDSAhoLCAAgABDSAhoLCAAgABDSAhoLDAAgAEEBQS0QjwYaCwQAQQALDAAgAEGChoAgNgAACwwAIABBgoaAIDYAAAsFABCLBwsFABCMBwsIAEH/////BwsFABCLBwsIACAAENICGgsIACAAEJAHGgssAQF/IwBBEGsiASQAIAAgAUEPaiABQQ5qEJEHIgBBABCSByABQRBqJAAgAAsKACAAEOQLEJoLCwIACwgAIAAQkAcaCwwAIABBAUEtEK0GGgsEAEEACwwAIABBgoaAIDYAAAsMACAAQYKGgCA2AAALBQAQiwcLBQAQiwcLCAAgABDSAhoLCAAgABCQBxoLCAAgABCQBxoLDAAgAEEBQS0QrQYaCwQAQQALDAAgAEGChoAgNgAACwwAIABBgoaAIDYAAAuAAQECfyMAQRBrIgIkACABEOICEKIHIAAgAkEPaiACQQ5qEKMHIQACQAJAIAEQ3AINACABEOYCIQEgABDeAiIDQQhqIAFBCGooAgA2AgAgAyABKQIANwIAIAAgABDgAhDUAgwBCyAAIAEQ3wMQjQMgARDuAhDNDQsgAkEQaiQAIAALAgALDAAgABDGAyACEOULC4ABAQJ/IwBBEGsiAiQAIAEQpQcQpgcgACACQQ9qIAJBDmoQpwchAAJAAkAgARDTBg0AIAEQqAchASAAEKkHIgNBCGogAUEIaigCADYCACADIAEpAgA3AgAgACAAENUGEJIHDAELIAAgARCqBxCmAyABENQGENsNCyACQRBqJAAgAAsHACAAEK0LCwIACwwAIAAQmQsgAhDmCwsHACAAELgLCwcAIAAQrwsLCgAgABCoBygCAAuLBAECfyMAQZACayIHJAAgByACNgKIAiAHIAE2AowCIAdB2gA2AhAgB0GYAWogB0GgAWogB0EQahCGBiEBIAdBkAFqIAQQ6wMgB0GQAWoQ+QEhCCAHQQA6AI8BAkAgB0GMAmogAiADIAdBkAFqIAQQ+AEgBSAHQY8BaiAIIAEgB0GUAWogB0GEAmoQrQdFDQAgB0EAKACTiwQ2AIcBIAdBACkAjIsENwOAASAIIAdBgAFqIAdBigFqIAdB9gBqELUFGiAHQdkANgIQIAdBCGpBACAHQRBqEIYGIQggB0EQaiEEAkACQCAHKAKUASABEK4Ha0HjAEgNACAIIAcoApQBIAEQrgdrQQJqELoBEIgGIAgQrgdFDQEgCBCuByEECwJAIActAI8BQQFHDQAgBEEtOgAAIARBAWohBAsgARCuByECAkADQAJAIAIgBygClAFJDQAgBEEAOgAAIAcgBjYCACAHQRBqQbWEBCAHEIABQQFHDQIgCBCKBhoMBAsgBCAHQYABaiAHQfYAaiAHQfYAahCvByACEOIFIAdB9gBqa2otAAA6AAAgBEEBaiEEIAJBAWohAgwACwALQfWBBBDEDQALEMMNAAsCQCAHQYwCaiAHQYgCahD6AUUNACAFIAUoAgBBAnI2AgALIAcoAowCIQIgB0GQAWoQhAUaIAEQigYaIAdBkAJqJAAgAgsCAAujDgEIfyMAQZAEayILJAAgCyAKNgKIBCALIAE2AowEAkACQCAAIAtBjARqEPoBRQ0AIAUgBSgCAEEEcjYCAEEAIQAMAQsgC0HaADYCTCALIAtB6ABqIAtB8ABqIAtBzABqELEHIgwQsgciCjYCZCALIApBkANqNgJgIAtBzABqENICIQ0gC0HAAGoQ0gIhDiALQTRqENICIQ8gC0EoahDSAiEQIAtBHGoQ0gIhESACIAMgC0HcAGogC0HbAGogC0HaAGogDSAOIA8gECALQRhqELMHIAkgCBCuBzYCACAEQYAEcSESQQAhA0EAIQEDQCABIQICQAJAAkACQCADQQRGDQAgACALQYwEahD6AQ0AQQAhCiACIQECQAJAAkACQAJAAkAgC0HcAGogA2otAAAOBQEABAMFCQsgA0EDRg0HAkAgB0EBIAAQ+wEQ/AFFDQAgC0EQaiAAQQAQtAcgESALQRBqELUHENINDAILIAUgBSgCAEEEcjYCAEEAIQAMBgsgA0EDRg0GCwNAIAAgC0GMBGoQ+gENBiAHQQEgABD7ARD8AUUNBiALQRBqIABBABC0ByARIAtBEGoQtQcQ0g0MAAsACwJAIA8Q6QJFDQAgABD7AUH/AXEgD0EAEJYFLQAARw0AIAAQ/QEaIAZBADoAACAPIAIgDxDpAkEBSxshAQwGCwJAIBAQ6QJFDQAgABD7AUH/AXEgEEEAEJYFLQAARw0AIAAQ/QEaIAZBAToAACAQIAIgEBDpAkEBSxshAQwGCwJAIA8Q6QJFDQAgEBDpAkUNACAFIAUoAgBBBHI2AgBBACEADAQLAkAgDxDpAg0AIBAQ6QJFDQULIAYgEBDpAkU6AAAMBAsCQCADQQJJDQAgAg0AIBINAEEAIQEgA0ECRiALLQBfQQBHcUUNBQsgCyAOEO4FNgIMIAtBEGogC0EMahC2ByEKAkAgA0UNACADIAtB3ABqakF/ai0AAEEBSw0AAkADQCALIA4Q7wU2AgwgCiALQQxqELcHRQ0BIAdBASAKELgHLAAAEPwBRQ0BIAoQuQcaDAALAAsgCyAOEO4FNgIMAkAgCiALQQxqELoHIgEgERDpAksNACALIBEQ7wU2AgwgC0EMaiABELsHIBEQ7wUgDhDuBRC8Bw0BCyALIA4Q7gU2AgggCiALQQxqIAtBCGoQtgcoAgA2AgALIAsgCigCADYCDAJAA0AgCyAOEO8FNgIIIAtBDGogC0EIahC3B0UNASAAIAtBjARqEPoBDQEgABD7AUH/AXEgC0EMahC4By0AAEcNASAAEP0BGiALQQxqELkHGgwACwALIBJFDQMgCyAOEO8FNgIIIAtBDGogC0EIahC3B0UNAyAFIAUoAgBBBHI2AgBBACEADAILAkADQCAAIAtBjARqEPoBDQECQAJAIAdBwAAgABD7ASIBEPwBRQ0AAkAgCSgCACIEIAsoAogERw0AIAggCSALQYgEahC9ByAJKAIAIQQLIAkgBEEBajYCACAEIAE6AAAgCkEBaiEKDAELIA0Q6QJFDQIgCkUNAiABQf8BcSALLQBaQf8BcUcNAgJAIAsoAmQiASALKAJgRw0AIAwgC0HkAGogC0HgAGoQvgcgCygCZCEBCyALIAFBBGo2AmQgASAKNgIAQQAhCgsgABD9ARoMAAsACwJAIAwQsgcgCygCZCIBRg0AIApFDQACQCABIAsoAmBHDQAgDCALQeQAaiALQeAAahC+ByALKAJkIQELIAsgAUEEajYCZCABIAo2AgALAkAgCygCGEEBSA0AAkACQCAAIAtBjARqEPoBDQAgABD7AUH/AXEgCy0AW0YNAQsgBSAFKAIAQQRyNgIAQQAhAAwDCwNAIAAQ/QEaIAsoAhhBAUgNAQJAAkAgACALQYwEahD6AQ0AIAdBwAAgABD7ARD8AQ0BCyAFIAUoAgBBBHI2AgBBACEADAQLAkAgCSgCACALKAKIBEcNACAIIAkgC0GIBGoQvQcLIAAQ+wEhCiAJIAkoAgAiAUEBajYCACABIAo6AAAgCyALKAIYQX9qNgIYDAALAAsgAiEBIAkoAgAgCBCuB0cNAyAFIAUoAgBBBHI2AgBBACEADAELAkAgAkUNAEEBIQoDQCAKIAIQ6QJPDQECQAJAIAAgC0GMBGoQ+gENACAAEPsBQf8BcSACIAoQjgUtAABGDQELIAUgBSgCAEEEcjYCAEEAIQAMAwsgABD9ARogCkEBaiEKDAALAAtBASEAIAwQsgcgCygCZEYNAEEAIQAgC0EANgIQIA0gDBCyByALKAJkIAtBEGoQmQUCQCALKAIQRQ0AIAUgBSgCAEEEcjYCAAwBC0EBIQALIBEQyQ0aIBAQyQ0aIA8QyQ0aIA4QyQ0aIA0QyQ0aIAwQvwcaDAMLIAIhAQsgA0EBaiEDDAALAAsgC0GQBGokACAACwoAIAAQwAcoAgALBwAgAEEKagsWACAAIAEQqA0iAUEEaiACEPQDGiABCysBAX8jAEEQayIDJAAgAyABNgIMIAAgA0EMaiACEMkHIQEgA0EQaiQAIAELCgAgABDKBygCAAuAAwEBfyMAQRBrIgokAAJAAkAgAEUNACAKQQRqIAEQywciARDMByACIAooAgQ2AAAgCkEEaiABEM0HIAggCkEEahDWAhogCkEEahDJDRogCkEEaiABEM4HIAcgCkEEahDWAhogCkEEahDJDRogAyABEM8HOgAAIAQgARDQBzoAACAKQQRqIAEQ0QcgBSAKQQRqENYCGiAKQQRqEMkNGiAKQQRqIAEQ0gcgBiAKQQRqENYCGiAKQQRqEMkNGiABENMHIQEMAQsgCkEEaiABENQHIgEQ1QcgAiAKKAIENgAAIApBBGogARDWByAIIApBBGoQ1gIaIApBBGoQyQ0aIApBBGogARDXByAHIApBBGoQ1gIaIApBBGoQyQ0aIAMgARDYBzoAACAEIAEQ2Qc6AAAgCkEEaiABENoHIAUgCkEEahDWAhogCkEEahDJDRogCkEEaiABENsHIAYgCkEEahDWAhogCkEEahDJDRogARDcByEBCyAJIAE2AgAgCkEQaiQACxYAIAAgASgCABCFAsAgASgCABDdBxoLBwAgACwAAAsOACAAIAEQ3gc2AgAgAAsMACAAIAEQ3wdBAXMLBwAgACgCAAsRACAAIAAoAgBBAWo2AgAgAAsNACAAEOAHIAEQ3gdrCwwAIABBACABaxDiBwsLACAAIAEgAhDhBwvkAQEGfyMAQRBrIgMkACAAEOMHKAIAIQQCQAJAIAIoAgAgABCuB2siBRDVA0EBdk8NACAFQQF0IQUMAQsQ1QMhBQsgBUEBIAVBAUsbIQUgASgCACEGIAAQrgchBwJAAkAgBEHaAEcNAEEAIQgMAQsgABCuByEICwJAIAggBRC9ASIIRQ0AAkAgBEHaAEYNACAAEOQHGgsgA0HZADYCBCAAIANBCGogCCADQQRqEIYGIgQQ5QcaIAQQigYaIAEgABCuByAGIAdrajYCACACIAAQrgcgBWo2AgAgA0EQaiQADwsQww0AC+QBAQZ/IwBBEGsiAyQAIAAQ5gcoAgAhBAJAAkAgAigCACAAELIHayIFENUDQQF2Tw0AIAVBAXQhBQwBCxDVAyEFCyAFQQQgBRshBSABKAIAIQYgABCyByEHAkACQCAEQdoARw0AQQAhCAwBCyAAELIHIQgLAkAgCCAFEL0BIghFDQACQCAEQdoARg0AIAAQ5wcaCyADQdkANgIEIAAgA0EIaiAIIANBBGoQsQciBBDoBxogBBC/BxogASAAELIHIAYgB2tqNgIAIAIgABCyByAFQXxxajYCACADQRBqJAAPCxDDDQALCwAgAEEAEOoHIAALBwAgABCpDQsHACAAEKoNCwoAIABBBGoQ9QMLuAIBAn8jAEGQAWsiByQAIAcgAjYCiAEgByABNgKMASAHQdoANgIUIAdBGGogB0EgaiAHQRRqEIYGIQggB0EQaiAEEOsDIAdBEGoQ+QEhASAHQQA6AA8CQCAHQYwBaiACIAMgB0EQaiAEEPgBIAUgB0EPaiABIAggB0EUaiAHQYQBahCtB0UNACAGEMQHAkAgBy0AD0EBRw0AIAYgAUEtEOQDENINCyABQTAQ5AMhASAIEK4HIQIgBygCFCIDQX9qIQQgAUH/AXEhAQJAA0AgAiAETw0BIAItAAAgAUcNASACQQFqIQIMAAsACyAGIAIgAxDFBxoLAkAgB0GMAWogB0GIAWoQ+gFFDQAgBSAFKAIAQQJyNgIACyAHKAKMASECIAdBEGoQhAUaIAgQigYaIAdBkAFqJAAgAgtwAQN/IwBBEGsiASQAIAAQ6QIhAgJAAkAgABDcAkUNACAAELEDIQMgAUEAOgAPIAMgAUEPahC5AyAAQQAQ0gMMAQsgABCyAyEDIAFBADoADiADIAFBDmoQuQMgAEEAELgDCyAAIAIQ5wIgAUEQaiQAC9oBAQR/IwBBEGsiAyQAIAAQ6QIhBCAAEOoCIQUCQCABIAIQyAMiBkUNAAJAIAAgARDGBw0AAkAgBSAEayAGTw0AIAAgBSAEIAVrIAZqIAQgBEEAQQAQxwcLIAAgBhDlAiAAENgCIARqIQUCQANAIAEgAkYNASAFIAEQuQMgAUEBaiEBIAVBAWohBQwACwALIANBADoADyAFIANBD2oQuQMgACAGIARqEMgHDAELIAAgAyABIAIgABDfAhDhAiIBEOgCIAEQ6QIQ0A0aIAEQyQ0aCyADQRBqJAAgAAsaACAAEOgCIAAQ6AIgABDpAmpBAWogARDnCwspACAAIAEgAiADIAQgBSAGELMLIAAgAyAFayAGaiIGENIDIAAgBhDUAgscAAJAIAAQ3AJFDQAgACABENIDDwsgACABELgDCxYAIAAgARCrDSIBQQRqIAIQ9AMaIAELBwAgABCvDQsLACAAQfi0BRCJBQsRACAAIAEgASgCACgCLBECAAsRACAAIAEgASgCACgCIBECAAsRACAAIAEgASgCACgCHBECAAsPACAAIAAoAgAoAgwRAAALDwAgACAAKAIAKAIQEQAACxEAIAAgASABKAIAKAIUEQIACxEAIAAgASABKAIAKAIYEQIACw8AIAAgACgCACgCJBEAAAsLACAAQfC0BRCJBQsRACAAIAEgASgCACgCLBECAAsRACAAIAEgASgCACgCIBECAAsRACAAIAEgASgCACgCHBECAAsPACAAIAAoAgAoAgwRAAALDwAgACAAKAIAKAIQEQAACxEAIAAgASABKAIAKAIUEQIACxEAIAAgASABKAIAKAIYEQIACw8AIAAgACgCACgCJBEAAAsSACAAIAI2AgQgACABOgAAIAALBwAgACgCAAsNACAAEOAHIAEQ3gdGCwcAIAAoAgALLwEBfyMAQRBrIgMkACAAEOkLIAEQ6QsgAhDpCyADQQ9qEOoLIQIgA0EQaiQAIAILMgEBfyMAQRBrIgIkACACIAAoAgA2AgwgAkEMaiABEPALGiACKAIMIQAgAkEQaiQAIAALBwAgABDCBwsaAQF/IAAQwQcoAgAhASAAEMEHQQA2AgAgAQsiACAAIAEQ5AcQiAYgARDjBygCACEBIAAQwgcgATYCACAACwcAIAAQrQ0LGgEBfyAAEKwNKAIAIQEgABCsDUEANgIAIAELIgAgACABEOcHEOoHIAEQ5gcoAgAhASAAEK0NIAE2AgAgAAsJACAAIAEQ2AoLLQEBfyAAEKwNKAIAIQIgABCsDSABNgIAAkAgAkUNACACIAAQrQ0oAgARBAALC5EEAQJ/IwBB8ARrIgckACAHIAI2AugEIAcgATYC7AQgB0HaADYCECAHQcgBaiAHQdABaiAHQRBqEKYGIQEgB0HAAWogBBDrAyAHQcABahC5AiEIIAdBADoAvwECQCAHQewEaiACIAMgB0HAAWogBBD4ASAFIAdBvwFqIAggASAHQcQBaiAHQeAEahDsB0UNACAHQQAoAJOLBDYAtwEgB0EAKQCMiwQ3A7ABIAggB0GwAWogB0G6AWogB0GAAWoQ3QUaIAdB2QA2AhAgB0EIakEAIAdBEGoQhgYhCCAHQRBqIQQCQAJAIAcoAsQBIAEQ7QdrQYkDSA0AIAggBygCxAEgARDtB2tBAnVBAmoQugEQiAYgCBCuB0UNASAIEK4HIQQLAkAgBy0AvwFBAUcNACAEQS06AAAgBEEBaiEECyABEO0HIQICQANAAkAgAiAHKALEAUkNACAEQQA6AAAgByAGNgIAIAdBEGpBtYQEIAcQgAFBAUcNAiAIEIoGGgwECyAEIAdBsAFqIAdBgAFqIAdBgAFqEO4HIAIQ6QUgB0GAAWprQQJ1ai0AADoAACAEQQFqIQQgAkEEaiECDAALAAtB9YEEEMQNAAsQww0ACwJAIAdB7ARqIAdB6ARqELoCRQ0AIAUgBSgCAEECcjYCAAsgBygC7AQhAiAHQcABahCEBRogARCpBhogB0HwBGokACACC4YOAQh/IwBBkARrIgskACALIAo2AogEIAsgATYCjAQCQAJAIAAgC0GMBGoQugJFDQAgBSAFKAIAQQRyNgIAQQAhAAwBCyALQdoANgJIIAsgC0HoAGogC0HwAGogC0HIAGoQsQciDBCyByIKNgJkIAsgCkGQA2o2AmAgC0HIAGoQ0gIhDSALQTxqEJAHIQ4gC0EwahCQByEPIAtBJGoQkAchECALQRhqEJAHIREgAiADIAtB3ABqIAtB2ABqIAtB1ABqIA0gDiAPIBAgC0EUahDwByAJIAgQ7Qc2AgAgBEGABHEhEkEAIQNBACEBA0AgASECAkACQAJAAkAgA0EERg0AIAAgC0GMBGoQugINAEEAIQogAiEBAkACQAJAAkACQAJAIAtB3ABqIANqLQAADgUBAAQDBQkLIANBA0YNBwJAIAdBASAAELsCELwCRQ0AIAtBDGogAEEAEPEHIBEgC0EMahDyBxDgDQwCCyAFIAUoAgBBBHI2AgBBACEADAYLIANBA0YNBgsDQCAAIAtBjARqELoCDQYgB0EBIAAQuwIQvAJFDQYgC0EMaiAAQQAQ8QcgESALQQxqEPIHEOANDAALAAsCQCAPEMIFRQ0AIAAQuwIgD0EAEPMHKAIARw0AIAAQvQIaIAZBADoAACAPIAIgDxDCBUEBSxshAQwGCwJAIBAQwgVFDQAgABC7AiAQQQAQ8wcoAgBHDQAgABC9AhogBkEBOgAAIBAgAiAQEMIFQQFLGyEBDAYLAkAgDxDCBUUNACAQEMIFRQ0AIAUgBSgCAEEEcjYCAEEAIQAMBAsCQCAPEMIFDQAgEBDCBUUNBQsgBiAQEMIFRToAAAwECwJAIANBAkkNACACDQAgEg0AQQAhASADQQJGIAstAF9BAEdxRQ0FCyALIA4QkgY2AgggC0EMaiALQQhqEPQHIQoCQCADRQ0AIAMgC0HcAGpqQX9qLQAAQQFLDQACQANAIAsgDhCTBjYCCCAKIAtBCGoQ9QdFDQEgB0EBIAoQ9gcoAgAQvAJFDQEgChD3BxoMAAsACyALIA4QkgY2AggCQCAKIAtBCGoQ+AciASAREMIFSw0AIAsgERCTBjYCCCALQQhqIAEQ+QcgERCTBiAOEJIGEPoHDQELIAsgDhCSBjYCBCAKIAtBCGogC0EEahD0BygCADYCAAsgCyAKKAIANgIIAkADQCALIA4QkwY2AgQgC0EIaiALQQRqEPUHRQ0BIAAgC0GMBGoQugINASAAELsCIAtBCGoQ9gcoAgBHDQEgABC9AhogC0EIahD3BxoMAAsACyASRQ0DIAsgDhCTBjYCBCALQQhqIAtBBGoQ9QdFDQMgBSAFKAIAQQRyNgIAQQAhAAwCCwJAA0AgACALQYwEahC6Ag0BAkACQCAHQcAAIAAQuwIiARC8AkUNAAJAIAkoAgAiBCALKAKIBEcNACAIIAkgC0GIBGoQ+wcgCSgCACEECyAJIARBBGo2AgAgBCABNgIAIApBAWohCgwBCyANEOkCRQ0CIApFDQIgASALKAJURw0CAkAgCygCZCIBIAsoAmBHDQAgDCALQeQAaiALQeAAahC+ByALKAJkIQELIAsgAUEEajYCZCABIAo2AgBBACEKCyAAEL0CGgwACwALAkAgDBCyByALKAJkIgFGDQAgCkUNAAJAIAEgCygCYEcNACAMIAtB5ABqIAtB4ABqEL4HIAsoAmQhAQsgCyABQQRqNgJkIAEgCjYCAAsCQCALKAIUQQFIDQACQAJAIAAgC0GMBGoQugINACAAELsCIAsoAlhGDQELIAUgBSgCAEEEcjYCAEEAIQAMAwsDQCAAEL0CGiALKAIUQQFIDQECQAJAIAAgC0GMBGoQugINACAHQcAAIAAQuwIQvAINAQsgBSAFKAIAQQRyNgIAQQAhAAwECwJAIAkoAgAgCygCiARHDQAgCCAJIAtBiARqEPsHCyAAELsCIQogCSAJKAIAIgFBBGo2AgAgASAKNgIAIAsgCygCFEF/ajYCFAwACwALIAIhASAJKAIAIAgQ7QdHDQMgBSAFKAIAQQRyNgIAQQAhAAwBCwJAIAJFDQBBASEKA0AgCiACEMIFTw0BAkACQCAAIAtBjARqELoCDQAgABC7AiACIAoQwwUoAgBGDQELIAUgBSgCAEEEcjYCAEEAIQAMAwsgABC9AhogCkEBaiEKDAALAAtBASEAIAwQsgcgCygCZEYNAEEAIQAgC0EANgIMIA0gDBCyByALKAJkIAtBDGoQmQUCQCALKAIMRQ0AIAUgBSgCAEEEcjYCAAwBC0EBIQALIBEQ1w0aIBAQ1w0aIA8Q1w0aIA4Q1w0aIA0QyQ0aIAwQvwcaDAMLIAIhAQsgA0EBaiEDDAALAAsgC0GQBGokACAACwoAIAAQ/AcoAgALBwAgAEEoagsWACAAIAEQsA0iAUEEaiACEPQDGiABC4ADAQF/IwBBEGsiCiQAAkACQCAARQ0AIApBBGogARCOCCIBEI8IIAIgCigCBDYAACAKQQRqIAEQkAggCCAKQQRqEJEIGiAKQQRqENcNGiAKQQRqIAEQkgggByAKQQRqEJEIGiAKQQRqENcNGiADIAEQkwg2AgAgBCABEJQINgIAIApBBGogARCVCCAFIApBBGoQ1gIaIApBBGoQyQ0aIApBBGogARCWCCAGIApBBGoQkQgaIApBBGoQ1w0aIAEQlwghAQwBCyAKQQRqIAEQmAgiARCZCCACIAooAgQ2AAAgCkEEaiABEJoIIAggCkEEahCRCBogCkEEahDXDRogCkEEaiABEJsIIAcgCkEEahCRCBogCkEEahDXDRogAyABEJwINgIAIAQgARCdCDYCACAKQQRqIAEQngggBSAKQQRqENYCGiAKQQRqEMkNGiAKQQRqIAEQnwggBiAKQQRqEJEIGiAKQQRqENcNGiABEKAIIQELIAkgATYCACAKQRBqJAALFQAgACABKAIAEMQCIAEoAgAQoQgaCwcAIAAoAgALDQAgABCXBiABQQJ0agsOACAAIAEQogg2AgAgAAsMACAAIAEQowhBAXMLBwAgACgCAAsRACAAIAAoAgBBBGo2AgAgAAsQACAAEKQIIAEQoghrQQJ1CwwAIABBACABaxCmCAsLACAAIAEgAhClCAvkAQEGfyMAQRBrIgMkACAAEKcIKAIAIQQCQAJAIAIoAgAgABDtB2siBRDVA0EBdk8NACAFQQF0IQUMAQsQ1QMhBQsgBUEEIAUbIQUgASgCACEGIAAQ7QchBwJAAkAgBEHaAEcNAEEAIQgMAQsgABDtByEICwJAIAggBRC9ASIIRQ0AAkAgBEHaAEYNACAAEKgIGgsgA0HZADYCBCAAIANBCGogCCADQQRqEKYGIgQQqQgaIAQQqQYaIAEgABDtByAGIAdrajYCACACIAAQ7QcgBUF8cWo2AgAgA0EQaiQADwsQww0ACwcAIAAQsQ0LsAIBAn8jAEHAA2siByQAIAcgAjYCuAMgByABNgK8AyAHQdoANgIUIAdBGGogB0EgaiAHQRRqEKYGIQggB0EQaiAEEOsDIAdBEGoQuQIhASAHQQA6AA8CQCAHQbwDaiACIAMgB0EQaiAEEPgBIAUgB0EPaiABIAggB0EUaiAHQbADahDsB0UNACAGEP4HAkAgBy0AD0EBRw0AIAYgAUEtEOYDEOANCyABQTAQ5gMhASAIEO0HIQIgBygCFCIDQXxqIQQCQANAIAIgBE8NASACKAIAIAFHDQEgAkEEaiECDAALAAsgBiACIAMQ/wcaCwJAIAdBvANqIAdBuANqELoCRQ0AIAUgBSgCAEECcjYCAAsgBygCvAMhAiAHQRBqEIQFGiAIEKkGGiAHQcADaiQAIAILcAEDfyMAQRBrIgEkACAAEMIFIQICQAJAIAAQ0wZFDQAgABCACCEDIAFBADYCDCADIAFBDGoQgQggAEEAEIIIDAELIAAQgwghAyABQQA2AgggAyABQQhqEIEIIABBABCECAsgACACEIUIIAFBEGokAAvgAQEEfyMAQRBrIgMkACAAEMIFIQQgABCGCCEFAkAgASACEIcIIgZFDQACQCAAIAEQiAgNAAJAIAUgBGsgBk8NACAAIAUgBCAFayAGaiAEIARBAEEAEIkICyAAIAYQigggABCXBiAEQQJ0aiEFAkADQCABIAJGDQEgBSABEIEIIAFBBGohASAFQQRqIQUMAAsACyADQQA2AgQgBSADQQRqEIEIIAAgBiAEahCLCAwBCyAAIANBBGogASACIAAQjAgQjQgiARDRBiABEMIFEN4NGiABENcNGgsgA0EQaiQAIAALCgAgABCpBygCAAsMACAAIAEoAgA2AgALDAAgABCpByABNgIECwoAIAAQqQcQqQsLMQEBfyAAEKkHIgIgAi0AC0GAAXEgAUH/AHFyOgALIAAQqQciACAALQALQf8AcToACwsCAAsfAQF/QQEhAQJAIAAQ0wZFDQAgABC3C0F/aiEBCyABCwkAIAAgARDyCwsdACAAENEGIAAQ0QYgABDCBUECdGpBBGogARDzCwspACAAIAEgAiADIAQgBSAGEPELIAAgAyAFayAGaiIGEIIIIAAgBhCSBwsCAAscAAJAIAAQ0wZFDQAgACABEIIIDwsgACABEIQICwcAIAAQqwsLKwEBfyMAQRBrIgQkACAAIARBD2ogAxD0CyIDIAEgAhD1CyAEQRBqJAAgAwsLACAAQYi1BRCJBQsRACAAIAEgASgCACgCLBECAAsRACAAIAEgASgCACgCIBECAAsLACAAIAEQqgggAAsRACAAIAEgASgCACgCHBECAAsPACAAIAAoAgAoAgwRAAALDwAgACAAKAIAKAIQEQAACxEAIAAgASABKAIAKAIUEQIACxEAIAAgASABKAIAKAIYEQIACw8AIAAgACgCACgCJBEAAAsLACAAQYC1BRCJBQsRACAAIAEgASgCACgCLBECAAsRACAAIAEgASgCACgCIBECAAsRACAA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9AMgBygC8AMgDyAOIBAgBygCyAMQuwggASACIAcoAiQgBygCICADIAQQnQYhCCAREKkGGiAQENcNGiAOENcNGiAPEMkNGiAHQfwDahCEBRogCxCpBhogChCKBhogB0GgCGokACAIDwsQww0ACwoAIAAQvghBAXMLxgMBAX8jAEEQayIKJAACQAJAIABFDQAgAhCOCCECAkACQCABRQ0AIApBBGogAhCPCCADIAooAgQ2AAAgCkEEaiACEJAIIAggCkEEahCRCBogCkEEahDXDRoMAQsgCkEEaiACEL8IIAMgCigCBDYAACAKQQRqIAIQkgggCCAKQQRqEJEIGiAKQQRqENcNGgsgBCACEJMINgIAIAUgAhCUCDYCACAKQQRqIAIQlQggBiAKQQRqENYCGiAKQQRqEMkNGiAKQQRqIAIQlgggByAKQQRqEJEIGiAKQQRqENcNGiACEJcIIQIMAQsgAhCYCCECAkACQCABRQ0AIApBBGogAhCZCCADIAooAgQ2AAAgCkEEaiACEJoIIAggCkEEahCRCBogCkEEahDXDRoMAQsgCkEEaiACEMAIIAMgCigCBDYAACAKQQRqIAIQmwggCCAKQQRqEJEIGiAKQQRqENcNGgsgBCACEJwINgIAIAUgAhCdCDYCACAKQQRqIAIQngggBiAKQQRqENYCGiAKQQRqEMkNGiAKQQRqIAIQnwggByAKQQRqEJEIGiAKQQRqENcNGiACEKAIIQILIAkgAjYCACAKQRBqJAALwwYBCn8jAEEQayIPJAAgAiAANgIAQQRBACAHGyEQIANBgARxIRFBACESA0ACQCASQQRHDQACQCANEMIFQQFNDQAgDyANEMEINgIMIAIgD0EMakEBEMIIIA0QwwggAigCABDECDYCAAsCQCADQbABcSIHQRBGDQACQCAHQSBHDQAgAigCACEACyABIAA2AgALIA9BEGokAA8LAkACQAJAAkACQAJAIAggEmotAAAOBQABAwIEBQsgASACKAIANgIADAQLIAEgAigCADYCACAGQSAQ5gMhByACIAIoAgAiE0EEajYCACATIAc2AgAMAwsgDRDEBQ0CIA1BABDDBSgCACEHIAIgAigCACITQQRqNgIAIBMgBzYCAAwCCyAMEMQFIQcgEUUNASAHDQEgAiAMEMEIIAwQwwggAigCABDECDYCAAwB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DABB2MIFQQEQuQkaCxAAIAAgAUHYtAUQngkQnwkLDABB5MIFQQEQugkaCxAAIAAgAUHgtAUQngkQnwkLDABB8MIFQQEQuwkaCxAAIAAgAUHotAUQngkQnwkLDABB/MIFQQEQvAkaCxAAIAAgAUGwtQUQngkQnwkLDABBhMMFQQEQvQkaCxAAIAAgAUG4tQUQngkQnwkLFwAgACABNgIEIABBoPkEQQhqNgIAIAALFAAgACABEKMMIgFBBGoQpAwaIAELCwAgACABNgIAIAALCgAgACABEKUMGgtnAQJ/IwBBEGsiAiQAAkAgABCmDCABTw0AIAAQpwwACyACQQhqIAAQqAwgARCpDCAAIAIoAggiATYCBCAAIAE2AgAgAigCDCEDIAAQqgwgASADQQJ0ajYCACAAQQAQqwwgAkEQaiQAC14BA38jAEEQayICJAAgAkEEaiAAIAEQrAwiAygCBCEBIAMoAgghBANAAkAgASAERw0AIAMQrQwaIAJBEGokAA8LIAAQqAwgARCuDBCvDCADIAFBBGoiATYCBAwACwALCQAgAEEBOgAACxAAIAAoAgQgACgCAGtBAnULDAAgACAAKAIAEMEMCwIACzEBAX8jAEEQayIBJAAgASAANgIMIAAgAUEMahDnCSAAKAIEIQAgAUEQaiQAIABBf2oLeAECfyMAQRBrIgMkACABEMAJIANBDGogARDHCSEEAkAgAEEIaiIBEJsJIAJLDQAgASACQQFqEMoJCwJAIAEgAhC/CSgCAEUNACABIAIQvwkoAgAQywkaCyAEEMwJIQAgASACEL8JIAA2AgAgBBDICRogA0EQaiQACxQAIAAgARDVCCIBQdTZBDYCACABCxQAIAAgARDVCCIBQfTZBDYCACABCzUAIAAgAxDVCBD9CSIDIAI6AAwgAyABNgIIIANBzMUENgIAAkAgAQ0AIANBgMYENgIICyADCxcAIAAgARDVCBD9CSIBQbjRBDYCACABCxcAIAAgARDVCBCQCiIBQczSBDYCACABCx8AIAAgARDVCBCQCiIBQYjOBDYCACABELYFNgIIIAELFwAgACABENUIEJAKIgFB4NMENgIAIAELFwAgACABENUIEJAKIgFByNUENgIAIAELFwAgACABENUIEJAKIgFB1NQENgIAIAELFwAgACABENUIEJAKIgFBvNYENgIA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ASACEHELCgAgACABIAIQcQsLACAAIAEgAhDvBAsLACAAIAEgAhDvBAsLACAAIAE2AgAgAAsLACAAIAE2AgAgAAthAQF/IwBBEGsiAiQAIAIgADYCDAJAIAAgAUYNAANAIAIgAUF/aiIBNgIIIAAgAU8NASACQQxqIAJBCGoQwAsgAiACKAIMQQFqIgA2AgwgAigCCCEBDAALAAsgAkEQaiQACw8AIAAoAgAgASgCABDBCwsJACAAIAEQ7QYLYQEBfyMAQRBrIgIkACACIAA2AgwCQCAAIAFGDQADQCACIAFBfGoiATYCCCAAIAFPDQEgAkEMaiACQQhqEMMLIAIgAigCDEEEaiIANgIMIAIoAgghAQwACwALIAJBEGokAAsPACAAKAIAIAEoAgAQxAsLCQAgACABEMULCxwBAX8gACgCACECIAAgASgCADYCACABIAI2AgALCgAgABCoBxDHCwsEACAACw0AIAAgASACIAMQyQsLaQEBfyMAQSBrIgQkACAEQRhqIAEgAhDKCyAEQRBqIARBDGogBCgCGCAEKAIcIAMQywsQzAsgBCABIAQoAhAQzQs2AgwgBCADIAQoAhQQzgs2AgggACAEQQxqIARBCGoQzwsgBEEgaiQACwsAIAAgASACENALCwcAIAAQ0QsLawEBfyMAQRBrIgUkACAFIAI2AgggBSAENgIMAkADQCACIANGDQEgAiwAACEEIAVBDGoQlQIgBBCWAhogBSACQQFqIgI2AgggBUEMahCXAhoMAAsACyAAIAVBCGogBUEMahDPCyAFQRBqJAALCQAgACABENMLCwkAIAAgARDUCwsMACAAIAEgAhDSCxoLOAEBfyMAQRBrIgMkACADIAEQ/wI2AgwgAyACEP8CNgIIIAAgA0EMaiADQQhqENULGiADQRBqJAALBAAgAAsYACAAIAEoAgA2AgAgACACKAIANgIEIAALCQAgACABEIIDCwQAIAELGAAgACABKAIANgIAIAAgAigCADYCBCAACw0AIAAgASACIAMQ1wsLaQEBfyMAQSBrIgQkACAEQRhqIAEgAhDYCyAEQRBqIARBDGogBCgCGCAEKAIcIAMQ2QsQ2gsgBCABIAQoAhAQ2ws2AgwgBCADIAQoAhQQ3As2AgggACAEQQxqIARBCGoQ3QsgBEEgaiQACwsAIAAgASACEN4LCwcAIAAQ3wsLawEBfyMAQRBrIgUkACAFIAI2AgggBSAENgIMAkADQCACIANGDQEgAigCACEEIAVBDGoQzgIgBBDPAhogBSACQQRqIgI2AgggBUEMahDQAhoMAAsACyAAIAVBCGogBUEMahDdCyAFQRBqJAALCQAgACABEOELCwkAIAAgARDiCwsMACAAIAEgAhDgCxoLOAEBfyMAQRBrIgMkACADIAEQmAM2AgwgAyACEJgDNgIIIAAgA0EMaiADQQhqEOMLGiADQRBqJAALBAAgAAsYACAAIAEoAgA2AgAgACACKAIANgIEIAALCQAgACABEJsDCwQAIAELGAAgACABKAIANgIAIAAgAigCADYCBCAACxUAIABCADcCACAAQQhqQQA2AgAgAAsEACAACwQAIAALWgEBfyMAQRBrIgMkACADIAE2AgggAyAANgIMIAMgAjYCBEEAIQECQCADQQNqIANBBGogA0EMahDoCw0AIANBAmogA0EEaiADQQhqEOgLIQELIANBEGokACABCw0AIAEoAgAgAigCAEkLBwAgABDsCwsOACAAIAIgASAAaxDrCwsLACAAIAEgAhByRQsnAQF/IwBBEGsiASQAIAEgADYCDCABQQxqEO0LIQAgAUEQaiQAIAALBwAgABDuCwsKACAAKAIAEO8LCyoBAX8jAEEQayIBJAAgASAANgIMIAFBDGoQ3gcQ2QIhACABQRBqJAAgAAsRACAAIAAoAgAgAWo2AgAgAAuQAgEDfyMAQRBrIgckAAJAIAAQoAsiCCABayACSQ0AIAAQlwYhCQJAIAhBAXZBeGogAU0NACAHIAFBAXQ2AgwgByACIAFqNgIEIAdBBGogB0EMahDsAygCABCiC0EBaiEICyAAELQLIAdBBGogABCMCCAIEKMLIAcoAgQiCCAHKAIIEKQLAkAgBEUNACAIEKoDIAkQqgMgBBCmAhoLAkAgAyAFIARqIgJGDQAgCBCqAyAEQQJ0IgRqIAZBAnRqIAkQqgMgBGogBUECdGogAyACaxCmAhoLAkAgAUEBaiIBQQJGDQAgABCMCCAJIAEQtQsLIAAgCBClCyAAIAcoAggQpgsgB0EQaiQADwsgABCnCwALCgAgASAAa0ECdQtaAQF/IwBBEGsiAyQAIAMgATYCCCADIAA2AgwgAyACNgIEQQAhAQJAIANBA2ogA0EE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BAAgAAsJACAAIAEQig0LBwAgABCLDQsLACAAIAE2AgAgAAsNACAAKAIAEIwNEI0NCwcAIAAQjw0LBwAgABCODQsNACAAKAIAEJANNgIECwcAIAAoAgALGQEBf0EAQQAoAvS2BUEBaiIANgL0tgUgAAsWACAAIAEQlA0iAUEEaiACEPQDGiABCwcAIAAQlQ0LCgAgAEEEahD1AwsOACAAIAEoAgA2AgAgAAsEACAAC14BAn8jAEEQayIDJAACQCACIAAQwgUiBE0NACAAIAIgBGsQiggLIAAgAhCLCCADQQA2AgwgASACQQJ0aiADQQxqEIEIAkAgAiAETw0AIAAgBBCFCAsgA0EQaiQAIAALCgAgASAAa0EMbQsLACAAIAEgAhDXBAsFABCaDQsIAEGAgICAeAsFABCdDQsFABCeDQsNAEKAgICAgICAgIB/Cw0AQv///////////wALCwAgACABIAIQ1AQLBQAQoQ0LBgBB//8DCwUAEKMNCwQAQn8LDAAgACABELYFEPAECwwAIAAgARC2BRDxBAs9AgF/AX4jAEEQayIDJAAgAyABIAIQtgUQ8gQgAykDACEEIAAgA0EIaikDADcDCCAAIAQ3AwAgA0EQaiQACwoAIAEgAGtBDG0LDgAgACABKAIANgIAIAALBAAgAAsEACAACw4AIAAgASgCADYCACAACwcAIAAQrg0LCgAgAEEEahD1AwsEACAACwQAIAALDgAgACABKAIANgIAIAALBAAgAAsEACAACwUAENgJCwQAIAALAwAAC0UBAn8jAEEQayICJABBACEDAkAgAEEDcQ0AIAEgAHANACACQQxqIAAgARDAASEAQQAgAigCDCAAGyEDCyACQRBqJAAgAwsTAAJAIAAQuA0iAA0AELkNCyAACzEBAn8gAEEBIABBAUsbIQECQANAIAEQugEiAg0BEOwNIgBFDQEgABEHAAwACwALIAILBgAQww0ACwcAIAAQvAELBwAgABC6DQsHACAAELoNCxUAAkAgACABEL4NIgENABC5DQsgAQs/AQJ/IAFBBCABQQRLGyECIABBASAAQQFLGyEAAkADQCACIAAQvw0iAw0BEOwNIgFFDQEgAREHAAwACwALIAMLIQEBfyAAIAAgAWpBf2pBACAAa3EiAiABIAIgAUsbELYNCwcAIAAQwQ0LBwAgABC8AQsJ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U0NJSQBMQU5HAElORgBDAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AHN0ZDo6YmFzaWNfc3RyaW5nPHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+ADAxMjM0NTY3ODkAQy5VVEYtOAAuAC0AKG51bGwpACUAYWRqdXN0ZWRQdHIgJiYgImNhdGNoaW5nIGEgY2xhc3Mgd2l0aG91dCBhbiBvYmplY3Q/IgBIaSBmcm9tIEMrKyBMYW5kLCBDaGVja1ZlcnNpb24oKSBub3QgaW1wbGVtZW50ZWQgeWV0IQBQdXJlIHZpcnR1YWwgZnVuY3Rpb24gY2FsbGVkIQBsaWJjKythYmk6IAAKAAkATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUAYEcBAEUGAQBOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQAAYEcBAIwGAQBOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAAYEcBANQGAQBOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQAAAGBHAQAcBwEATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUAAABgRwEAaAcBAE4xMGVtc2NyaXB0ZW4zdmFsRQAAYEcBALQHAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ljRUUAAGBHAQDQBwEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAABgRwEA+AcBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWhFRQAAYEcBACAIAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lzRUUAAGBHAQBICAEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAABgRwEAcAgBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQAAYEcBAJgIAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lqRUUAAGBHAQDACAEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAABgRwEA6AgBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SW1FRQAAYEcBABAJAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l4RUUAAGBHAQA4CQEATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJeUVFAABgRwEAYAkBAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAAYEcBAIgJAQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAAGBHAQCwCQEAAAAAAAAAAABERwEAREcBAERHAQBERwEAZnBmZmYAAACoRgEAdnAAAFBIAQAAAAAAAAAAAAAAAADRdJ4AV529KoBwUg///z4nCgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUYAAAANQAAAHEAAABr////zvv//5K///8AAAAAAAAAABkACwAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQAKChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAABkACw0ZGRkADQAAAgAJDgAAAAkADgAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAATAAAAABMAAAAACQwAAAAAAAwAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADwAAAAQPAAAAAAkQAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAABEAAAAAEQAAAAAJEgAAAAAAEgAAEgAAGgAAABoaGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAGhoaAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAFwAAAAAXAAAAAAkUAAAAAAAUAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAAAAAAAAAAAABUAAAAAFQAAAAAJFgAAAAAAFgAAFgAAMDEyMzQ1Njc4OUFCQ0RFRv////////////////////////////////////////////////////////////////8AAQIDBAUGBwgJ/////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAECBAcDBgUAAAAAAAAAAgAAwAMAAMAEAADABQAAwAYAAMAHAADACAAAwAkAAMAKAADACwAAwAwAAMANAADADgAAwA8AAMAQAADAEQAAwBIAAMATAADAFAAAwBUAAMAWAADAFwAAwBgAAMAZAADAGgAAwBsAAMAcAADAHQAAwB4AAMAfAADAAAAAswEAAMMCAADDAwAAwwQAAMMFAADDBgAAwwcAAMMIAADDCQAAwwoAAMMLAADDDAAAww0AANMOAADDDwAAwwAADLsBAAzDAgAMwwMADMMEAAzbAAAAANgPAQAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAAgAAAAAAAAAEBABAB0AAAAeAAAA+P////j///8QEAEAHwAAACAAAABoDgEAfA4BAAQAAAAAAAAAWBABACEAAAAiAAAA/P////z///9YEAEAIwAAACQAAACYDgEArA4BAAAAAADsEAEAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAIAAAAAAAAACQRAQAzAAAANAAAAPj////4////JBEBADUAAAA2AAAACA8BABwPAQAEAAAAAAAAAGwRAQA3AAAAOAAAAPz////8////bBEBADkAAAA6AAAAOA8BAEwPAQAAAAAAmA8BADsAAAA8AAAATlN0M19fMjliYXNpY19pb3NJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAACIRwEAbA8BAKgRAQBOU3QzX18yMTViYXNpY19zdHJlYW1idWZJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAAAAYEcBAKQPAQBOU3QzX18yMTNiYXNpY19pc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAADkRwEA4A8BAAAAAAABAAAAmA8BAAP0//9OU3QzX18yMTNiYXNpY19vc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAADkRwEAKBABAAAAAAABAAAAmA8BAAP0//8AAAAArBABAD0AAAA+AAAATlN0M19fMjliYXNpY19pb3NJd05TXzExY2hhcl90cmFpdHNJd0VFRUUAAACIRwEAgBABAKgRAQBOU3QzX18yMTViYXNpY19zdHJlYW1idWZJd05TXzExY2hhcl90cmFpdHNJd0VFRUUA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AAAATQAAAAAAAAAAAAAAAAAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAAAAAAAQsAQBtAAAAbgAAAG8AAAAAAAAAZCwBAHAAAABxAAAAbwAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAFAgAABQAAAAUAAAAFAAAABQAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAMCAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAABCAQAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAACoBAAAqAQAAKgEAACoBAAAqAQAAKgEAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAMgEAADIBAAAyAQAAMgEAADIBAAAyAQAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAACCAAAAggAAAIIAAACCAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwrAQB6AAAAewAAAG8AAAB8AAAAfQAAAH4AAAB/AAAAgAAAAIEAAACCAAAAAAAAAJwsAQCDAAAAhAAAAG8AAACFAAAAhgAAAIcAAACIAAAAiQAAAAAAAADALAEAigAAAIsAAABvAAAAjAAAAI0AAACOAAAAjwAAAJAAAAB0AAAAcgAAAHUAAABlAAAAAAAAAGYAAABhAAAAbAAAAHMAAABlAAAAAAAAACUAAABtAAAALwAAACUAAABkAAAALwAAACUAAAB5AAAAAAAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAAAAAACUAAABhAAAAIAAAACUAAABiAAAAIAAAACUAAABkAAAAIAAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABZAAAAAAAAACUAAABJAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABwAAAAAAAAAAAAAACkKAEAkQAAAJIAAABvAAAATlN0M19fMjZsb2NhbGU1ZmFjZXRFAAAAiEcBAIwoAQDQPAEAAAAAACQpAQCRAAAAkwAAAG8AAACUAAAAlQAAAJYAAACXAAAAmAAAAJkAAACaAAAAmwAAAJwAAACdAAAAngAAAJ8AAABOU3QzX18yNWN0eXBlSXdFRQBOU3QzX18yMTBjdHlwZV9iYXNlRQAAYEcBAAYpAQDkRwEA9CgBAAAAAAACAAAApCgBAAIAAAAcKQEAAgAAAAAAAAC4KQEAkQAAAKAAAABvAAAAoQAAAKIAAACjAAAApAAAAKUAAACmAAAApwAAAE5TdDNfXzI3Y29kZWN2dEljYzExX19tYnN0YXRlX3RFRQBOU3QzX18yMTJjb2RlY3Z0X2Jhc2VFAAAAAGBHAQCWKQEA5EcBAHQpAQAAAAAAAgAAAKQoAQACAAAAsCkBAAIAAAAAAAAALCoBAJEAAACoAAAAbwAAAKkAAACqAAAAqwAAAKwAAACtAAAArgAAAK8AAABOU3QzX18yN2NvZGVjdnRJRHNjMTFfX21ic3RhdGVfdEVFAADkRwEACCoBAAAAAAACAAAApCgBAAIAAACwKQEAAgAAAAAAAACgKgEAkQAAALAAAABvAAAAsQAAALIAAACzAAAAtAAAALUAAAC2AAAAtwAAAE5TdDNfXzI3Y29kZWN2dElEc0R1MTFfX21ic3RhdGVfdEVFAORHAQB8KgEAAAAAAAIAAACkKAEAAgAAALApAQACAAAAAAAAABQrAQCRAAAAuAAAAG8AAAC5AAAAugAAALsAAAC8AAAAvQAAAL4AAAC/AAAATlN0M19fMjdjb2RlY3Z0SURpYzExX19tYnN0YXRlX3RFRQAA5EcBAPAqAQAAAAAAAgAAAKQoAQACAAAAsCkBAAIAAAAAAAAAiCsBAJEAAADAAAAAbwAAAMEAAADCAAAAwwAAAMQAAADFAAAAxgAAAMcAAABOU3QzX18yN2NvZGVjdnRJRGlEdTExX19tYnN0YXRlX3RFRQDkRwEAZCsBAAAAAAACAAAApCgBAAIAAACwKQEAAgAAAE5TdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFRQAAAORHAQCoKwEAAAAAAAIAAACkKAEAAgAAALApAQACAAAATlN0M19fMjZsb2NhbGU1X19pbXBFAAAAiEcBAOwrAQCkKAEATlN0M19fMjdjb2xsYXRlSWNFRQCIRwEAECwBAKQoAQBOU3QzX18yN2NvbGxhdGVJd0VFAIhHAQAwLAEApCgBAE5TdDNfXzI1Y3R5cGVJY0VFAAAA5EcBAFAsAQAAAAAAAgAAAKQoAQACAAAAHCkBAAIAAABOU3QzX18yOG51bXB1bmN0SWNFRQAAAACIRwEAhCwBAKQoAQBOU3QzX18yOG51bXB1bmN0SXdFRQAAAACIRwEAqCwBAKQoAQAAAAAAJCwBAMgAAADJAAAAbwAAAMoAAADLAAAAzAAAAAAAAABELAEAzQAAAM4AAABvAAAAzwAAANAAAADRAAAAAAAAAOAtAQCRAAAA0gAAAG8AAADTAAAA1AAAANUAAADWAAAA1wAAANgAAADZAAAA2gAAANsAAADcAAAA3QAAAE5TdDNfXzI3bnVtX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjlfX251bV9nZXRJY0VFAE5TdDNfXzIxNF9fbnVtX2dldF9iYXNlRQAAYEcBAKYtAQDkRwEAkC0BAAAAAAABAAAAwC0BAAAAAADkRwEATC0BAAAAAAACAAAApCgBAAIAAADILQEAAAAAAAAAAAC0LgEAkQAAAN4AAABvAAAA3wAAAOAAAADhAAAA4gAAAOMAAADkAAAA5QAAAOYAAADnAAAA6AAAAOkAAABOU3QzX18yN251bV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzI5X19udW1fZ2V0SXdFRQAAAORHAQCELgEAAAAAAAEAAADALQEAAAAAAORHAQBALgEAAAAAAAIAAACkKAEAAgAAAJwuAQAAAAAAAAAAAJwvAQCRAAAA6gAAAG8AAADrAAAA7AAAAO0AAADuAAAA7wAAAPAAAADxAAAA8gAAAE5TdDNfXzI3bnVtX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjlfX251bV9wdXRJY0VFAE5TdDNfXzIxNF9fbnVtX3B1dF9iYXNlRQAAYEcBAGIvAQDkRwEATC8BAAAAAAABAAAAfC8BAAAAAADkRwEACC8BAAAAAAACAAAApCgBAAIAAACELwEAAAAAAAAAAABkMAEAkQAAAPMAAABvAAAA9AAAAPUAAAD2AAAA9wAAAPgAAAD5AAAA+gAAAPsAAABOU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzI5X19udW1fcHV0SXdFRQAAAORHAQA0MAEAAAAAAAEAAAB8LwEAAAAAAORHAQDwLwEAAAAAAAIAAACkKAEAAgAAAEwwAQAAAAAAAAAAAGQxAQD8AAAA/QAAAG8AAAD+AAAA/wAAAAABAAABAQAAAgEAAAMBAAAEAQAA+P///2QxAQAFAQAABgEAAAcBAAAIAQAACQEAAAoBAAALAQAATlN0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjl0aW1lX2Jhc2VFAGBHAQAdMQEATlN0M19fMjIwX190aW1lX2dldF9jX3N0b3JhZ2VJY0VFAAAAYEcBADgxAQDkRwEA2DABAAAAAAADAAAApCgBAAIAAAAwMQEAAgAAAFwxAQAACAAAAAAAAFAyAQAMAQAADQEAAG8AAAAOAQAADwEAABABAAARAQAAEgEAABMBAAAUAQAA+P///1AyAQAVAQAAFgEAABcBAAAYAQAAGQEAABoBAAAbAQAATlN0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjIwX190aW1lX2dldF9jX3N0b3JhZ2VJd0VFAABgRwEAJTIBAORHAQDgMQEAAAAAAAMAAACkKAEAAgAAADAxAQACAAAASDIBAAAIAAAAAAAA9DIBABwBAAAdAQAAbwAAAB4BAABOU3QzX18yOHRpbWVfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTBfX3RpbWVfcHV0RQAAAGBHAQDVMgEA5EcBAJAyAQAAAAAAAgAAAKQoAQACAAAA7DIBAAAIAAAAAAAAdDMBAB8BAAAgAQAAbwAAACEBAABOU3QzX18yOHRpbWVfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQAAAADkRwEALDMBAAAAAAACAAAApCgBAAIAAADsMgEAAAgAAAAAAAAINAEAkQAAACIBAABvAAAAIwEAACQBAAAlAQAAJgEAACcBAAAoAQAAKQEAACoBAAArAQAATlN0M19fMjEwbW9uZXlwdW5jdEljTGIwRUVFAE5TdDNfXzIxMG1vbmV5X2Jhc2VFAAAAAGBHAQDoMwEA5EcBAMwzAQAAAAAAAgAAAKQoAQACAAAAADQBAAIAAAAAAAAAfDQBAJEAAAAsAQAAbwAAAC0BAAAuAQAALwEAADABAAAxAQAAMgEAADMBAAA0AQAANQEAAE5TdDNfXzIxMG1vbmV5cHVuY3RJY0xiMUVFRQDkRwEAYDQBAAAAAAACAAAApCgBAAIAAAAANAEAAgAAAAAAAADwNAEAkQAAADYBAABvAAAANwEAADgBAAA5AQAAOgEAADsBAAA8AQAAPQEAAD4BAAA/AQAATlN0M19fMjEwbW9uZXlwdW5jdEl3TGIwRUVFAORHAQDUNAEAAAAAAAIAAACkKAEAAgAAAAA0AQACAAAAAAAAAGQ1AQCRAAAAQAEAAG8AAABBAQAAQgEAAEMBAABEAQAARQEAAEYBAABHAQAASAEAAEkBAABOU3QzX18yMTBtb25leXB1bmN0SXdMYjFFRUUA5EcBAEg1AQAAAAAAAgAAAKQoAQACAAAAADQBAAIAAAAAAAAACDYBAJEAAABKAQAAbwAAAEsBAABMAQAATlN0M19fMjltb25leV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAE5TdDNfXzIxMV9fbW9uZXlfZ2V0SWNFRQAAYEcBAOY1AQDkRwEAoDUBAAAAAAACAAAApCgBAAIAAAAANgEAAAAAAAAAAACsNgEAkQAAAE0BAABvAAAATgEAAE8BAABOU3QzX18yOW1vbmV5X2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjExX19tb25leV9nZXRJd0VFAABgRwEAijYBAORHAQBENgEAAAAAAAIAAACkKAEAAgAAAKQ2AQAAAAAAAAAAAFA3AQCRAAAAUAEAAG8AAABRAQAAUgEAAE5TdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEljRUUAAGBHAQAuNwEA5EcBAOg2AQAAAAAAAgAAAKQoAQACAAAASDcBAAAAAAAAAAAA9DcBAJEAAABTAQAAbwAAAFQBAABVAQAATlN0M19fMjltb25leV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzIxMV9fbW9uZXlfcHV0SXdFRQAAYEcBANI3AQDkRwEAjDcBAAAAAAACAAAApCgBAAIAAADsNwEAAAAAAAAAAABsOAEAkQAAAFYBAABvAAAAVwEAAFgBAABZAQAATlN0M19fMjhtZXNzYWdlc0ljRUUATlN0M19fMjEzbWVzc2FnZXNfYmFzZUUAAAAAYEcBAEk4AQDkRwEANDgBAAAAAAACAAAApCgBAAIAAABkOAEAAgAAAAAAAADEOAEAkQAAAFoBAABvAAAAWwEAAFwBAABdAQAATlN0M19fMjhtZXNzYWdlc0l3RUUAAAAA5EcBAKw4AQAAAAAAAgAAAKQoAQACAAAAZDgBAAIAAABTAAAAdQAAAG4AAABkAAAAYQAAAHkAAAAAAAAATQAAAG8AAABuAAAAZAAAAGEAAAB5AAAAAAAAAFQAAAB1AAAAZQAAAHMAAABkAAAAYQAAAHkAAAAAAAAAVwAAAGUAAABkAAAAbgAAAGUAAABzAAAAZAAAAGEAAAB5AAAAAAAAAFQAAABoAAAAdQAAAHIAAABzAAAAZAAAAGEAAAB5AAAAAAAAAEYAAAByAAAAaQAAAGQAAABhAAAAeQAAAAAAAABTAAAAYQAAAHQAAAB1AAAAcgAAAGQAAABhAAAAeQAAAAAAAABTAAAAdQAAAG4AAAAAAAAATQAAAG8AAABuAAAAAAAAAFQAAAB1AAAAZQAAAAAAAABXAAAAZQAAAGQAAAAAAAAAVAAAAGgAAAB1AAAAAAAAAEYAAAByAAAAaQAAAAAAAABTAAAAYQAAAHQAAAAAAAAASgAAAGEAAABuAAAAdQAAAGEAAAByAAAAeQAAAAAAAABGAAAAZQAAAGIAAAByAAAAdQAAAGEAAAByAAAAeQAAAAAAAABNAAAAYQAAAHIAAABjAAAAaAAAAAAAAABBAAAAcAAAAHIAAABpAAAAbAAAAAAAAABNAAAAYQAAAHkAAAAAAAAASgAAAHUAAABuAAAAZQAAAAAAAABKAAAAdQAAAGwAAAB5AAAAAAAAAEEAAAB1AAAAZwAAAHUAAABzAAAAdAAAAAAAAABTAAAAZQAAAHAAAAB0AAAAZQAAAG0AAABiAAAAZQAAAHIAAAAAAAAATwAAAGMAAAB0AAAAbwAAAGIAAABlAAAAcgAAAAAAAABOAAAAbwAAAHYAAABlAAAAbQAAAGIAAABlAAAAcgAAAAAAAABEAAAAZQAAAGMAAABlAAAAbQAAAGIAAABlAAAAcgAAAAAAAABKAAAAYQAAAG4AAAAAAAAARgAAAGUAAABiAAAAAAAAAE0AAABhAAAAcgAAAAAAAABBAAAAcAAAAHIAAAAAAAAASgAAAHUAAABuAAAAAAAAAEoAAAB1AAAAbAAAAAAAAABBAAAAdQAAAGcAAAAAAAAAUwAAAGUAAABwAAAAAAAAAE8AAABjAAAAdAAAAAAAAABOAAAAbwAAAHYAAAAAAAAARAAAAGUAAABjAAAAAAAAAEEAAABNAAAAAAAAAFAAAABNAAAAAAAAAAAAAABcMQEABQEAAAYBAAAHAQAACAEAAAkBAAAKAQAACwEAAAAAAABIMgEAFQEAABYBAAAXAQAAGAEAABkBAAAaAQAAGwEAAAAAAADQPAEAXgEAAF8BAABgAQAATlN0M19fMjE0X19zaGFyZWRfY291bnRFAAAAAGBHAQC0PAEATm8gZXJyb3IgaW5mb3JtYXRpb24ASWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATXVsdGlob3AgYXR0ZW1wdGVkAFJlcXVpcmVkIGtleSBub3QgYXZhaWxhYmxlAEtleSBoYXMgZXhwaXJlZABLZXkgaGFzIGJlZW4gcmV2b2tlZABLZXkgd2FzIHJlamVjdGVkIGJ5IHNlcnZpY2UAAAAAAAAAAAAAAAAAAAAAAKUCWwDwAbUFjAUlAYMGHQOUBP8AxwMxAwsGvAGPAX8DygQrANoGrwBCA04D3AEOBBUAoQYNAZQCCwI4BmQCvAL/Al0D5wQLB88CywXvBdsF4QIeBkUChQCCAmwDbwTxAPMDGAXZANoDTAZUAnsBnQO9BAAAUQAVArsAswNtAP8BhQQvBfkEOABlAUYBnwC3BqgBcwJTAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEEAAAAAAAAAAAvAgAAAAAAAAAAAAAAAAAAAAAAAAAANQRHBFYEAAAAAAAAAAAAAAAAAAAAAKAEAAAAAAAAAAAAAAAAAAAAAAAARgVgBW4FYQYAAM8BAAAAAAAAAADJBukG+QYeBzkHSQdeB04xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAAAAAIhHAQCURQEASEgBAE4xMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvRQAAAIhHAQDERQEAuEUBAE4xMF9fY3h4YWJpdjExN19fcGJhc2VfdHlwZV9pbmZvRQAAAIhHAQD0RQEAuEUBAE4xMF9fY3h4YWJpdjExOV9fcG9pbnRlcl90eXBlX2luZm9FAIhHAQAkRgEAGEYBAAAAAACYRgEAYQEAAGIBAABjAQAAZAEAAGUBAABOMTBfX2N4eGFiaXYxMjNfX2Z1bmRhbWVudGFsX3R5cGVfaW5mb0UAiEcBAHBGAQC4RQEAdgAAAFxGAQCkRgEAYgAAAFxGAQCwRgEAYwAAAFxGAQC8RgEAaAAAAFxGAQDIRgEAYQAAAFxGAQDURgEAcwAAAFxGAQDgRgEAdAAAAFxGAQDsRgEAaQAAAFxGAQD4RgEAagAAAFxGAQAERwEAbAAAAFxGAQAQRwEAbQAAAFxGAQAcRwEAeAAAAFxGAQAoRwEAeQAAAFxGAQA0RwEAZgAAAFxGAQBARwEAZAAAAFxGAQBMRwEAAAAAAOhFAQBhAQAAZgEAAGMBAABkAQAAZwEAAGgBAABpAQAAagEAAAAAAADQRwEAYQEAAGsBAABjAQAAZAEAAGcBAABsAQAAbQEAAG4BAABOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UAAAAAiEcBAKhHAQDoRQEAAAAAACxIAQBhAQAAbwEAAGMBAABkAQAAZwEAAHABAABxAQAAcgEAAE4xMF9fY3h4YWJpdjEyMV9fdm1pX2NsYXNzX3R5cGVfaW5mb0UAAACIRwEABEgBAOhFAQBTdDl0eXBlX2luZm8AAAAAYEcBADhIAQAAQdCQBQvUAwUAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAKAAAAGEsBAAAEAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAD/////CgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBIAQCQYQEACQAAAAAAAAAAAAAAQQAAAAAAAAAAAAAAAAAAAAAAAABCAAAAAAAAAEMAAAAYUQEAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAEMAAAAgVQEAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeEkBACVtLyVkLyV5AAAACCVIOiVNOiVTAAAACA==';
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(file);
  if (binary) {
    return binary;
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  if (!wasmBinaryFile) wasmBinaryFile = findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis != 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===
// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var __abort_js = () => {
      abort('native code called abort()');
    };

  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {};

  var embind_init_charCodes = () => {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    };
  var embind_charCodes;
  var readLatin1String = (ptr) => {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    };
  
  var awaitingDependencies = {
  };
  
  var registeredTypes = {
  };
  
  var typeDependencies = {
  };
  
  var BindingError;
  var throwBindingError = (message) => { throw new BindingError(message); };
  
  
  
  
  var InternalError;
  var throwInternalError = (message) => { throw new InternalError(message); };
  var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
      myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
      });
  
      function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
              throwInternalError('Mismatched type converter count');
          }
          for (var i = 0; i < myTypes.length; ++i) {
              registerType(myTypes[i], myTypeConverters[i]);
          }
      }
  
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    };
  /** @param {Object=} options */
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
  /** @param {Object=} options */
  function registerType(rawType, registeredInstance, options = {}) {
      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }
      return sharedRegisterType(rawType, registeredInstance, options);
    }
  
  var GenericWireTypeSize = 8;
  /** @suppress {globalThis} */
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = readLatin1String(name);
      registerType(rawType, {
          name,
          'fromWireType': function(wt) {
              // ambiguous emscripten ABI: sometimes return values are
              // true or false, and sometimes integers (0 or 1)
              return !!wt;
          },
          'toWireType': function(destructors, o) {
              return o ? trueValue : falseValue;
          },
          'argPackAdvance': GenericWireTypeSize,
          'readValueFromPointer': function(pointer) {
              return this['fromWireType'](HEAPU8[pointer]);
          },
          destructorFunction: null, // This type does not need a destructor
      });
    };

  
  var emval_freelist = [];
  
  var emval_handles = [];
  var __emval_decref = (handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        assert(emval_handles[handle] !== undefined, `Decref for unallocated handle.`);
        emval_handles[handle] = undefined;
        emval_freelist.push(handle);
      }
    };
  
  
  
  
  
  var count_emval_handles = () => {
      return emval_handles.length / 2 - 5 - emval_freelist.length;
    };
  
  var init_emval = () => {
      // reserve 0 and some special values. These never get de-allocated.
      emval_handles.push(
        0, 1,
        undefined, 1,
        null, 1,
        true, 1,
        false, 1,
      );
      assert(emval_handles.length === 5 * 2);
      Module['count_emval_handles'] = count_emval_handles;
    };
  var Emval = {
  toValue:(handle) => {
        if (!handle) {
            throwBindingError('Cannot use deleted val. handle = ' + handle);
        }
        // handle 2 is supposed to be `undefined`.
        assert(handle === 2 || emval_handles[handle] !== undefined && handle % 2 === 0, `invalid handle: ${handle}`);
        return emval_handles[handle];
      },
  toHandle:(value) => {
        switch (value) {
          case undefined: return 2;
          case null: return 4;
          case true: return 6;
          case false: return 8;
          default:{
            const handle = emval_freelist.pop() || emval_handles.length;
            emval_handles[handle] = value;
            emval_handles[handle + 1] = 1;
            return handle;
          }
        }
      },
  };
  
  /** @suppress {globalThis} */
  function readPointer(pointer) {
      return this['fromWireType'](HEAPU32[((pointer)>>2)]);
    }
  
  var EmValType = {
      name: 'emscripten::val',
      'fromWireType': (handle) => {
        var rv = Emval.toValue(handle);
        __emval_decref(handle);
        return rv;
      },
      'toWireType': (destructors, value) => Emval.toHandle(value),
      'argPackAdvance': GenericWireTypeSize,
      'readValueFromPointer': readPointer,
      destructorFunction: null, // This type does not need a destructor
  
      // TODO: do we need a deleteObject here?  write a test where
      // emval is passed into JS via an interface
    };
  var __embind_register_emval = (rawType) => registerType(rawType, EmValType);

  var embindRepr = (v) => {
      if (v === null) {
          return 'null';
      }
      var t = typeof v;
      if (t === 'object' || t === 'array' || t === 'function') {
          return v.toString();
      } else {
          return '' + v;
      }
    };
  
  var floatReadValueFromPointer = (name, width) => {
      switch (width) {
          case 4: return function(pointer) {
              return this['fromWireType'](HEAPF32[((pointer)>>2)]);
          };
          case 8: return function(pointer) {
              return this['fromWireType'](HEAPF64[((pointer)>>3)]);
          };
          default:
              throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
  
  
  var __embind_register_float = (rawType, name, size) => {
      name = readLatin1String(name);
      registerType(rawType, {
        name,
        'fromWireType': (value) => value,
        'toWireType': (destructors, value) => {
          if (typeof value != "number" && typeof value != "boolean") {
            throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`);
          }
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': floatReadValueFromPointer(name, size),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  var createNamedFunction = (name, body) => Object.defineProperty(body, 'name', {
      value: name
    });
  
  var runDestructors = (destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    };
  
  
  function usesDestructorStack(argTypes) {
      // Skip return value at index 0 - it's not deleted here.
      for (var i = 1; i < argTypes.length; ++i) {
        // The type does not define a destructor function - must use dynamic stack
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
          return true;
        }
      }
      return false;
    }
  
  function newFunc(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
        throw new TypeError(`new_ called with constructor type ${typeof(constructor)} which is not a function`);
      }
      /*
       * Previously, the following line was just:
       *   function dummy() {};
       * Unfortunately, Chrome was preserving 'dummy' as the object's name, even
       * though at creation, the 'dummy' has the correct constructor name.  Thus,
       * objects created with IMVU.new would show up in the debugger as 'dummy',
       * which isn't very helpful.  Using IMVU.createNamedFunction addresses the
       * issue.  Doubly-unfortunately, there's no way to write a test for this
       * behavior.  -NRD 2013.02.22
       */
      var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function(){});
      dummy.prototype = constructor.prototype;
      var obj = new dummy;
  
      var r = constructor.apply(obj, argumentList);
      return (r instanceof Object) ? r : obj;
    }
  
  function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
      var needsDestructorStack = usesDestructorStack(argTypes);
      var argCount = argTypes.length;
      var argsList = "";
      var argsListWired = "";
      for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i!==0?", ":"")+"arg"+i;
        argsListWired += (i!==0?", ":"")+"arg"+i+"Wired";
      }
  
      var invokerFnBody = `
        return function (${argsList}) {
        if (arguments.length !== ${argCount - 2}) {
          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${argCount - 2}');
        }`;
  
      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }
  
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
  
      if (isClassMethodFunc) {
        invokerFnBody += "var thisWired = classParam['toWireType']("+dtorStack+", this);\n";
      }
  
      for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody += "var arg"+i+"Wired = argType"+i+"['toWireType']("+dtorStack+", arg"+i+");\n";
        args1.push("argType"+i);
      }
  
      if (isClassMethodFunc) {
        argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
      }
  
      invokerFnBody +=
          (returns || isAsync ? "var rv = ":"") + "invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";
  
      var returnVal = returns ? "rv" : "";
  
      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i = isClassMethodFunc?1:2; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
          var paramName = (i === 1 ? "thisWired" : ("arg"+(i - 2)+"Wired"));
          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += `${paramName}_dtor(${paramName});\n`;
            args1.push(`${paramName}_dtor`);
          }
        }
      }
  
      if (returns) {
        invokerFnBody += "var ret = retType['fromWireType'](rv);\n" +
                         "return ret;\n";
      } else {
      }
  
      invokerFnBody += "}\n";
  
      invokerFnBody = `if (arguments.length !== ${args1.length}){ throw new Error(humanName + "Expected ${args1.length} closure arguments " + arguments.length + " given."); }\n${invokerFnBody}`;
      return [args1, invokerFnBody];
    }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, /** boolean= */ isAsync) {
      // humanName: a human-readable string name for the function to be generated.
      // argTypes: An array that contains the embind type objects for all types in the function signature.
      //    argTypes[0] is the type object for the function return value.
      //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
      //    argTypes[2...] are the actual function parameters.
      // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
      // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
      // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
      // isAsync: Optional. If true, returns an async function. Async bindings are only supported with JSPI.
      var argCount = argTypes.length;
  
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
  
      assert(!isAsync, 'Async bindings are only supported with JSPI.');
  
      var isClassMethodFunc = (argTypes[1] !== null && classType !== null);
  
      // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
  // TODO: This omits argument count check - enable only at -O3 or similar.
  //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
  //       return FUNCTION_TABLE[fn];
  //    }
  
      // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
      // TODO: Remove this completely once all function invokers are being dynamically generated.
      var needsDestructorStack = usesDestructorStack(argTypes);
  
      var returns = (argTypes[0].name !== "void");
  
    // Builld the arguments that will be passed into the closure around the invoker
    // function.
    var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
    for (var i = 0; i < argCount - 2; ++i) {
      closureArgs.push(argTypes[i+2]);
    }
    if (!needsDestructorStack) {
      for (var i = isClassMethodFunc?1:2; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
        if (argTypes[i].destructorFunction !== null) {
          closureArgs.push(argTypes[i].destructorFunction);
        }
      }
    }
  
    let [args, invokerFnBody] = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
    args.push(invokerFnBody);
    var invokerFn = newFunc(Function, args)(...closureArgs);
      return createNamedFunction(humanName, invokerFn);
    }
  
  var ensureOverloadTable = (proto, methodName, humanName) => {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.
        proto[methodName] = function(...args) {
          // TODO This check can be removed in -O3 level "unsafe" optimizations.
          if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
            throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
          }
          return proto[methodName].overloadTable[args.length].apply(this, args);
        };
        // Move the previous function into the overload table.
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    };
  
  /** @param {number=} numArguments */
  var exposePublicSymbol = (name, value, numArguments) => {
      if (Module.hasOwnProperty(name)) {
        if (undefined === numArguments || (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])) {
          throwBindingError(`Cannot register public name '${name}' twice`);
        }
  
        // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
        // that routes between the two.
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
        }
        // Add the new function into the overload table.
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    };
  
  var heap32VectorToArray = (count, firstElement) => {
      var array = [];
      for (var i = 0; i < count; i++) {
        // TODO(https://github.com/emscripten-core/emscripten/issues/17310):
        // Find a way to hoist the `>> 2` or `>> 3` out of this loop.
        array.push(HEAPU32[(((firstElement)+(i * 4))>>2)]);
      }
      return array;
    };
  
  
  /** @param {number=} numArguments */
  var replacePublicSymbol = (name, value, numArguments) => {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistent public symbol');
      }
      // If there's an overload table for this symbol, replace the symbol in the overload table instead.
      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
  
  
  
  var dynCallLegacy = (sig, ptr, args) => {
      sig = sig.replace(/p/g, 'i')
      assert(('dynCall_' + sig) in Module, `bad function pointer type - dynCall function not found for sig '${sig}'`);
      if (args?.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module['dynCall_' + sig];
      return f(ptr, ...args);
    };
  
  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  
  var dynCall = (sig, ptr, args = []) => {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of their signature, so we rely on the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
      var rtn = getWasmTableEntry(ptr)(...args);
      return rtn;
    };
  var getDynCaller = (sig, ptr) => {
      assert(sig.includes('j') || sig.includes('p'), 'getDynCaller should only be called with i64 sigs')
      return (...args) => dynCall(sig, ptr, args);
    };
  
  
  var embind__requireFunction = (signature, rawFunction) => {
      signature = readLatin1String(signature);
  
      function makeDynCaller() {
        if (signature.includes('j')) {
          return getDynCaller(signature, rawFunction);
        }
        return getWasmTableEntry(rawFunction);
      }
  
      var fp = makeDynCaller();
      if (typeof fp != "function") {
          throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
      }
      return fp;
    };
  
  
  
  var extendError = (baseErrorType, errorName) => {
      var errorClass = createNamedFunction(errorName, function(message) {
        this.name = errorName;
        this.message = message;
  
        var stack = (new Error(message)).stack;
        if (stack !== undefined) {
          this.stack = this.toString() + '\n' +
              stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
        if (this.message === undefined) {
          return this.name;
        } else {
          return `${this.name}: ${this.message}`;
        }
      };
  
      return errorClass;
    };
  var UnboundTypeError;
  
  
  
  var getTypeName = (type) => {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    };
  var throwUnboundTypeError = (message, types) => {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
  
      throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([', ']));
    };
  
  
  var getFunctionName = (signature) => {
      signature = signature.trim();
      const argsIndex = signature.indexOf("(");
      if (argsIndex !== -1) {
        assert(signature[signature.length - 1] == ")", "Parentheses for argument names should match.");
        return signature.substr(0, argsIndex);
      } else {
        return signature;
      }
    };
  var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) => {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
      name = getFunctionName(name);
  
      rawInvoker = embind__requireFunction(signature, rawInvoker);
  
      exposePublicSymbol(name, function() {
        throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
      }, argCount - 1);
  
      whenDependentTypesAreResolved([], argTypes, (argTypes) => {
        var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn, isAsync), argCount - 1);
        return [];
      });
    };

  
  var integerReadValueFromPointer = (name, width, signed) => {
      // integers are quite common, so generate very specialized functions
      switch (width) {
          case 1: return signed ?
              (pointer) => HEAP8[pointer] :
              (pointer) => HEAPU8[pointer];
          case 2: return signed ?
              (pointer) => HEAP16[((pointer)>>1)] :
              (pointer) => HEAPU16[((pointer)>>1)]
          case 4: return signed ?
              (pointer) => HEAP32[((pointer)>>2)] :
              (pointer) => HEAPU32[((pointer)>>2)]
          default:
              throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
  
  
  /** @suppress {globalThis} */
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
      name = readLatin1String(name);
      // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come
      // out as 'i32 -1'. Always treat those as max u32.
      if (maxRange === -1) {
        maxRange = 4294967295;
      }
  
      var fromWireType = (value) => value;
  
      if (minRange === 0) {
        var bitshift = 32 - 8*size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
      }
  
      var isUnsignedType = (name.includes('unsigned'));
      var checkAssertions = (value, toTypeName) => {
        if (typeof value != "number" && typeof value != "boolean") {
          throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`);
        }
        if (value < minRange || value > maxRange) {
          throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
        }
      }
      var toWireType;
      if (isUnsignedType) {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        }
      } else {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        }
      }
      registerType(primitiveType, {
        name,
        'fromWireType': fromWireType,
        'toWireType': toWireType,
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': integerReadValueFromPointer(name, size, minRange !== 0),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
        var size = HEAPU32[((handle)>>2)];
        var data = HEAPU32[(((handle)+(4))>>2)];
        return new TA(HEAP8.buffer, data, size);
      }
  
      name = readLatin1String(name);
      registerType(rawType, {
        name,
        'fromWireType': decodeMemoryView,
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': decodeMemoryView,
      }, {
        ignoreDuplicateRegistrations: true,
      });
    };

  
  
  
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  
  
  var __embind_register_std_string = (rawType, name) => {
      name = readLatin1String(name);
      var stdStringIsUTF8
      //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = (name === "std::string");
  
      registerType(rawType, {
        name,
        // For some method names we use string keys here since they are part of
        // the public/external API and/or used by the runtime-generated code.
        'fromWireType'(value) {
          var length = HEAPU32[((value)>>2)];
          var payload = value + 4;
  
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            // Looping here to support possible embedded '0' bytes
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i]);
            }
            str = a.join('');
          }
  
          _free(value);
  
          return str;
        },
        'toWireType'(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
  
          var length;
          var valueIsOfTypeString = (typeof value == 'string');
  
          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError('Cannot pass non-string to std::string');
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
  
          // assumes POINTER_SIZE alignment
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[((base)>>2)] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }
                HEAPU8[ptr + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i];
              }
            }
          }
  
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        },
      });
    };

  
  
  
  var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined;;
  var UTF16ToString = (ptr, maxBytesToRead) => {
      assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
      var endPtr = ptr;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // Also, use the length info to avoid running tiny strings through
      // TextDecoder, since .subarray() allocates garbage.
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
  
      if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  
      // Fallback: decode without UTF16Decoder
      var str = '';
  
      // If maxBytesToRead is not passed explicitly, it will be undefined, and the
      // for-loop's condition will always evaluate to true. The loop is then
      // terminated on the first null char.
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
        if (codeUnit == 0) break;
        // fromCharCode constructs a character from a UTF-16 code unit, so we can
        // pass the UTF16 string right through.
        str += String.fromCharCode(codeUnit);
      }
  
      return str;
    };
  
  var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      maxBytesToWrite ??= 0x7FFFFFFF;
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2; // Null terminator.
      var startPtr = outPtr;
      var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        HEAP16[((outPtr)>>1)] = codeUnit;
        outPtr += 2;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP16[((outPtr)>>1)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF16 = (str) => {
      return str.length*2;
    };
  
  var UTF32ToString = (ptr, maxBytesToRead) => {
      assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
      var i = 0;
  
      var str = '';
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
        if (utf32 == 0) break;
        ++i;
        // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        if (utf32 >= 0x10000) {
          var ch = utf32 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    };
  
  var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      maxBytesToWrite ??= 0x7FFFFFFF;
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
        }
        HEAP32[((outPtr)>>2)] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP32[((outPtr)>>2)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
        len += 4;
      }
  
      return len;
    };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = readLatin1String(name);
      var decodeString, encodeString, readCharAt, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        readCharAt = (pointer) => HEAPU16[((pointer)>>1)];
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        readCharAt = (pointer) => HEAPU32[((pointer)>>2)];
      }
      registerType(rawType, {
        name,
        'fromWireType': (value) => {
          // Code mostly taken from _embind_register_std_string fromWireType
          var length = HEAPU32[((value)>>2)];
          var str;
  
          var decodeStartPtr = value + 4;
          // Looping here to support possible embedded '0' bytes
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || readCharAt(currentBytePtr) == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
  
          _free(value);
  
          return str;
        },
        'toWireType': (destructors, value) => {
          if (!(typeof value == 'string')) {
            throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
          }
  
          // assumes POINTER_SIZE alignment
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[((ptr)>>2)] = length / charSize;
  
          encodeString(value, ptr + 4, length + charSize);
  
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        'argPackAdvance': GenericWireTypeSize,
        'readValueFromPointer': readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        }
      });
    };

  
  var __embind_register_void = (rawType, name) => {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true, // void return values can be optimized out sometimes
        name,
        'argPackAdvance': 0,
        'fromWireType': () => undefined,
        // TODO: assert if anything else is given?
        'toWireType': (destructors, o) => undefined,
      });
    };

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (date) => date.toLocaleTimeString(undefined, {hour12:false, timeZoneName:'short'}).split(' ')[1];
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };

  var getHeapMax = () =>
      HEAPU8.length;
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  var ENV = {
  };
  
  var getExecutableName = () => {
      return thisProgram || './this.program';
    };
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };

  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };

  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  
  
  var strError = (errno) => {
      return UTF8ToString(_strerror(errno));
    };
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          // TODO(sbc): Use the inline member declaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  FSStream:class {
        constructor() {
          // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
          // Use inline field declarations.
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
          this.readMode = 292/*292*/ | 73/*73*/;
          this.writeMode = 146/*146*/;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend 
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },
  quit() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble = stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble = Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble = Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble = Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble = stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
embind_init_charCodes();
BindingError = Module['BindingError'] = class BindingError extends Error { constructor(message) { super(message); this.name = 'BindingError'; }};
InternalError = Module['InternalError'] = class InternalError extends Error { constructor(message) { super(message); this.name = 'InternalError'; }};
init_emval();;
UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError');;

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _embind_register_bigint: __embind_register_bigint,
  /** @export */
  _embind_register_bool: __embind_register_bool,
  /** @export */
  _embind_register_emval: __embind_register_emval,
  /** @export */
  _embind_register_float: __embind_register_float,
  /** @export */
  _embind_register_function: __embind_register_function,
  /** @export */
  _embind_register_integer: __embind_register_integer,
  /** @export */
  _embind_register_memory_view: __embind_register_memory_view,
  /** @export */
  _embind_register_std_string: __embind_register_std_string,
  /** @export */
  _embind_register_std_wstring: __embind_register_std_wstring,
  /** @export */
  _embind_register_void: __embind_register_void,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var ___getTypeName = createExportWrapper('__getTypeName', 1);
var _fflush = createExportWrapper('fflush', 1);
var _malloc = createExportWrapper('malloc', 1);
var _free = createExportWrapper('free', 1);
var _strerror = createExportWrapper('strerror', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var ___cxa_is_pointer_type = createExportWrapper('__cxa_is_pointer_type', 1);
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji', 5);
var dynCall_viijii = Module['dynCall_viijii'] = createExportWrapper('dynCall_viijii', 7);
var dynCall_iiiiij = Module['dynCall_iiiiij'] = createExportWrapper('dynCall_iiiiij', 7);
var dynCall_iiiiijj = Module['dynCall_iiiiijj'] = createExportWrapper('dynCall_iiiiijj', 9);
var dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] = createExportWrapper('dynCall_iiiiiijj', 10);


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'stackAlloc',
  'getTempRet0',
  'setTempRet0',
  'exitJS',
  'growMemory',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'emscriptenLog',
  'readEmAsmArgs',
  'jstoi_q',
  'listenOnce',
  'autoResumeAudioContext',
  'handleException',
  'keepRuntimeAlive',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'asmjsMangle',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'safeSetTimeout',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'setMainLoop',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_unlink',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
  'getFunctionArgsName',
  'requireRegisteredType',
  'createJsInvokerSignature',
  'init_embind',
  'getBasestPointer',
  'registerInheritedInstance',
  'unregisterInheritedInstance',
  'getInheritedInstance',
  'getInheritedInstanceCount',
  'getLiveInheritedInstances',
  'enumReadValueFromPointer',
  'genericPointerToWireType',
  'constNoSmartPtrRawPointerToWireType',
  'nonConstNoSmartPtrRawPointerToWireType',
  'init_RegisteredPointer',
  'RegisteredPointer',
  'RegisteredPointer_fromWireType',
  'runDestructor',
  'releaseClassHandle',
  'detachFinalizer',
  'attachFinalizer',
  'makeClassHandle',
  'init_ClassHandle',
  'ClassHandle',
  'throwInstanceAlreadyDeleted',
  'flushPendingDeletes',
  'setDelayFunction',
  'RegisteredClass',
  'shallowCopyInternalPointer',
  'downcastPointer',
  'upcastPointer',
  'validateThis',
  'char_0',
  'char_9',
  'makeLegalFunctionName',
  'getStringOrSymbol',
  'emval_get_global',
  'emval_returnValue',
  'emval_lookupTypes',
  'emval_addMethodCaller',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'convertI32PairToI53Checked',
  'stackSave',
  'stackRestore',
  'ptrToString',
  'zeroMemory',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'ERRNO_CODES',
  'strError',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'jstoi_s',
  'getExecutableName',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'stringToAscii',
  'UTF16Decoder',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'JSEvents',
  'specialHTMLTargets',
  'findCanvasEventTarget',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'UNWIND_CACHE',
  'ExitStatus',
  'getEnvStrings',
  'doReadv',
  'doWritev',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'getPreloadedImageData__data',
  'wget',
  'SYSCALLS',
  'preloadPlugins',
  'FS_createPreloadedFile',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS_createPath',
  'FS_createDevice',
  'FS_readFile',
  'FS',
  'FS_createDataFile',
  'FS_createLazyFile',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
  'InternalError',
  'BindingError',
  'throwInternalError',
  'throwBindingError',
  'registeredTypes',
  'awaitingDependencies',
  'typeDependencies',
  'tupleRegistrations',
  'structRegistrations',
  'sharedRegisterType',
  'whenDependentTypesAreResolved',
  'embind_charCodes',
  'embind_init_charCodes',
  'readLatin1String',
  'getTypeName',
  'getFunctionName',
  'heap32VectorToArray',
  'usesDestructorStack',
  'createJsInvoker',
  'UnboundTypeError',
  'PureVirtualError',
  'GenericWireTypeSize',
  'EmValType',
  'throwUnboundTypeError',
  'ensureOverloadTable',
  'exposePublicSymbol',
  'replacePublicSymbol',
  'extendError',
  'createNamedFunction',
  'embindRepr',
  'registeredInstances',
  'registeredPointers',
  'registerType',
  'integerReadValueFromPointer',
  'floatReadValueFromPointer',
  'readPointer',
  'runDestructors',
  'newFunc',
  'craftInvokerFunction',
  'embind__requireFunction',
  'finalizationRegistry',
  'detachFinalizer_deps',
  'deletionQueue',
  'delayFunction',
  'emval_freelist',
  'emval_handles',
  'emval_symbols',
  'init_emval',
  'count_emval_handles',
  'Emval',
  'emval_methodCallers',
  'reflectConstruct',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = BindImgui;
else if (typeof define === 'function' && define['amd'])
  define([], () => BindImgui);
