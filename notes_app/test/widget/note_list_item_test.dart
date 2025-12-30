import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:notes_app/models/note.dart';
import 'package:notes_app/widgets/note_list_item.dart';
import 'package:notes_app/widgets/highlight_badge.dart';
import 'package:notes_app/theme/app_theme.dart';

void main() {
  group('NoteListItem Widget', () {
    late Note highlightedNote;
    late Note normalNote;

    setUp(() {
      final now = DateTime.now();
      highlightedNote = Note(
        id: 1,
        title: 'Highlighted Note',
        content: 'This is a highlighted note',
        isHighlighted: true,
        createdAt: now,
        updatedAt: now,
      );
      normalNote = Note(
        id: 2,
        title: 'Normal Note',
        content: 'This is a normal note',
        isHighlighted: false,
        createdAt: now,
        updatedAt: now,
      );
    });

    Widget buildTestWidget(Note note, {Brightness brightness = Brightness.light}) {
      return MaterialApp(
        theme: brightness == Brightness.light
            ? AppTheme.lightTheme
            : AppTheme.darkTheme,
        home: Scaffold(
          body: NoteListItem(
            note: note,
            onTap: () {},
          ),
        ),
      );
    }

    testWidgets('displays HighlightBadge for highlighted note', (tester) async {
      await tester.pumpWidget(buildTestWidget(highlightedNote));

      expect(find.byType(HighlightBadge), findsOneWidget);
      expect(find.text('Highlighted'), findsOneWidget);
    });

    testWidgets('does not display HighlightBadge for normal note', (tester) async {
      await tester.pumpWidget(buildTestWidget(normalNote));

      expect(find.byType(HighlightBadge), findsNothing);
      expect(find.text('Highlighted'), findsNothing);
    });

    testWidgets('displays note title', (tester) async {
      await tester.pumpWidget(buildTestWidget(normalNote));

      expect(find.text('Normal Note'), findsOneWidget);
    });

    testWidgets('displays note content preview', (tester) async {
      await tester.pumpWidget(buildTestWidget(normalNote));

      expect(find.text('This is a normal note'), findsOneWidget);
    });

    testWidgets('has semantic label with highlight status for highlighted note', (tester) async {
      await tester.pumpWidget(buildTestWidget(highlightedNote));

      final semantics = tester.getSemantics(find.byType(NoteListItem).first);
      expect(semantics.label, contains('highlighted'));
    });

    testWidgets('has semantic label without highlight status for normal note', (tester) async {
      await tester.pumpWidget(buildTestWidget(normalNote));

      final semantics = tester.getSemantics(find.byType(NoteListItem).first);
      expect(semantics.label, isNot(contains('highlighted')));
    });

    testWidgets('renders correctly in light theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(highlightedNote, brightness: Brightness.light));

      expect(find.byType(NoteListItem), findsOneWidget);
      expect(find.byType(HighlightBadge), findsOneWidget);
    });

    testWidgets('renders correctly in dark theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(highlightedNote, brightness: Brightness.dark));

      expect(find.byType(NoteListItem), findsOneWidget);
      expect(find.byType(HighlightBadge), findsOneWidget);
    });

    testWidgets('calls onTap when tapped', (tester) async {
      bool tapped = false;
      await tester.pumpWidget(
        MaterialApp(
          theme: AppTheme.lightTheme,
          home: Scaffold(
            body: NoteListItem(
              note: normalNote,
              onTap: () => tapped = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(NoteListItem));
      await tester.pumpAndSettle();

      expect(tapped, true);
    });
  });
}
