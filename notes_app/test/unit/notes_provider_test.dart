import 'package:flutter_test/flutter_test.dart';
import 'package:notes_app/models/note.dart';
import 'package:notes_app/providers/notes_provider.dart';
import 'package:notes_app/services/database_service.dart';

/// Mock database service for testing
class MockDatabaseService extends DatabaseService {
  final List<Map<String, dynamic>> _notes = [];
  int _nextId = 1;
  bool shouldFail = false;

  @override
  Future<int> insertNote(Note note) async {
    if (shouldFail) throw Exception('Database error');
    
    final id = _nextId++;
    final map = note.toMap();
    map['id'] = id;
    _notes.add(map);
    return id;
  }

  @override
  Future<int> updateNote(Note note) async {
    if (shouldFail) throw Exception('Database error');
    
    final index = _notes.indexWhere((n) => n['id'] == note.id);
    if (index != -1) {
      _notes[index] = note.toMap();
      return 1;
    }
    return 0;
  }

  @override
  Future<int> deleteNote(int id) async {
    if (shouldFail) throw Exception('Database error');
    
    _notes.removeWhere((n) => n['id'] == id);
    return 1;
  }

  @override
  Future<Note?> getNoteById(int id) async {
    if (shouldFail) throw Exception('Database error');
    
    final map = _notes.where((n) => n['id'] == id).firstOrNull;
    if (map == null) return null;
    return Note.fromMap(map);
  }

  @override
  Future<List<Note>> getAllNotes() async {
    if (shouldFail) throw Exception('Database error');
    
    return _notes.map((map) => Note.fromMap(map)).toList();
  }

  @override
  Future<int> updateHighlightStatus(int id, bool isHighlighted) async {
    if (shouldFail) throw Exception('Database error');
    
    final index = _notes.indexWhere((n) => n['id'] == id);
    if (index != -1) {
      _notes[index]['is_highlighted'] = isHighlighted ? 1 : 0;
      _notes[index]['updated_at'] = DateTime.now().toIso8601String();
      return 1;
    }
    return 0;
  }

  void reset() {
    _notes.clear();
    _nextId = 1;
    shouldFail = false;
  }
}

void main() {
  group('NotesProvider', () {
    late MockDatabaseService mockDb;
    late NotesProvider provider;

    setUp(() {
      mockDb = MockDatabaseService();
      provider = NotesProvider(databaseService: mockDb);
    });

    tearDown(() {
      mockDb.reset();
    });

    group('createNote', () {
      test('creates note with isHighlighted defaulting to false', () async {
        final note = await provider.createNote(
          title: 'Test Title',
          content: 'Test Content',
        );

        expect(note, isNotNull);
        expect(note!.isHighlighted, false);
        expect(provider.notes.length, 1);
        expect(provider.notes.first.isHighlighted, false);
      });
    });

    group('toggleHighlight', () {
      test('toggles note from not highlighted to highlighted', () async {
        final note = await provider.createNote(
          title: 'Test',
          content: 'Content',
        );
        expect(note!.isHighlighted, false);

        final success = await provider.toggleHighlight(note.id!);

        expect(success, true);
        expect(provider.getNoteById(note.id!)?.isHighlighted, true);
      });

      test('toggles note from highlighted to not highlighted', () async {
        final note = await provider.createNote(
          title: 'Test',
          content: 'Content',
        );
        await provider.toggleHighlight(note!.id!);
        expect(provider.getNoteById(note.id!)?.isHighlighted, true);

        final success = await provider.toggleHighlight(note.id!);

        expect(success, true);
        expect(provider.getNoteById(note.id!)?.isHighlighted, false);
      });

      test('returns false for non-existent note', () async {
        final success = await provider.toggleHighlight(999);

        expect(success, false);
        expect(provider.error, 'Note not found');
      });

      test('rolls back on database failure', () async {
        final note = await provider.createNote(
          title: 'Test',
          content: 'Content',
        );
        expect(note!.isHighlighted, false);

        mockDb.shouldFail = true;
        final success = await provider.toggleHighlight(note.id!);

        expect(success, false);
        expect(provider.getNoteById(note.id!)?.isHighlighted, false);
        expect(provider.error, contains('Failed to update highlight'));
      });

      test('provides immediate optimistic update', () async {
        final note = await provider.createNote(
          title: 'Test',
          content: 'Content',
        );

        bool? intermediateState;
        provider.addListener(() {
          intermediateState ??= provider.getNoteById(note!.id!)?.isHighlighted;
        });

        await provider.toggleHighlight(note!.id!);

        // The first notification should have been the optimistic update
        expect(intermediateState, true);
      });
    });

    group('updateNote', () {
      test('preserves isHighlighted when updating other fields', () async {
        final note = await provider.createNote(
          title: 'Test',
          content: 'Content',
        );
        await provider.toggleHighlight(note!.id!);
        expect(provider.getNoteById(note.id!)?.isHighlighted, true);

        final updatedNote = provider.getNoteById(note.id!)!.copyWith(
          title: 'New Title',
        );
        await provider.updateNote(updatedNote);

        expect(provider.getNoteById(note.id!)?.title, 'New Title');
        expect(provider.getNoteById(note.id!)?.isHighlighted, true);
      });
    });

    group('loadNotes', () {
      test('loads notes with correct isHighlighted values', () async {
        await provider.createNote(title: 'Note 1', content: 'Content 1');
        final note2 = await provider.createNote(title: 'Note 2', content: 'Content 2');
        await provider.toggleHighlight(note2!.id!);

        // Create a new provider with same mock db
        final newProvider = NotesProvider(databaseService: mockDb);
        await newProvider.loadNotes();

        expect(newProvider.notes.length, 2);
        final loadedNote1 = newProvider.notes.firstWhere((n) => n.title == 'Note 1');
        final loadedNote2 = newProvider.notes.firstWhere((n) => n.title == 'Note 2');
        expect(loadedNote1.isHighlighted, false);
        expect(loadedNote2.isHighlighted, true);
      });
    });
  });
}
