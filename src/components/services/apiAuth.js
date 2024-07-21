import { projectID, url } from './urls';

export async function createUser(newUser) {
  try {
    const response = await fetch(`${url}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        appType: 'quora',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while creating the user'
    );
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${url}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
      },
      body: JSON.stringify({
        email,
        password,
        appType: 'quora',
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid email or password');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login user');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message ||
        'An error occurred while logging in. Please provide the correct email and password.'
    );
  }
}
