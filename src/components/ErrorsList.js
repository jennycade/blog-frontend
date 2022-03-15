const ErrorsList = (props) => {
  // props
  const { errors } = props;

  if (errors.length > 0) {
    return (
      <section className='error'>
        <p>Errors</p>
        <ul>
          {errors.map((error) => {
            if (typeof error === 'string') {
              return <li key={error}>{error}</li>
            } else {
              return <li>Non-string error</li>
            }
          })}
        </ul>
      </section>
    );
  } else {
    return (<></>);
  }
  
};

export default ErrorsList;