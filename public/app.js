$(document).ready(() => {
  getAllFolders();
  getAllLinks();
})

$('.save-btn').on('click', function() {
  let $folderName = $('.folder-input').val();
  fetch('/api/v1/folders', {
    'method': 'POST',
    'headers': {'Content-Type': 'application/json' },
    'body': JSON.stringify({ title: $folderName })
  })
  .then(response => response.json())
  .then(data => {
    getNewFolder($folderName, data.id);
    appendOption($folderName);
  })
  .catch(error => console.error('error: ', error))
})

$('.submit-btn').on('click', function(e) {
  e.preventDefault();
  let folderID = $('option:selected').attr('id');
  let $url = $('.url-input').val();
  fetch('/api/v1/links', {
    'method': 'POST',
    'headers': {'Content-Type': 'application/json'},
    'body': JSON.stringify({ longUrl: $url, folder_id: folderID, visits: 0 })
  })
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.error('error: ', error))
})

const getFolderLinks = (folderBtn, id) => {
  folderBtn.on('click', () => {
    fetch(`/api/v1/folders/${id}/links`)
    .then(response => response.json())
    .then(data => displayFolderLinks(data))
  })
}

const displayFolderLinks = (links) => {
  $('.link-list').children('.link-cards').remove()
  renderLinks(links)
}

const displayFolders = (folders) => {
  return folders.map(folder => {
    appendFolders(folder.title, folder.id);
    appendOption(folder.title, folder.id);
  });
}

const appendFolders = (folderName, id) => {
  const folderBtn = $(`<button class="folder-name">${folderName}</button>`)
  $('.folders').append(folderBtn);
  getFolderLinks(folderBtn, id)
}

const renderLinks = (links) => {
  return links.map(linkCard => appendLinks(linkCard))
}

const appendLinks = (linkCard) => {
  console.log(linkCard);
  let createdAt = linkCard.created_at.slice(0, 10)
  $('.link-list').append(`
    <article class="link-cards">
      <a href="${linkCard.longUrl}">${linkCard.longUrl}</a>
      <a href="/jet.fuel/${linkCard.id}" target="_blank">/jet.fuel/${linkCard.id}</a>
      <p>Visits: ${linkCard.visits}</p>
      <p>Created: ${createdAt}</p>
    </article>`)
}

const appendOption = (title, id) => {
  $('.folder-options').append(`<option id="${id}" value="${title}">${title}</option>`)
}

const getAllFolders = () => {
  fetch('/api/v1/folders')
  .then(response => response.json())
  .then(data => displayFolders(data))
  .catch(error => console.error('error: ', error))
}

const getNewFolder = (title, id) => {
  fetch(`api/v1/folders/${id}`)
  .then(response => response.json())
  .then(data => appendFolders(title, id))
  .catch(error => console.error('error: ', error))
}

const getAllLinks = () => {
  fetch('api/v1/links')
  .then(response => response.json())
  .then(data => renderLinks(data))
}
