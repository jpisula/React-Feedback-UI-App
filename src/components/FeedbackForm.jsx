import { useContext, useEffect, useState } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEdit, updateFeedbackItem } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (!feedbackEdit.edit) return;
    const { text } = feedbackEdit.item;
    setBtnDisabled(false);
    setText(text);
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters.');
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      };

      if (feedbackEdit.edit) {
        updateFeedbackItem(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(rating) => {
            setRating(rating);
          }}
        />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
