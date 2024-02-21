<script lang="ts">
  import store from "./../store/context";

  $: themeVariables = $store?.themeVariables
    ? Object.entries($store?.themeVariables)
        .map(([k, v]) => `${k}:${v};`)
        .join("")
    : "";
</script>

<div
  data-rabbykit="0.0.01"
  class:dark={$store.theme === "dark"}
  class:system={$store.theme === "system"}
  style={themeVariables}
>
  <slot />
</div>

<style lang="scss">
  .light {
    --rk-modal-index: 2147483647;
    --rk-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto,
      "PingFang SC", "Microsoft Yahei", sans-serif;
    --rabby-light-blue-default: rgba(112, 132, 255, 1);
    --rabby-light-blue-light-1: rgba(238, 241, 255, 1);
    --rabby-light-blue-light-2: rgba(222, 227, 252, 1);
    --rabby-light-blue-disable: rgba(112, 132, 255, 0.5);
    --rabby-light-green-default: rgba(42, 187, 127, 1);
    --rabby-light-green-light: rgba(42, 187, 127, 0.15);
    --rabby-light-orange-default: rgba(255, 176, 32, 1);
    --rabby-light-orange-light: rgba(255, 176, 32, 0.15);
    --rabby-light-red-default: rgba(227, 73, 53, 1);
    --rabby-light-red-light: rgba(227, 73, 53, 0.15);
    --rabby-light-red-dark: rgba(174, 42, 25, 1);
    --rabby-light-red-light-2: rgba(174, 42, 25, 0.2);
    --rabby-light-neutral-title-1: rgba(25, 41, 69, 1);
    --rabby-light-neutral-body: rgba(62, 73, 94, 1);
    --rabby-light-neutral-foot: rgba(106, 117, 135, 1);
    --rabby-light-neutral-line: rgba(211, 216, 224, 1);
    --rabby-light-neutral-bg-1: rgba(255, 255, 255, 1);
    --rabby-light-neutral-bg-2: rgba(242, 244, 247, 1);
    --rabby-light-neutral-bg-3: rgba(247, 250, 252, 1);
    --rabby-light-neutral-card-1: rgba(255, 255, 255, 1);
    --rabby-light-neutral-card-2: rgba(242, 244, 247, 1);
    --rabby-light-neutral-card-3: rgba(247, 250, 252, 1);
    --rabby-light-neutral-title-2: rgb(255, 255, 255, 1);
    --rabby-light-neutral-black: rgba(0, 0, 0, 1);

    --r-blue-default: var(--rabby-light-blue-default);
    --r-blue-light-1: var(--rabby-light-blue-light-1);
    --r-blue-light-2: var(--rabby-light-blue-light-2);
    --r-blue-disable: var(--rabby-light-blue-disable);
    --r-green-default: var(--rabby-light-green-default);
    --r-green-light: var(--rabby-light-green-light);
    --r-orange-default: var(--rabby-light-orange-default);
    --r-orange-light: var(--rabby-light-orange-light);
    --r-red-default: var(--rabby-light-red-default);
    --r-red-light: var(--rabby-light-red-light);
    --r-red-dark: var(--rabby-light-red-dark);
    --r-red-light-2: var(--rabby-light-red-light-2);
    --r-neutral-title-1: var(--rabby-light-neutral-title-1);
    --r-neutral-body: var(--rabby-light-neutral-body);
    --r-neutral-foot: var(--rabby-light-neutral-foot);
    --r-neutral-line: var(--rabby-light-neutral-line);
    --r-neutral-bg-1: var(--rabby-light-neutral-bg-1);
    --r-neutral-bg-2: var(--rabby-light-neutral-bg-2);
    --r-neutral-bg-3: var(--rabby-light-neutral-bg-3);
    --r-neutral-card-1: var(--rabby-light-neutral-card-1);
    --r-neutral-card-2: var(--rabby-light-neutral-card-2);
    --r-neutral-card-3: var(--rabby-light-neutral-card-3);
    --r-neutral-title-2: var(--rabby-light-neutral-title-2);
    --r-neutral-black: var(--rabby-light-neutral-black);

    --button-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
    --modal-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
    --icon-stroke: #3e495e;
  }
  .dark {
    --r-blue-light-1: rgba(112, 132, 255, 0.1);
    --r-blue-light-2: rgba(112, 132, 255, 0.1);
    --r-blue-default: #7084ff;
    --r-green-default: #2abb7f;
    --r-green-light: rgba(42, 187, 127, 0.2);
    --r-orange-default: #ffc64a;
    --r-orange-light: rgba(255, 198, 74, 0.2);
    --r-red-default: #ef5c48;
    --r-red-light: rgba(239, 92, 72, 0.2);
    --r-red-dark: #ae2a19;
    --r-red-light-2: rgba(174, 42, 25, 0.2);
    --r-neutral-title-1: #f7fafc;
    --r-neutral-body: #d3d8e0;
    --r-neutral-foot: #babec5;
    --r-neutral-line: rgba(255, 255, 255, 0.1);
    --r-neutral-bg-1: #3d4251;
    --r-neutral-bg-2: #3d4251;
    --r-neutral-card-3: rgba(255, 255, 255, 0.06);
    --r-neutral-card-1: rgba(255, 255, 255, 0.06);
    --r-neutral-card-2: rgba(255, 255, 255, 0.06);
    --r-neutral-card-3: rgba(255, 255, 255, 0.06);
    --r-neutral-title-2: #fff;
    --r-neutral-black: #000;
    --modal-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
    --button-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

    --icon-stroke: #d3d8e0;
  }

  [data-rabbykit] {
    --z-index-scroll: 1;
    --z-index-page: 2;
    line-height: normal;
    @extend .light;
    font-family: var(--rk-font-family, var(--rk-font));

    &.dark {
      @extend .dark;
    }
  }

  @media (prefers-color-scheme: dark) {
    [data-rabbykit].system {
      --r-blue-light-1: rgba(112, 132, 255, 0.1);
      /* --r-blue-light-2: ; */
      --r-blue-default: #7084ff;
      --r-green-default: #2abb7f;
      /* --r-green-light: ; */
      /* --r-orange-default: ; */
      /* --r-orange-light: ; */
      --r-red-default: #ef5c48;
      /* --r-red-light: ; */
      /* --r-red-dark: ; */
      /* --r-red-light-2: ; */
      --r-neutral-title-1: #f7fafc;
      --r-neutral-body: #d3d8e0;
      --r-neutral-foot: #babec5;
      --r-neutral-line: rgba(255, 255, 255, 0.1);
      /* --r-neutral-bg-1: ; */
      --r-neutral-bg-2: #3d4251;
      --r-neutral-card-3: rgba(255, 255, 255, 0.06);
      --r-neutral-card-1: rgba(255, 255, 255, 0.06);
      /* --r-neutral-card-2: ; */
      /* --r-neutral-card-3: ; */
      /* --r-neutral-title-2: ; */
      /* --r-neutral-black: ; */
      --modal-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
      --button-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

      --icon-stroke: #d3d8e0;
    }
  }
  @media (prefers-color-scheme: light) {
    [data-rabbykit].system {
      --rk-modal-index: 2147483647;
      --rk-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto,
        "PingFang SC", "Microsoft Yahei", sans-serif;
      --rabby-light-blue-default: rgba(112, 132, 255, 1);
      --rabby-light-blue-light-1: rgba(238, 241, 255, 1);
      --rabby-light-blue-light-2: rgba(222, 227, 252, 1);
      --rabby-light-blue-disable: rgba(112, 132, 255, 0.5);
      --rabby-light-green-default: rgba(42, 187, 127, 1);
      --rabby-light-green-light: rgba(42, 187, 127, 0.15);
      --rabby-light-orange-default: rgba(255, 176, 32, 1);
      --rabby-light-orange-light: rgba(255, 176, 32, 0.15);
      --rabby-light-red-default: rgba(227, 73, 53, 1);
      --rabby-light-red-light: rgba(227, 73, 53, 0.15);
      --rabby-light-red-dark: rgba(174, 42, 25, 1);
      --rabby-light-red-light-2: rgba(174, 42, 25, 0.2);
      --rabby-light-neutral-title-1: rgba(25, 41, 69, 1);
      --rabby-light-neutral-body: rgba(62, 73, 94, 1);
      --rabby-light-neutral-foot: rgba(106, 117, 135, 1);
      --rabby-light-neutral-line: rgba(211, 216, 224, 1);
      --rabby-light-neutral-bg-1: rgba(255, 255, 255, 1);
      --rabby-light-neutral-bg-2: rgba(242, 244, 247, 1);
      --rabby-light-neutral-bg-3: rgba(247, 250, 252, 1);
      --rabby-light-neutral-card-1: rgba(255, 255, 255, 1);
      --rabby-light-neutral-card-2: rgba(242, 244, 247, 1);
      --rabby-light-neutral-card-3: rgba(247, 250, 252, 1);
      --rabby-light-neutral-title-2: rgb(255, 255, 255, 1);
      --rabby-light-neutral-black: rgba(0, 0, 0, 1);

      --r-blue-default: var(--rabby-light-blue-default);
      --r-blue-light-1: var(--rabby-light-blue-light-1);
      --r-blue-light-2: var(--rabby-light-blue-light-2);
      --r-blue-disable: var(--rabby-light-blue-disable);
      --r-green-default: var(--rabby-light-green-default);
      --r-green-light: var(--rabby-light-green-light);
      --r-orange-default: var(--rabby-light-orange-default);
      --r-orange-light: var(--rabby-light-orange-light);
      --r-red-default: var(--rabby-light-red-default);
      --r-red-light: var(--rabby-light-red-light);
      --r-red-dark: var(--rabby-light-red-dark);
      --r-red-light-2: var(--rabby-light-red-light-2);
      --r-neutral-title-1: var(--rabby-light-neutral-title-1);
      --r-neutral-body: var(--rabby-light-neutral-body);
      --r-neutral-foot: var(--rabby-light-neutral-foot);
      --r-neutral-line: var(--rabby-light-neutral-line);
      --r-neutral-bg-1: var(--rabby-light-neutral-bg-1);
      --r-neutral-bg-2: var(--rabby-light-neutral-bg-2);
      --r-neutral-bg-3: var(--rabby-light-neutral-bg-3);
      --r-neutral-card-1: var(--rabby-light-neutral-card-1);
      --r-neutral-card-2: var(--rabby-light-neutral-card-2);
      --r-neutral-card-3: var(--rabby-light-neutral-card-3);
      --r-neutral-title-2: var(--rabby-light-neutral-title-2);
      --r-neutral-black: var(--rabby-light-neutral-black);

      --button-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
      --modal-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
      --icon-stroke: #3e495e;
    }
  }

  :global {
    *,
    ::before,
    ::after {
      box-sizing: border-box;
    }

    /*
Grouping content
================
*/

    /**
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
*/

    hr {
      height: 0; /* 1 */
      color: inherit; /* 2 */
    }

    /*
Text-level semantics
====================
*/

    /**
Add the correct text decoration in Chrome, Edge, and Safari.
*/

    abbr[title] {
      text-decoration: underline dotted;
    }

    /**
Add the correct font weight in Edge and Safari.
*/

    b,
    strong {
      font-weight: bolder;
    }

    /**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

    code,
    kbd,
    samp,
    pre {
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono",
        Menlo, monospace; /* 1 */
      font-size: 1em; /* 2 */
    }

    /**
Add the correct font size in all browsers.
*/

    small {
      font-size: 80%;
    }

    /**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }

    sub {
      bottom: -0.25em;
    }

    sup {
      top: -0.5em;
    }

    /*
Tabular data
============
*/

    /**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

    table {
      text-indent: 0; /* 1 */
      border-color: inherit; /* 2 */
    }

    /*
Forms
=====
*/

    /**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: inherit; /* 1 */
      font-size: 100%; /* 1 */
      line-height: 1.15; /* 1 */
      margin: 0; /* 2 */
    }

    /**
Remove the inheritance of text transform in Edge and Firefox.
*/

    button,
    select {
      text-transform: none;
    }

    /**
Correct the inability to style clickable types in iOS and Safari.
*/

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
      -webkit-appearance: button;
    }

    /**
Remove the inner border and padding in Firefox.
*/

    ::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }

    /**
Restore the focus styles unset by the previous rule.
*/

    :-moz-focusring {
      outline: 1px dotted ButtonText;
    }

    /**
Remove the additional ':invalid' styles in Firefox.
See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
*/

    :-moz-ui-invalid {
      box-shadow: none;
    }

    /**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

    legend {
      padding: 0;
    }

    /**
Add the correct vertical alignment in Chrome and Firefox.
*/

    progress {
      vertical-align: baseline;
    }

    /**
Correct the cursor style of increment and decrement buttons in Safari.
*/

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      height: auto;
    }

    /**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

    [type="search"] {
      -webkit-appearance: textfield; /* 1 */
      outline-offset: -2px; /* 2 */
    }

    /**
Remove the inner padding in Chrome and Safari on macOS.
*/

    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    /**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

    ::-webkit-file-upload-button {
      -webkit-appearance: button; /* 1 */
      font: inherit; /* 2 */
    }

    /*
Interactive
===========
*/

    /*
Add the correct display in Chrome and Safari.
*/

    summary {
      display: list-item;
    }
    button {
      font-family: var(--rk-font-family, var(--rk-font));
      background: transparent;
      box-shadow: none;
      border: 0;
      padding: 0;
    }
  }
</style>
