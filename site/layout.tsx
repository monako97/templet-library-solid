import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';
import docs from '@app/docs';
import { css } from 'PackageNameByCSS';
import { Outlet, getPathName, useLocation } from 'PackageNameBySolid';
import { type ColorScheme, theme } from 'neko-ui';
import './components';
import log from '../CHANGELOG.md?raw';

const style = css`
  :root {
    background-color: var(--bg);
  }

  html,
  body {
    inline-size: 100vi;
    font-size: var(--font-size);
    font-family: var(--font-family);
    color: var(--text-color, rgb(0 0 0 / 65%));
    transition-duration: 0.3s;
    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0.94, -0.1, 0.1, 1.2);
  }

  #root {
    display: flex;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
  }

  #root > main {
    animation: route-in var(--transition-duration, 0.3s);
  }

  n-provider {
    display: flex;
    inline-size: 100vi;
  }

  .site-doc-main {
    margin-block-start: 16px;
    inline-size: calc(100% - 288px);
  }

  .site-page-view {
    box-sizing: border-box;
    margin: 16px auto 0;
    min-block-size: calc(100vb - 132px);

    n-md::part(body) > div:empty {
      margin: 0;
      padding: 0;
      background-color: none;
      backdrop-filter: none;
      box-shadow: none;
      pointer-events: none;
    }

    n-md::part(toc) {
      inset-block-start: 16px;
    }

    n-md::part(body) {
      tr > th,
      tr > td {
        &:last-child,
        &:nth-last-child(2) {
          min-inline-size: 45px;
        }
      }
    }
  }

  body {
    overflow-x: hidden;
  }

  body::before {
    position: fixed;
    inset-block-start: 0;
    z-index: 1;
    display: block;
    inline-size: 100vi;
    block-size: 100px;
    background: linear-gradient(
      124deg,
      #f44336,
      #e91e63,
      #9c27b0,
      #673ab7,
      #3f51b5,
      #2196f3,
      #03a9f4,
      #00bcd4,
      #009688,
      #4caf50,
      #8bc34a,
      #cddc39,
      #ffeb3b,
      #ffc107,
      #ff9800,
      #ff5722
    );
    background-size: 800% 800%;
    opacity: 0.2;
    content: '';
    transform: translateY(-100px);
    animation: color-hue 15s var(--transition-timing-function) infinite;
  }

  .n-site-bg {
    position: fixed;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    z-index: -1;
    inline-size: 100vi;
    block-size: 100vb;
    background: linear-gradient(#673ab7, transparent), linear-gradient(90deg, #ff5722, transparent),
      linear-gradient(-90deg, #8bc34a, transparent);
    transform: translate(-50%, -50%);
    background-blend-mode: screen;
    animation: color-hue 15s infinite alternate linear;
    pointer-events: none;
    opacity: 0.05;
  }

  @keyframes route-in {
    from {
      transform: translate3d(0, 16px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes color-hue {
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @media screen and (width <= 1100px) {
    .site-doc-main {
      inline-size: calc(100% - 116px);
    }
  }
`;
const noShadow = css`
  .n-md-body:has(n-md) {
    overflow: initial;
    padding: 0;
    background-color: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    margin-block-end: 0;
  }
`;

function App() {
  let box: HTMLDivElement | undefined;
  const { isDark, scheme: orgScheme } = theme;
  const [scheme, setScheme] = createSignal(orgScheme());
  const location = useLocation();
  const doc = createMemo(() => docs[getPathName(location)]);

  createEffect(() => {
    box?.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function onScheme(e: CustomEvent<keyof typeof ColorScheme>) {
    setScheme(e.detail);
    document.documentElement.setAttribute('data-theme', isDark() ? 'dark' : 'light');
  }
  return (
    <n-provider onScheme={onScheme}>
      <style>{style}</style>
      <site-sider scheme={scheme()} />
      <main ref={box} class="site-doc-main">
        <Show when={!getPathName(location).startsWith('@moneko')}>
          <site-coverage />
        </Show>
        <div class="site-page-view">
          <n-md css={noShadow} not-render={true}>
            <div>
              <Outlet />
            </div>
          </n-md>
          <site-sandbox-group name={getPathName(location)} />
          <For each={doc()}>{(e) => e()}</For>
          <Show when={!getPathName(location)}>
            <n-md text={`[TOC]\n${log}`} />
          </Show>
          <site-pagination />
        </div>
        <site-footer />
      </main>
      <n-back-top
        css={`
          .back-top {
            position: fixed;
          }
        `}
      />
      <Show when={scheme() === 'light' || !isDark()}>
        <div class="n-site-bg" />
      </Show>
    </n-provider>
  );
}

export default App;
