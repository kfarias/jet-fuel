$(() => {
  fetch('/api/folders')
  .then(response => response.json())
  .then(data => renderFolders(data))

  fetch('/api/urls')
  .then(response => response.json())
  .then(data => console.log(data))
})

$('.save-btn').on('click', function() {
  let $folderName = $('.folder-input').val();
  fetch('api/folders', {
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
  .then(data => append(data.name))
})

const renderFolders = (folders) => {
  return folders.map(folder => append(folder.name));
}

const append = (folderName) => {
  $('.folders').append(`<p>${folderName}</p>`);
}
