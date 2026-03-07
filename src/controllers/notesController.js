import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {

    const { tag, search } = req.query;

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const query = Note.find().where('userId').equals(req.user._id);

    if (tag) {
      query.where('tag').equals(tag);
    }

    if (search) {
      query.where({ $text: { $search: search } });
    }

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(query.getFilter()),
      query.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page,
      perPage,
      totalPages,
      totalNotes,
      notes,
    });

  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
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
    const created = await Note.create({ ...req.body, userId: req.user._id });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deleted = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
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

    const updated = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

