const SuccessMessage = (props) => {
  // props
  const { successMessage } = props;

  if (successMessage === '') return <></>;
  return (
    <p className='success'>
      {successMessage}
    </p>
  );
}

export default SuccessMessage;