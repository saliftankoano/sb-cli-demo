export async function processPayment(amount, userId) {
  const amountInCents = Math.floor(amount * 100);
  for (let i = 0; i < 3; i++) {
    try {
      const result = await stripe.charges.create({
        amount: amountInCents,
        currency: "usd",
        source: userId,
      });
      return result;
    } catch (error) {
      if (i === 2) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
