
document.addEventListener('DOMContentLoaded', () => {

  const packs = [
    {
      id: 'brian-moser',
      name: 'Brian Moser',
      show: 'Dexter',
      coverUrl: 'https://preview.redd.it/brian-moser-v0-2eiqj6elvr5f1.jpeg?width=640&crop=smart&auto=webp&s=ff014882c6e1b5627518200097d6a0cb2917c7b4',
      downloadUrl: 'https://transfer.it/t/13dnidtTRL6S'
    },
    {
      id: 'walter-white',
      name: 'Walter White',
      show: 'Breaking Bad',
      coverUrl: 'https://cdn.pfps.gg/pfps/1239-walter-sunglasses.png',
      downloadUrl: 'https://drive.google.com/drive/folders/1Oa1Zm3CKRgEHfJ8wPgR6tsBdNIniEnbO'
    },
    {
      id: 'dexter-resurrection',
      name: 'Dexter',
      show: 'Dexter Resurrection',
      coverUrl: 'https://preview.redd.it/favourite-dexter-scenes-v0-w2usgv468aed1.jpg?width=640&crop=smart&auto=webp&s=bf9b0f632f43842df439b8745321d512cb8af676',
      downloadUrl: 'https://drive.google.com/drive/folders/1YRgCN_Yd4Ylq1nUUkn48zDtQN8crPuQk'
    },
    {
  id: 'angel-batista',
  name: 'Angel Batista',
  show: 'Dexter',
  coverUrl: 'https://i.pinimg.com/736x/18/55/b8/1855b88d78a49d2d9860deaf9145f3e8.jpg',
  downloadUrl: 'https://gofile.io/d/1KluVo'
     },
     {
  id: 'joe-bart',
  name: 'Joe bart',
  show: 'Twitch/Youtube',
  coverUrl: 'https://yt3.googleusercontent.com/xpueZnr9nKfzKjp9i0V3ypWFOhNAkdaNoHFG9STBoamXD6WWZ5Igh4UNjvTuZk4qW8GCftA0hNs=s900-c-k-c0x00ffffff-no-rj',
  downloadUrl: 'https://gofile.io/d/LT3Whq'
     },
     {
  id: 'superman',
  name: 'Superman',
  show: 'Superman',
  coverUrl: 'https://assets-prd.ignimgs.com/2025/05/13/superman-2025-button-1747149383684.jpg',
  downloadUrl: 'https://mega.nz/folder/u44m3bDA#EfLMlSPIdS32W6weKniBBQ'
    },
    {
   id: 'joseph-aaron',
   name: 'Joseph/Aaron',
   show: 'Creep',
   coverUrl: 'https://www5.lunapic.com/do-not-link-here-use-hosting-instead/175786897599998045?68768086213',
   downloadUrl: 'https://gofile.io/d/beep0s'
      },
      {
   id: 'michael-scofield',
   name: 'Michael Scofield',
   show: 'Prison break',
   coverUrl: 'https://i.pinimg.com/736x/ee/9e/ed/ee9eedf9ceb1ae9189ec3b3ca707f4d3.jpg',
   downloadUrl: 'https://gofile.io/d/HFRoEN'
     }



  ];


  const grid = document.getElementById('packGrid');
  const input = document.getElementById('searchInput');
  const empty = document.getElementById('emptyState');


  const modal = createModal();
  document.body.appendChild(modal.root);


  const fragment = document.createDocumentFragment();
  const cardRefs = new Map();

  packs.forEach(pack => {
    const card = renderCard(pack, modal);
    fragment.appendChild(card);
    cardRefs.set(pack.id, card);
  });
  grid.appendChild(fragment);


  const applyFilter = () => {
    const q = (input.value || '').trim().toLowerCase();
    let visible = 0;

    packs.forEach(p => {
      const hay = `${p.name} ${p.show}`.toLowerCase();
      const match = hay.includes(q);
      const card = cardRefs.get(p.id);
      if (card) {
        card.hidden = !match;
        if (match) visible++;
      }
    });

    empty.hidden = visible !== 0;
  };

  input.addEventListener('input', applyFilter);
  applyFilter();
});


function renderCard(pack, modal) {
  const article = document.createElement('article');
  article.className = 'card';
  article.dataset.title = (pack.name || '').toLowerCase();


  const media = document.createElement('div');
  media.className = 'card-media';
  const img = document.createElement('img');
  img.src = pack.coverUrl;
  img.alt = `${pack.name} — ${pack.show}`;
  img.loading = 'lazy';
  img.decoding = 'async';
  media.appendChild(img);


  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const meta = document.createElement('div');
  meta.className = 'meta';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = pack.name;

  const sub = document.createElement('p');
  sub.className = 'card-sub';
  sub.textContent = pack.show;

  meta.appendChild(title);
  meta.appendChild(sub);

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const viewBtn = document.createElement('button');
  viewBtn.className = 'btn btn-ghost';
  viewBtn.type = 'button';
  viewBtn.textContent = 'View';
  viewBtn.addEventListener('click', () => modal.open(`${pack.name} — ${pack.show}`, pack.coverUrl, pack.downloadUrl));

  const downBtn = document.createElement('a');
  downBtn.className = 'btn btn-primary';
  downBtn.href = pack.downloadUrl;
  downBtn.target = '_blank';
  downBtn.rel = 'noopener noreferrer';
  downBtn.textContent = 'Download';

  actions.appendChild(viewBtn);
  actions.appendChild(downBtn);

  overlay.appendChild(meta);
  overlay.appendChild(actions);

  article.appendChild(media);
  article.appendChild(overlay);


  media.addEventListener('click', () => modal.open(`${pack.name} — ${pack.show}`, pack.coverUrl, pack.downloadUrl));

  return article;
}

