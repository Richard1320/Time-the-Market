export function isHolding(transactionLog) {
  // Every buy and sell is an item in the transaction log
  // Odd number of items in log is holding (bought)
  // Even number of items in log is waiting (sold)
  let transactionLength = transactionLog.length;
  return transactionLength % 2 === 1;
}
