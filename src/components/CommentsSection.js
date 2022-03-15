import { useState } from 'react';

// components
import Byline from './Byline';

const CommentsSection = (props) => {
  // props
  const { comments, isLoggedIn, postComment } = props;

  // state
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [text, setText] = useState('');

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (text.trim() === '') {
      const err = new Error('Comment cannot be blank');
      err.status = 400;
      throw err;
    }

    // submit
    await postComment(text);
    setShowCommentBox(false);
    setText('');

    // update comments OR append to comments here
  }

  return (
    <section className='comments'>
      <h1>Comments</h1>

      <section className='addComment'>
        
        { isLoggedIn &&
          <button
            className='outline'
            onClick={() => setShowCommentBox(!showCommentBox)} >
            { showCommentBox ?
              'Hide comment box' :
              'Add comment'
            }
          </button>
        }
        { showCommentBox && isLoggedIn &&
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button type='submit'>Submit</button>
          </form>
        }

        { !isLoggedIn &&
          <p>Log in to add a comment.</p>
        }
      </section>

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