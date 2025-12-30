import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:notes_app/widgets/highlight_toggle_button.dart';
import 'package:notes_app/theme/app_theme.dart';

void main() {
  group('HighlightToggleButton Widget', () {
    Widget buildTestWidget({
      required bool isHighlighted,
      required VoidCallback onToggle,
      bool isLoading = false,
      Brightness brightness = Brightness.light,
    }) {
      return MaterialApp(
        theme: brightness == Brightness.light
            ? AppTheme.lightTheme
            : AppTheme.darkTheme,
        home: Scaffold(
          appBar: AppBar(
            actions: [
              HighlightToggleButton(
                isHighlighted: isHighlighted,
                onToggle: onToggle,
                isLoading: isLoading,
              ),
            ],
          ),
        ),
      );
    }

    testWidgets('displays filled star when highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: true,
        onToggle: () {},
      ));

      expect(find.byIcon(Icons.star), findsOneWidget);
      expect(find.byIcon(Icons.star_border), findsNothing);
    });

    testWidgets('displays outlined star when not highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () {},
      ));

      expect(find.byIcon(Icons.star_border), findsOneWidget);
      expect(find.byIcon(Icons.star), findsNothing);
    });

    testWidgets('calls onToggle when tapped', (tester) async {
      bool toggled = false;
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () => toggled = true,
      ));

      await tester.tap(find.byType(IconButton));
      await tester.pumpAndSettle();

      expect(toggled, true);
    });

    testWidgets('displays loading indicator when isLoading is true', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () {},
        isLoading: true,
      ));

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      expect(find.byIcon(Icons.star), findsNothing);
      expect(find.byIcon(Icons.star_border), findsNothing);
    });

    testWidgets('is disabled when loading', (tester) async {
      bool toggled = false;
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () => toggled = true,
        isLoading: true,
      ));

      await tester.tap(find.byType(IconButton));
      // Use pump instead of pumpAndSettle because CircularProgressIndicator animates indefinitely
      await tester.pump();

      expect(toggled, false);
    });

    testWidgets('has correct tooltip when not highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () {},
      ));

      expect(find.byTooltip('Mark as highlighted'), findsOneWidget);
    });

    testWidgets('has correct tooltip when highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: true,
        onToggle: () {},
      ));

      expect(find.byTooltip('Remove highlight'), findsOneWidget);
    });

    testWidgets('has semantic label for "Mark note as highlighted" when not highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: false,
        onToggle: () {},
      ));

      expect(
        find.bySemanticsLabel('Mark note as highlighted'),
        findsOneWidget,
      );
    });

    testWidgets('has semantic label for "Remove highlight from note" when highlighted', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: true,
        onToggle: () {},
      ));

      expect(
        find.bySemanticsLabel('Remove highlight from note'),
        findsOneWidget,
      );
    });

    testWidgets('renders in light theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: true,
        onToggle: () {},
        brightness: Brightness.light,
      ));

      expect(find.byType(HighlightToggleButton), findsOneWidget);
    });

    testWidgets('renders in dark theme', (tester) async {
      await tester.pumpWidget(buildTestWidget(
        isHighlighted: true,
        onToggle: () {},
        brightness: Brightness.dark,
      ));

      expect(find.byType(HighlightToggleButton), findsOneWidget);
    });
  });
}
