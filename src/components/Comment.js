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
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

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
    await updateComment(comment._id, text);
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
    setShowDeleteWarning(true);
  }
  const handleDeleteConfirmClick = (e) => {
    e.currentTarget.blur();
    setShowDeleteWarning(false);
    deleteComment(comment._id);
  }
  const handleDeleteCancelClick = (e) => {
    e.currentTarget.blur();
    setShowDeleteWarning(false);
  }

  return (
    <article key={comment._id}>
      <Byline article={comment} />
      { editing ?
        <>
          <textarea
            value={text}
            onChange={handleUpdateText}
            autoFocus={true}
          />
          <div className='buttonSet'>
            <button onClick={handleSubmitUpdate}>Update</button>
            <button className='outline' onClick={handleCancelClick}>Cancel</button>
          </div>
        </>
        :
        <>
          <p>
            {comment.text}
          </p>
          { userId === comment.author._id &&
            <div className='dimUntilHovering'>
              <div className='buttonSet'>
                <button
                  onClick={handleEditClick}
                  className='outline'
                >
                  Edit Comment
                </button>
                <button onClick={handleDeleteClick}>Delete Comment</button>
              </div>
            </div>
          }
        </>
      }

      { showDeleteWarning &&
        <div className='modalWrapper'>
          <aside className='modal'>
            <p>Are you sure you want to delete this comment? It cannot be undone.</p>
            <div className='buttonSet'>
              <button onClick={handleDeleteConfirmClick}>Delete</button>
              <button className='outline' onClick={handleDeleteCancelClick}>Cancel</button>
            </div>
          </aside>
        </div>
      }
      
      
    </article>
  );
}

export default Comment;