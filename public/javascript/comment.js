async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('input[name="comment-body"]')
    .value.trim();

    // retrieve ID of post that is being commented on
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Check that the comment_text has a value, and add it to the database
  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
