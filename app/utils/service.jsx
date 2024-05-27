export const baseUrl = "https://jsonplaceholder.typicode.com";

export const getRequest = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      return { error: true, status: response.status, message };
    }

    return data;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