const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1416630440265121913/XYElk2UNWExbkmSdQrA6ndVtruc7f7S1DN1tueiDYy77mrNRTdpfXgkY-iPxJgCi1eN3";

const requestModal = createRequestModal(REQUEST_WEBHOOK);
document.body.appendChild(requestModal.root);

const requestOpenBtn = document.getElementById('requestOpenBtn');
if (requestOpenBtn) {
  requestOpenBtn.addEventListener('click', () => requestModal.open());
}

function createRequestModal(webhookUrl) {
  const root = document.createElement('div');
  root.className = 'modal';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Request a pack');

  const inner = document.createElement('div');
  inner.className = 'modal-inner';

  const content = document.createElement('div');
  content.className = 'modal-content';


  const formWrap = document.createElement('div');
  formWrap.className = 'form-grid';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = 'Request a Pack';

  const nameLabel = document.createElement('label');
  nameLabel.className = 'label';
  nameLabel.htmlFor = 'reqName';
  nameLabel.textContent = 'Name';

  const nameInput = document.createElement('input');
  nameInput.id = 'reqName';
  nameInput.className = 'input';
  nameInput.placeholder = 'e.g., Walter White';
  nameInput.autocomplete = 'off';

  const showLabel = document.createElement('label');
  showLabel.className = 'label';
  showLabel.htmlFor = 'reqShow';
  showLabel.textContent = 'Show';

  const showInput = document.createElement('input');
  showInput.id = 'reqShow';
  showInput.className = 'input';
  showInput.placeholder = 'e.g., Breaking Bad';
  showInput.autocomplete = 'off';

  const hint = document.createElement('p');
  hint.className = 'help';
  hint.textContent = 'Enter both fields and click Send.';

  formWrap.appendChild(title);
  formWrap.appendChild(nameLabel);
  formWrap.appendChild(nameInput);
  formWrap.appendChild(showLabel);
  formWrap.appendChild(showInput);
  formWrap.appendChild(hint);

  content.appendChild(formWrap);


  const bar = document.createElement('div');
  bar.className = 'modal-bar';

  const barTitle = document.createElement('h4');
  barTitle.className = 'modal-title';
  barTitle.textContent = 'Submit request';

  const barActions = document.createElement('div');
  barActions.className = 'modal-actions';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-ghost';
  closeBtn.type = 'button';
  closeBtn.textContent = 'Cancel';

  const sendBtn = document.createElement('button');
  sendBtn.className = 'btn btn-primary';
  sendBtn.type = 'button';
  sendBtn.textContent = 'Send';

  barActions.appendChild(closeBtn);
  barActions.appendChild(sendBtn);
  bar.appendChild(barTitle);
  bar.appendChild(barActions);

  inner.appendChild(content);
  inner.appendChild(bar);
  root.appendChild(inner);

  let sending = false;

  async function submit() {
    if (sending) return;
    const name = (nameInput.value || '').trim();
    const show = (showInput.value || '').trim();
    if (!name || !show) {
      hint.textContent = 'Both Name and Show are required.';
      return;
    }

    sending = true;
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    const payload = {
      content: null,
      embeds: [
        {
          title: 'New Pack Request',
          color: 0xA259FF,
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Show', value: show, inline: true }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed');

      hint.textContent = 'Sent! Thank you.';
      setTimeout(api.close, 800);
    } catch (e) {
      hint.textContent = 'Failed to send. Please try again.';
    } finally {
      sending = false;
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';
      nameInput.value = '';
      showInput.value = '';
    }
  }

  const api = {
    root,
    open: () => {
      root.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => nameInput.focus(), 50);
    },
    close: () => {
      root.classList.remove('open');
      document.body.style.overflow = '';
    }
  };


  closeBtn.addEventListener('click', api.close);
  sendBtn.addEventListener('click', submit);
  root.addEventListener('click', (e) => { if (e.target === root) api.close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('open')) api.close();
    if (e.key === 'Enter' && root.classList.contains('open')) submit();
  });

  return api;
}


function createModal() {
  const root = document.createElement('div');
  root.className = 'modal';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Image preview');

  const inner = document.createElement('div');
  inner.className = 'modal-inner';

  const content = document.createElement('div');
  content.className = 'modal-content';

  const img = document.createElement('img');
  img.alt = '';
  content.appendChild(img);

  const bar = document.createElement('div');
  bar.className = 'modal-bar';

  const title = document.createElement('h4');
  title.className = 'modal-title';
  title.textContent = '';

  const barActions = document.createElement('div');
  barActions.className = 'modal-actions';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-ghost';
  closeBtn.type = 'button';
  closeBtn.textContent = 'Close';

  const dlBtn = document.createElement('a');
  dlBtn.className = 'btn btn-primary';
  dlBtn.textContent = 'Download';
  dlBtn.target = '_blank';
  dlBtn.rel = 'noopener noreferrer';

  barActions.appendChild(closeBtn);
  barActions.appendChild(dlBtn);

  bar.appendChild(title);
  bar.appendChild(barActions);

  inner.appendChild(content);
  inner.appendChild(bar);
  root.appendChild(inner);

  const api = {
    root,
    open: (t, url, downloadUrl) => {
      img.src = url;
      img.alt = t;
      title.textContent = t;
      dlBtn.href = downloadUrl;
      root.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close: () => {
      root.classList.remove('open');
      img.src = '';
      document.body.style.overflow = '';
    }
  };

  root.addEventListener('click', (e) => {
    if (e.target === root) api.close();
  });
  closeBtn.addEventListener('click', api.close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('open')) api.close();
  });

  return api;
}
