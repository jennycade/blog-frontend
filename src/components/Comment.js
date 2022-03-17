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
  const handleEditClick = (e) => {
    e.currentTarget.blur();
    setEditing(true);
  }
  const handleUpdateText = (e) => {
    setText(e.target.value);
  }
  const handleSubmitUpdate = async (e) => {
    e.currentTarget.blur();
    setEditing(false);
    console.log('Editing comment');
    console.log(comment);
    await updateComment(comment._id, text);
    // FIX: postId not going through to API

  }
  const handleCancelClick = (e) => {
    e.currentTarget.blur();
    // reset text
    setText(comment.text);
    // reset editing
    setEditing(false);
  }
  const handleDeleteClick = (e) => {
    e.currentTarget.blur();
    // TODO
  }

  // TODO

  // click Edit comment -> show comment text in textbox, Update and Cancel buttons
  // click Delete comment -> verify delete -> delete

  return (
    <article key={comment._id}>
      <Byline article={comment} />
      { editing ?
        <>
          <textarea value={text}
            onChange={handleUpdateText}
          />
          <button onClick={handleSubmitUpdate}>Update</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
        :
        <>
          <p>
            {comment.text}
          </p>
          { userId === comment.author._id &&
            <div className='buttonSet hiddenUntilHovering'>
              <button
                onClick={handleEditClick}
                className='outline'
              >
                Edit Comment
              </button>
              <button onClick={handleDeleteClick}>Delete Comment</button>
            </div>
          }
        </>
      }
      
      
    </article>
  );
}

export default Comment;