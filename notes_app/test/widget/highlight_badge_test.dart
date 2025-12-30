import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:notes_app/widgets/highlight_badge.dart';
import 'package:notes_app/theme/app_theme.dart';

void main() {
  group('HighlightBadge Widget', () {
    Widget buildTestWidget({bool compact = false, Brightness brightness = Brightness.light}) {
      return MaterialApp(
        theme: brightness == Brightness.light
            ? AppTheme.lightTheme
            : AppTheme.darkTheme,
        home: Scaffold(
          body: Center(
            child: HighlightBadge(compact: compact),
          ),
        ),
      );
    }

    testWidgets('displays "Highlighted" text label', (tester) async {
      await tester.pumpWidget(buildTestWidget());

      expect(find.text('Highlighted'), findsOneWidget);
    });

    testWidgets('displays star icon', (tester) async {
      await tester.pumpWidget(buildTestWidget());

      expect(find.byIcon(Icons.star), findsOneWidget);
    });

    testWidgets('has correct semantic label for accessibility', (tester) async {
      await tester.pumpWidget(buildTestWidget());

      // Verify the Semantics widget exists with the correct label
      final semanticsFinder = find.byWidgetPredicate(
        (widget) => widget is Semantics && widget.properties.label == 'Highlighted note',
      );
      expect(semanticsFinder, findsOneWidget);
    });

    testWidgets('renders in compact mode', (tester) async {
      await tester.pumpWidget(buildTestWidget(compact: true));

      expect(find.byType(HighlightBadge), findsOneWidget);
      expect(find.text('Highlighted'), findsOneWidget);
    });

    testWidgets('renders in full mode', (tester) async {
      await tester.pumpWidget(buildTestWidget(compact: false));

      expect(find.byType(HighlightBadge), findsOneWidget);
      expect(find.text('Highlighted'), findsOneWidget);
    });

    testWidgets('renders correctly in light theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(brightness: Brightness.light));

      expect(find.byType(HighlightBadge), findsOneWidget);
    });

    testWidgets('renders correctly in dark theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(brightness: Brightness.dark));

      expect(find.byType(HighlightBadge), findsOneWidget);
    });

    testWidgets('text label ensures color is not the only indicator', (tester) async {
      await tester.pumpWidget(buildTestWidget());

      // Verify both text and icon are present, satisfying accessibility requirement
      expect(find.text('Highlighted'), findsOneWidget);
      expect(find.byIcon(Icons.star), findsOneWidget);
    });
  });

  group('HighlightDot Widget', () {
    Widget buildTestWidget({Brightness brightness = Brightness.light}) {
      return MaterialApp(
        theme: brightness == Brightness.light
            ? AppTheme.lightTheme
            : AppTheme.darkTheme,
        home: const Scaffold(
          body: Center(
            child: HighlightDot(),
          ),
        ),
      );
    }

    testWidgets('renders as a small circular widget', (tester) async {
      await tester.pumpWidget(buildTestWidget());

      expect(find.byType(HighlightDot), findsOneWidget);
    });

    testWidgets('renders in light theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(brightness: Brightness.light));

      expect(find.byType(HighlightDot), findsOneWidget);
    });

    testWidgets('renders in dark theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(brightness: Brightness.dark));

      expect(find.byType(HighlightDot), findsOneWidget);
    });
  });
}
