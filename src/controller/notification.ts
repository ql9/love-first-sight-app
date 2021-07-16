export const sendNotification = async (ownerId: string, userId: string) => {
  return await fetch(
    'https://murmuring-taiga-67756.herokuapp.com/notification/like/' +
    ownerId +
    '/' +
    userId,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());
};
