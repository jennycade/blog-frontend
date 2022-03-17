import { useState } from 'react';


// components
import Byline from './Byline';

const Comment = (props) => {
  // props
  const {
    comment,
    updateComment, deleteComment,
    userId,
  } = props;

  // state
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  // functions
  const handleUpdateText = (e) => {
    // TODO
  }

  // TODO

  // click Edit comment -> show comment text in textbox, Update and Cancel buttons
  // click Delete comment -> verify delete -> delete

  return (
    <article key={comment._id}>
      <Byline article={comment} />
      <p>
        {comment.text}
      </p>
      { userId === comment.author._id &&
        <div className='buttonSet hiddenUntilHovering'>
          <button onClick={setEditing(true)}>Edit Comment</button>
          <button>Delete Comment</button>
        </div>
      }
    </article>
  );
}

export default Comment;