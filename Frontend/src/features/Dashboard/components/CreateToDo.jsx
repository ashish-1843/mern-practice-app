import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Delete, Edit, Plus, Search } from 'lucide-react'
import { useNotes } from '../hooks/useNotes'
import '../dashboard.css';
import { toast } from 'react-toastify'

const CreateToDo = () => {

  const { handleGetNotes, handleUpdateNote, handleCreateNote, handleDeleteNote } = useNotes();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteID, setNoteID] = useState("");
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) => {
    return (
      (note.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (note.description || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  const getNotes = async () => {
    const data = await handleGetNotes();
    setNotes(data.notes);
  }

  useEffect(() => {
    getNotes();
  }, [])

  const handleEdit = (note) => {
    setNoteID(note._id);
    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setOpen(true);
  };

  const handleCreate = () => {
    setNoteID("");
    setSelectedNote(null);
    setTitle("");
    setDescription("");
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedNote) {
        await handleUpdateNote(noteID, {
          title,
          description,
        });

        getNotes();
        setOpen(false);
        toast.success("Updated Successfully!")
      } else {
        await handleCreateNote({ title, description })
        getNotes();
        setOpen(false);
        toast.success("Note Created Successfully!")
      }
    }
    catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  const deleteNote = async (id) => {
    try {
      await handleDeleteNote(id);
      getNotes();
      toast.success("Note Deleted Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }



  return (
    <>
      <input type='text'
                placeholder='Search notes by title or description..'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-2/5 absolute right-80 rounded-xl border border-green-200 bg-white !mt-2 !p-2 text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 !bg-transparent text-white"
              />
      {
        filteredNotes.length > 0 ? (
          <section className='note-card'>
              <h2 className='text-green-600'>My Notes</h2>
            <ul className='note-list'>
              {filteredNotes.map((note, i) => (
                <li>
                  <h3 className='text-green-600'>{i + 1}. {note.title} </h3>

                  <p>{note.description}</p>
                  <hr></hr>
                  <div className='note-btn'>


                    <button
                      type="button"
                      onClick={() => handleEdit(note)}><Edit size={18} className='!mt-1' /></button>

                    <button
                      type="button"
                      onClick={() => deleteNote(note._id)}
                    ><Delete size={20} className='!mt-1' /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : <p className='!mt-40 text-center text-green-600 font-bold'>{search.trim() ? 'No matching found' : "No data found"}</p>
      }

      <Button
        type="button"
        onClick={handleCreate}
        className=" cursor-pointer h-11 rounded-xl border-green-200 bg-white  text-green-700 shadow-sm transition hover:border-green-400 hover:bg-green-50 hover:text-green-800 absolute bottom-20 right-20"
      >
        <Plus size={24} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="w-[calc(100%-1rem)] max-w-lg rounded-2xl !p-6 border border-green-100 bg-gradient-to-br from-white via-green-50 to-emerald-50  text-slate-800 shadow-[0_25px_60px_-20px_rgba(22,163,74,0.45)] sm:rounded-3xl sm:p-7">
          <form onSubmit={(e) =>
            handleSubmit(e)
          }>
            <DialogHeader className="space-y-2 px-1">
              <DialogTitle className="text-2xl font-bold text-green-700">
                {selectedNote ? "Edit your Note" : "Create your Note"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                {selectedNote ? "Update your Note" : "Make your notes here. Click save when you're done."}

              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="space-y-4 !pt-2 !px-1">
              <Field>
                <Label htmlFor="name-1" className="text-sm font-medium text-slate-700">Note Name</Label>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  id="name-1" name="name" value={title} className="!p-2 h-11 border-green-200 bg-white text-slate-800 shadow-sm transition focus:border-green-400 focus:ring-2 focus:ring-green-200" />
              </Field>
              <Field>
                <Label htmlFor="username-1" className="text-sm font-medium text-slate-700">Description</Label>
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  id="username-1" name="username" value={description} className="!p-2 h-11 border-green-200 bg-white text-slate-800 shadow-sm transition focus:border-green-400 focus:ring-2 focus:ring-green-200" />
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-4 mx-0 mb-0 border-t border-green-100 bg-transparent sm:justify-end sm:p-4">
              <DialogClose render={<Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer h-10 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-100">Cancel</Button>} />
              <Button type="submit" className="cursor-pointer h-10 rounded-xl bg-green-600 text-white shadow-sm hover:bg-green-500">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>

      </Dialog>
      
    </>
  )
}

export default CreateToDo