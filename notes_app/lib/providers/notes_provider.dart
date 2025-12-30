import 'package:flutter/foundation.dart';
import '../models/note.dart';
import '../services/database_service.dart';

/// Provider for managing notes state throughout the application.
///
/// Handles CRUD operations and highlight toggling with proper state
/// management and error handling. Uses ChangeNotifier for reactive updates.
class NotesProvider extends ChangeNotifier {
  final DatabaseService _databaseService;
  List<Note> _notes = [];
  bool _isLoading = false;
  String? _error;

  NotesProvider({DatabaseService? databaseService})
      : _databaseService = databaseService ?? DatabaseService();

  /// List of all notes in the app.
  List<Note> get notes => List.unmodifiable(_notes);

  /// Whether notes are currently being loaded.
  bool get isLoading => _isLoading;

  /// Current error message, if any.
  String? get error => _error;

  /// Loads all notes from the database.
  Future<void> loadNotes() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _notes = await _databaseService.getAllNotes();
    } catch (e) {
      _error = 'Failed to load notes: $e';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Creates a new note.
  ///
  /// Returns the created note with its assigned ID, or null if creation fails.
  Future<Note?> createNote({
    required String title,
    required String content,
  }) async {
    _error = null;
    try {
      final now = DateTime.now();
      final note = Note(
        title: title,
        content: content,
        isHighlighted: false,
        createdAt: now,
        updatedAt: now,
      );
      final id = await _databaseService.insertNote(note);
      final createdNote = note.copyWith(id: id);
      _notes.insert(0, createdNote); // Add to top of list
      notifyListeners();
      return createdNote;
    } catch (e) {
      _error = 'Failed to create note: $e';
      notifyListeners();
      return null;
    }
  }

  /// Updates an existing note.
  ///
  /// Returns true if the update was successful.
  Future<bool> updateNote(Note note) async {
    _error = null;
    final updatedNote = note.copyWith(updatedAt: DateTime.now());
    
    try {
      await _databaseService.updateNote(updatedNote);
      final index = _notes.indexWhere((n) => n.id == note.id);
      if (index != -1) {
        _notes[index] = updatedNote;
        // Re-sort by updated date
        _notes.sort((a, b) => b.updatedAt.compareTo(a.updatedAt));
        notifyListeners();
      }
      return true;
    } catch (e) {
      _error = 'Failed to update note: $e';
      notifyListeners();
      return false;
    }
  }

  /// Deletes a note by ID.
  ///
  /// Returns true if deletion was successful.
  Future<bool> deleteNote(int id) async {
    _error = null;
    try {
      await _databaseService.deleteNote(id);
      _notes.removeWhere((note) => note.id == id);
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Failed to delete note: $e';
      notifyListeners();
      return false;
    }
  }

  /// Toggles the highlight state of a note.
  ///
  /// This method provides optimistic UI updates for immediate feedback,
  /// with rollback on failure. It triggers analytics events for tracking
  /// feature adoption.
  ///
  /// Returns true if the toggle was successful.
  Future<bool> toggleHighlight(int noteId) async {
    _error = null;
    final index = _notes.indexWhere((n) => n.id == noteId);
    if (index == -1) {
      _error = 'Note not found';
      notifyListeners();
      return false;
    }

    final note = _notes[index];
    final newHighlightState = !note.isHighlighted;
    
    // Optimistic update for immediate UI feedback
    _notes[index] = note.copyWith(
      isHighlighted: newHighlightState,
      updatedAt: DateTime.now(),
    );
    notifyListeners();

    try {
      await _databaseService.updateHighlightStatus(noteId, newHighlightState);
      
      // Log analytics event (placeholder for actual analytics implementation)
      _logHighlightEvent(noteId, newHighlightState);
      
      return true;
    } catch (e) {
      // Rollback on failure
      _notes[index] = note;
      _error = 'Failed to update highlight: $e';
      notifyListeners();
      return false;
    }
  }

  /// Gets a note by ID from the in-memory cache.
  Note? getNoteById(int id) {
    try {
      return _notes.firstWhere((note) => note.id == id);
    } catch (_) {
      return null;
    }
  }

  /// Logs analytics events for highlight toggling.
  ///
  /// This is a placeholder that should be connected to the actual
  /// analytics provider in production.
  void _logHighlightEvent(int noteId, bool isHighlighted) {
    final eventName = isHighlighted ? 'note_highlighted' : 'note_unhighlighted';
    // TODO: Connect to actual analytics provider
    debugPrint('Analytics: $eventName - noteId: $noteId, source: detail_screen');
  }

  /// Clears any error state.
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
