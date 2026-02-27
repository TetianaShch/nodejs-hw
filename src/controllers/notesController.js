import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {

    const { tag, search } = req.query;
    const filter = {};

    if (tag) {
      filter.tag = tag;
    }
    if (search) {
      filter.$text = { $search: search };
    };

    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const created = await Note.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deleted = await Note.findByIdAndDelete(noteId);
    if (!deleted) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const updated = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

