$(() => {
  fetch('/api/folders')
  .then(response => response.json())
  .then(data => renderFolders(data))

  fetch('/api/urls')
  .then(response => response.json())
  .then(data => renderLinks(data))
})

$('.save-btn').on('click', function() {
  let $folderName = $('.folder-input').val();
  fetch('/api/folders', {
    'method': 'POST',
    'headers': {'Content-Type': 'application/json' },
    'body': JSON.stringify({ name: $folderName })
  })
  .then(response => {
    if(!response.ok) {
      console.log('error');
    }
    return response.json();
  })
  .then(data => appendFolders(data.name))
})

$('.submit-btn').on('click', function(e) {
  e.preventDefault();
  let $url = $('.url-input').val();
  fetch('/api/urls', {
    'method': 'POST',
    'headers': {'Content-Type': 'application/json'},
    'body': JSON.stringify({ longUrl: $url, shortUrl: '', date: Date.now(), visits: 0, name: 'All' })
  })
  .then(response => {
    if(!response.ok) {
      console.log('error');
    }
    return response.json();
  })
  .then(data => appendLinks(data))
})

const renderFolders = (folders) => {
  return folders.map(folder => appendFolders(folder.name));
}

const appendFolders = (folderName) => {
  $('.folders').append(`<p>${folderName}</p>`);
}

const renderLinks = (links) => {
  return links.map(linkCard => appendLinks(linkCard))
}

const appendLinks = (linkCard) => {
  $('.link-list').append(`
    <article>
      <a href="${linkCard.longUrl}">${linkCard.longUrl}</a>
      <a href="${linkCard.shortUrl}">${linkCard.shortUrl}</a>
      <p>${linkCard.visits}</p>
      <p>Date: ${linkCard.date}</p>
    </article>`)
}
