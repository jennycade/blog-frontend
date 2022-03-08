const Time = (props) => {
  // props
  const { time } = props;

  // convert to something nicer
  const formatOptions = {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric', 
    minute: '2-digit',
  };
  const formattedTime = new Date(time).toLocaleDateString(undefined, formatOptions);

  return (
    <time dateTime={time}>
      {formattedTime}  
    </time>
  );
}

export default Time;