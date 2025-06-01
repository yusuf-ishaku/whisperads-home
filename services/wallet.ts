export const getWallet = async (userId: string, token: string) => {
  const response = await fetch(`/api/wallet/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const fundWallet = async (
  userId: string,
  amount: string,
  email: string,
    callbackUrl: string,

  token: string
) => {
  const response = await fetch(`/api/wallet/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, email, callbackUrl }),
  });
  return await response.json();
};

export const verifyTransaction = async (reference: string, token: string) => {
  const response = await fetch(`/api/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};