import { authToken, projectID, url } from './urls';

export async function addPost(formData) {
  try {
    const response = await fetch(`${url}/quora/post`, {
      method: 'POST',
      headers: {
        Authorization: authToken,
        projectID: projectID,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Parse response body as JSON
      console.error('Failed to create post:', errorResponse); // Log detailed error message
      throw new Error(`Failed to create post: ${errorResponse}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to post space');
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${url}/quora/post`, {
      headers: {
        projectID: projectID,
      },
    });
    if (!response.ok) {
      throw new Error('Something went wrong while fetching data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(
      error.message || 'Something went wrong while fetching data'
    );
  }
}
export async function getUserPosts(postId) {
  try {
    const response = await fetch(`${url}/quora/post/${postId}`, {
      headers: {
        projectID: projectID,
      },
    });
    if (!response.ok) {
      throw new Error('Something went wrong while fetching data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(
      error.message || 'Something went wrong while fetching data'
    );
  }
}

export async function addSpace(formData) {
  try {
    const response = await fetch(`${url}/quora/channel`, {
      method: 'POST',
      headers: {
        Authorization: authToken,
        projectID: projectID,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Parse response body as JSON
      console.error('Failed to create space:', errorResponse); // Log detailed error message
      throw new Error(`Failed to create space: ${errorResponse}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to create space');
  }
}

export async function getSpaces() {
  try {
    const response = await fetch(`${url}/quora/channel?limit=100`, {
      headers: {
        projectID: projectID,
      },
    });
    if (!response.ok) {
      throw new Error('Something went wrong while fetching data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching spaces:', error);
    throw new Error(
      error.message || 'Something went wrong while fetching data'
    );
  }
}

export async function toggleUpvote(shouldUpVote, postId) {
  try {
    const response = await fetch(`${url}/quora/like/${postId}`, {
      method: shouldUpVote ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error('Something went wrong while upvoting');
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error('Something went wrong while upvoting');
    }

    return data.message;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An unexpected error occurred while upvoting'
    );
  }
}

export async function toggleDownvote(shouldDownVote, postId) {
  try {
    const response = await fetch(`${url}/quora/dislike/${postId}`, {
      method: shouldDownVote ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
        Authorization: authToken,
      },
    });

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error('Something went wrong while downvoting');
    }

    return data.message;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An unexpected error occurred while downvoting'
    );
  }
}

export async function addComments(comment, postId) {
  try {
    const response = await fetch(`${url}/quora/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
        projectID: projectID,
      },
      body: JSON.stringify({ content: comment }),
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Read response as text for error handling
      console.error('Failed to add comment:', errorResponse);
      throw new Error(`Failed to add comment: ${errorResponse}`);
    }

    const data = await response.json(); // Read response as JSON for success handling
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An unexpected error occurred while adding comment'
    );
  }
}

export async function getComments(postId) {
  console.log(postId);
  try {
    const response = await fetch(`${url}/quora/post/${postId}/comments`, {
      method: 'GET',
      headers: {
        Authorization: authToken,
        projectID: projectID,
      },
    });

    if (!response.ok) {
      throw new Error('Something went wrong while fetching data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error(
      error.message || 'Something went wrong while fetching data'
    );
  }
}

export async function deletePost(postId) {
  console.log(postId);
  const response = await fetch(`${url}/quora/post/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: authToken,
      projectID: projectID,
    },
  });
  console.log(response);
  return 'Post is deleted successfully';
}
