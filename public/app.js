$(document).ready(() => {
  getAllFolders();
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
  let $url = $('.url-input').val();
  fetch('/api/v1/urls', {
    'method': 'POST',
    'headers': {'Content-Type': 'application/json'},
    'body': JSON.stringify({ longUrl: $url, shortUrl: '', date: Date.now(), visits: 0 })
  })
  .then(response => response.json())
  .then(data => appendLinks(data))
  .catch(error => console.error('error: ', error))
})

const displayFolders = (folders) => {
  return folders.map(folder => {
    appendFolders(folder.title);
    appendOption(folder.title);
  });
}

const appendFolders = (folderName) => {
  $('.folders').append(`<p class="folder-name">${folderName}</p>`);
}

const renderLinks = (links) => {
  return links.map(linkCard => appendLinks(linkCard))
}

const appendLinks = (linkCard) => {
  $('.link-list').append(`
    <article class="link-cards">
      <a href="${linkCard.longUrl}">${linkCard.longUrl}</a>
      <a href="${linkCard.shortUrl}">${linkCard.shortUrl}</a>
      <p>${linkCard.visits}</p>
      <p>Date: ${linkCard.date}</p>
    </article>`)
}

const appendOption = (title) => {
  $('.folder-options').append(`<option value="${title}">${title}</option>`)
}

const getAllFolders = () => {
  fetch('/api/v1/folders')
  .then(response => response.json())
  .then(data => {
    displayFolders(data)
  })
  .catch(error => {
    console.error('error: ', error)
  })
}

const getNewFolder = (title, id) => {
  fetch(`api/v1/folders/${id}`)
  .then(response => response.json())
  .then(data => appendFolders(title))
  .catch(error => console.error('error: ', error))
}
