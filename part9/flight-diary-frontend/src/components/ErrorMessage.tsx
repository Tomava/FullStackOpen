export const ErrorMessage = ({ errorMessage }: { errorMessage: string} ) => {
  const ErrorStyle = {
    color: "red"
  };
  if (errorMessage) {
    return (
      <p style={ErrorStyle}>{errorMessage}</p>
    )
  }
  return null;
};