import { div, h3, button } from '../../scripts/dom-builder.js';
import { getSEOResults, renderSEOPanel } from './panels/seo.js';

const tabs = [
  // { title: 'General', selected: true },
  { id: 'seo', title: 'SEO Check Results', selected: true },
];

function setTab(active) {
  tabs.forEach((tab) => {
    tab.selected = tab.title === active.title;
  });
}

function setPanel(id) {
  switch (id) {
    case 'seo':
      return renderSEOPanel();
    default:
      return '<p>No matching panel.</p>';
  }
}

function TabButton(props) {
  const id = `tab-${props.idx + 1}`;
  const selected = props.tab.selected === true;

  return button(
    {
      id,
      class: 'preflight-tab-button',
      key: props.tab.id,
      'aria-selected': selected,
      onclick: () => setTab(props.tab),
    },
    props.tab.title,
  );
}

function TabPanel(props) {
  const id = `panel-${props.idx + 1}`;
  const labeledBy = `tab-${props.idx + 1}`;
  const selected = props.tab.selected === true;

  return div(
    {
      id,
      class: 'preflight-tab-panel',
      'aria-labelledby': labeledBy,
      key: props.tab.id,
      'aria-selected': selected,
      role: 'tabpanel',
    },
    setPanel(props.tab.id),
  );
}

export default async function decorate(el) {
  // collect panel results
  await getSEOResults();

  // render panels
  const preflight = div(
    { class: 'preflight' },
    div({ class: 'preflight-heading' }, h3({ id: 'preflight-title' }, 'SAP ContentHub Preflight')),
    div(
      {
        class: 'preflight-tab-button-group',
        role: 'tablist',
        'aria-labelledby': 'preflight-title',
      },
      ...tabs.map((tab, idx) => TabButton({ tab, idx })),
    ),
    div({ class: 'preflight-content' }, ...tabs.map((tab, idx) => TabPanel({ tab, idx }))),
    div({ class: 'preflight-content' }),
  );
  el.replaceWith(preflight);
}
