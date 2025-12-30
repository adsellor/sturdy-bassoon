import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:notes_app/main.dart';
import 'package:notes_app/widgets/highlight_badge.dart';
import 'package:notes_app/widgets/highlight_toggle_button.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Note Highlighting Integration Tests', () {
    testWidgets('complete highlight toggle flow', (tester) async {
      await tester.pumpWidget(const NotesApp());
      await tester.pumpAndSettle();

      // Create a new note
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();

      // Enter note title and content
      await tester.enterText(
        find.byType(TextField).first,
        'Integration Test Note',
      );
      await tester.enterText(
        find.byType(TextField).last,
        'This note will be highlighted',
      );

      // Save the note
      await tester.tap(find.byIcon(Icons.check));
      await tester.pumpAndSettle();

      // Verify highlight toggle button is visible (not highlighted initially)
      expect(find.byType(HighlightToggleButton), findsOneWidget);
      expect(find.byIcon(Icons.star_border), findsOneWidget);

      // Toggle highlight on
      await tester.tap(find.byType(HighlightToggleButton));
      await tester.pumpAndSettle();

      // Verify note is now highlighted (filled star and banner)
      expect(find.byIcon(Icons.star), findsOneWidget);
      expect(find.byType(HighlightBadge), findsOneWidget);

      // Go back to list
      await tester.tap(find.byType(BackButton));
      await tester.pumpAndSettle();

      // Verify highlight marker shows in list
      expect(find.byType(HighlightBadge), findsOneWidget);
      expect(find.text('Highlighted'), findsOneWidget);

      // Navigate back to note detail
      await tester.tap(find.text('Integration Test Note'));
      await tester.pumpAndSettle();

      // Toggle highlight off
      await tester.tap(find.byType(HighlightToggleButton));
      await tester.pumpAndSettle();

      // Verify highlight is removed
      expect(find.byIcon(Icons.star_border), findsOneWidget);

      // Go back to list and verify marker is gone
      await tester.tap(find.byType(BackButton));
      await tester.pumpAndSettle();

      expect(find.byType(HighlightBadge), findsNothing);
    });

    testWidgets('highlight persists after navigation', (tester) async {
      await tester.pumpWidget(const NotesApp());
      await tester.pumpAndSettle();

      // Create and save a note
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byType(TextField).first,
        'Persistence Test Note',
      );
      await tester.tap(find.byIcon(Icons.check));
      await tester.pumpAndSettle();

      // Toggle highlight on
      await tester.tap(find.byType(HighlightToggleButton));
      await tester.pumpAndSettle();

      // Navigate away and back
      await tester.tap(find.byType(BackButton));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Persistence Test Note'));
      await tester.pumpAndSettle();

      // Verify highlight is still on
      expect(find.byIcon(Icons.star), findsOneWidget);
      expect(find.byType(HighlightBadge), findsOneWidget);
    });

    testWidgets('accessibility - highlight badge has correct semantics', (tester) async {
      await tester.pumpWidget(const NotesApp());
      await tester.pumpAndSettle();

      // Create and highlight a note
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byType(TextField).first,
        'Accessibility Test Note',
      );
      await tester.tap(find.byIcon(Icons.check));
      await tester.pumpAndSettle();
      await tester.tap(find.byType(HighlightToggleButton));
      await tester.pumpAndSettle();

      // Verify semantic label for highlighted note
      expect(find.bySemanticsLabel('Highlighted note'), findsOneWidget);
    });
  });
}
