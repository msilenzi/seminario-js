import { createElement } from './helpers.js'

const URL_EPISODES = 'https://rickandmortyapi.com/api/episode'

function handlePaginationClick(e, episodesNode) {
  document
    .querySelector('.pagination__btn--selected')
    .classList.remove('pagination__btn--selected')

  e.target.classList.add('pagination__btn--selected')
  renderEpisodesByPage(e.target.textContent, episodesNode)
}

function renderEpisode({ name, air_date, episode }, parentNode) {
  const li = createElement('li', { className: 'episode glass' }, parentNode)

  createElement('h2', { className: 'episode__name', innerText: name }, li)

  const info = createElement('p', { className: 'episode__info' }, li)
  createElement(
    'span',
    { className: 'episode__episode', innerText: episode },
    info
  )
  createElement(
    'span',
    { className: 'episode__air-date', innerText: air_date },
    info
  )
}

async function renderEpisodes(episodes, parentNode) {
  parentNode.textContent = ''

  const container = createElement('div', { className: 'container' }, parentNode)
  const ul = createElement('ul', { className: 'episodes' }, container)

  episodes.forEach((episodeData) => renderEpisode(episodeData, ul))
}

async function renderEpisodesByPage(page, parentNode) {
  const resp = await fetch(`${URL_EPISODES}?page=${page}`)
  const { results } = await resp.json()

  renderEpisodes(results, parentNode)
}

async function renderPagination(episodesNode, curr, parentNode) {
  const resp = await fetch(URL_EPISODES + curr)
  const { info: { pages }} = await resp.json()

  const pagination = createElement(
    'div',
    { className: 'pagination' },
    parentNode
  )

  for (let i = 1; i <= pages; i++) {
    createElement(
      'button',
      {
        className: `btn glass pagination__btn ${
          curr === i ? 'pagination__btn--selected' : ''
        }`,
        innerText: i,
        onclick: (e) => handlePaginationClick(e, episodesNode),
      },
      pagination
    )
  }
}

const episodesRoot = createElement('div', {}, document.getElementById('root'))
renderEpisodesByPage(1, episodesRoot)
renderPagination(episodesRoot, 1, document.getElementById('root'))