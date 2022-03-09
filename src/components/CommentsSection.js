import Byline from "./Byline";

const CommentsSection = (props) => {
  // props
  const { comments } = props;

  return (
    <section className='comments'>
      <h1>Comments</h1>
      {comments.map((comment) => {
        return (
          <article key={comment._id}>
            <Byline article={comment} />
            <p>
              {comment.text}
            </p>
          </article>
        );
      })}
    </section>
  );
};

export default CommentsSection;