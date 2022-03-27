const Loading = (props) => {
  return (
    <>
      { props.children }
      <p className='loading'>Loading...</p>
    </>
  );
};

export default Loading;