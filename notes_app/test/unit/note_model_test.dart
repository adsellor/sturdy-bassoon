import 'package:flutter_test/flutter_test.dart';
import 'package:notes_app/models/note.dart';

void main() {
  group('Note Model', () {
    group('constructor', () {
      test('creates note with default isHighlighted as false', () {
        final note = Note(
          title: 'Test Title',
          content: 'Test Content',
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        expect(note.isHighlighted, false);
      });

      test('creates note with explicit isHighlighted value', () {
        final note = Note(
          title: 'Test Title',
          content: 'Test Content',
          isHighlighted: true,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        expect(note.isHighlighted, true);
      });
    });

    group('copyWith', () {
      test('copies note with new isHighlighted value', () {
        final note = Note(
          id: 1,
          title: 'Test Title',
          content: 'Test Content',
          isHighlighted: false,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        final updatedNote = note.copyWith(isHighlighted: true);

        expect(updatedNote.isHighlighted, true);
        expect(updatedNote.id, note.id);
        expect(updatedNote.title, note.title);
        expect(updatedNote.content, note.content);
      });

      test('preserves isHighlighted when not specified', () {
        final note = Note(
          id: 1,
          title: 'Test Title',
          content: 'Test Content',
          isHighlighted: true,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        final updatedNote = note.copyWith(title: 'New Title');

        expect(updatedNote.isHighlighted, true);
        expect(updatedNote.title, 'New Title');
      });
    });

    group('toMap', () {
      test('converts isHighlighted true to 1', () {
        final note = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: true,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        final map = note.toMap();

        expect(map['is_highlighted'], 1);
      });

      test('converts isHighlighted false to 0', () {
        final note = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: false,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        final map = note.toMap();

        expect(map['is_highlighted'], 0);
      });
    });

    group('fromMap', () {
      test('parses is_highlighted 1 as true', () {
        final map = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'is_highlighted': 1,
          'created_at': DateTime.now().toIso8601String(),
          'updated_at': DateTime.now().toIso8601String(),
        };

        final note = Note.fromMap(map);

        expect(note.isHighlighted, true);
      });

      test('parses is_highlighted 0 as false', () {
        final map = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'is_highlighted': 0,
          'created_at': DateTime.now().toIso8601String(),
          'updated_at': DateTime.now().toIso8601String(),
        };

        final note = Note.fromMap(map);

        expect(note.isHighlighted, false);
      });

      test('handles missing is_highlighted by defaulting to false', () {
        final map = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'created_at': DateTime.now().toIso8601String(),
          'updated_at': DateTime.now().toIso8601String(),
        };

        final note = Note.fromMap(map);

        expect(note.isHighlighted, false);
      });

      test('handles null is_highlighted by defaulting to false', () {
        final map = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'is_highlighted': null,
          'created_at': DateTime.now().toIso8601String(),
          'updated_at': DateTime.now().toIso8601String(),
        };

        final note = Note.fromMap(map);

        expect(note.isHighlighted, false);
      });
    });

    group('toJson/fromJson', () {
      test('serializes isHighlighted correctly', () {
        final note = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: true,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        );

        final json = note.toJson();

        expect(json['isHighlighted'], true);
      });

      test('deserializes isHighlighted correctly', () {
        final json = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'isHighlighted': true,
          'createdAt': DateTime.now().toIso8601String(),
          'updatedAt': DateTime.now().toIso8601String(),
        };

        final note = Note.fromJson(json);

        expect(note.isHighlighted, true);
      });

      test('handles missing isHighlighted in JSON by defaulting to false', () {
        final json = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'createdAt': DateTime.now().toIso8601String(),
          'updatedAt': DateTime.now().toIso8601String(),
        };

        final note = Note.fromJson(json);

        expect(note.isHighlighted, false);
      });

      test('handles null isHighlighted in JSON by defaulting to false', () {
        final json = {
          'id': 1,
          'title': 'Test',
          'content': 'Content',
          'isHighlighted': null,
          'createdAt': DateTime.now().toIso8601String(),
          'updatedAt': DateTime.now().toIso8601String(),
        };

        final note = Note.fromJson(json);

        expect(note.isHighlighted, false);
      });

      test('round-trips through JSON correctly', () {
        final original = Note(
          id: 1,
          title: 'Test Title',
          content: 'Test Content',
          isHighlighted: true,
          createdAt: DateTime(2024, 1, 1, 12, 0, 0),
          updatedAt: DateTime(2024, 1, 2, 12, 0, 0),
        );

        final json = original.toJson();
        final restored = Note.fromJson(json);

        expect(restored.id, original.id);
        expect(restored.title, original.title);
        expect(restored.content, original.content);
        expect(restored.isHighlighted, original.isHighlighted);
      });
    });

    group('equality', () {
      test('notes with same values are equal', () {
        final time = DateTime.now();
        final note1 = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: true,
          createdAt: time,
          updatedAt: time,
        );
        final note2 = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: true,
          createdAt: time,
          updatedAt: time,
        );

        expect(note1, equals(note2));
      });

      test('notes with different isHighlighted are not equal', () {
        final time = DateTime.now();
        final note1 = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: true,
          createdAt: time,
          updatedAt: time,
        );
        final note2 = Note(
          id: 1,
          title: 'Test',
          content: 'Content',
          isHighlighted: false,
          createdAt: time,
          updatedAt: time,
        );

        expect(note1, isNot(equals(note2)));
      });
    });
  });
}
