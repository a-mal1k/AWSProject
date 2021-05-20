import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from './graphql/mutations';
import Header from './components/Header';
import Note from './components/Note';

const initialFormState = { title: '', content: '' };

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listNotes.items);
  }

  function addNote(newNote) {
    setNotes((prevItems) => {
      return [...prevItems, newNote];
    });
  }
  async function submitNote(event) {
    addNote(note);
    if (!formData.title || !formData.content) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    setNote(initialFormState);
    event.preventDefault();
  }
  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function expand() {
    setExpanded(true);
  }
  return (
    <div className='App'>
      <Header />
      <form className='create-note'>
        {isexpanded && (
          <input
            name='title'
            onChange={handleChange}
            value={note.title}
            placeholder='Title'
          />
        )}

        <textarea
          name='content'
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder='Take a note...'
          rows={isexpanded ? 3 : 1}
        />
        <Zoom in={isexpanded}>
          <Fab onClick={submitNote}>
            <PostAddIcon />
          </Fab>
        </Zoom>
      </form>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default withAuthenticator(App);
