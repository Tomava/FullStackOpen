const isNumber = (numberCandidate: unknown) => {
  return (!isNaN(Number(numberCandidate)));
};

export default isNumber;