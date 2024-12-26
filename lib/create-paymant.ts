import axios from 'axios';

export async function CreatePayPalPayment(amount: number) {
  const ClientId =
    'AeM0M4Fh41Dt0v1ekPshKrs3Q3yEeg1Xhs1NHu_zhCvx-fe4KTNk6KyYSfb2G8PScGkzKIYJXJuflnij';
  const SecretId =
    'EHcOXSOd4PZreepJfR0uw76xXLTf2FlrRoSiFDKUj7evCdaqxJMi6fV4kAVjBQbPJNUE7zqICyRwJcw2';

  try {
    const auth = Buffer.from(`${ClientId}:${SecretId}`).toString('base64');

    const tokenResponse = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${auth}`,
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    const paymentResponse = await axios.post(
      'https://api.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
        application_context: {
          return_url: `http://localhost:3000`,
          cancel_url: `http://localhost:3000`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const redirectLink = paymentResponse.data.links?.find(
      (link: any) => link.rel === 'approve',
    )?.href;

    if (redirectLink) {
      return redirectLink;
    } else {
      throw new Error('Redirect URL not found in payment response');
    }
  } catch (error) {
    console.log(error);
  }
}
