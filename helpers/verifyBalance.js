function verifyBalance(amount, balance) {
  if (balance < amount) return false;
  else return true;
}

module.exports = verifyBalance;
