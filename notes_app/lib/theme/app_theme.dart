import 'package:flutter/material.dart';

/// App theme configuration with highlight color tokens.
///
/// Provides consistent theming across the app with special consideration
/// for the highlight feature, ensuring accessibility and visual appeal.
class AppTheme {
  // Prevent instantiation
  AppTheme._();

  // Highlight color tokens
  /// Primary highlight color (yellow) for light theme.
  static const Color highlightYellow = Color(0xFFFFF59D);

  /// Darker highlight color for text on highlight background.
  static const Color highlightYellowDark = Color(0xFFFFEB3B);

  /// Highlight color for dark theme (slightly muted).
  static const Color highlightYellowOnDark = Color(0xFFFFD54F);

  /// Background color for highlighted notes in light theme.
  static const Color highlightBackgroundLight = Color(0xFFFFFDE7);

  /// Background color for highlighted notes in dark theme.
  static const Color highlightBackgroundDark = Color(0xFF3E3D32);

  /// Border color for highlighted notes.
  static const Color highlightBorderLight = Color(0xFFFFEB3B);
  static const Color highlightBorderDark = Color(0xFFFFD54F);

  /// Light theme configuration.
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.blue,
      brightness: Brightness.light,
    ).copyWith(
      surface: Colors.white,
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      elevation: 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
      elevation: 2,
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    ),
  );

  /// Dark theme configuration.
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.blue,
      brightness: Brightness.dark,
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      elevation: 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
      elevation: 2,
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    ),
  );

  /// Gets the appropriate highlight background color for the current theme.
  static Color getHighlightBackground(BuildContext context) {
    return Theme.of(context).brightness == Brightness.dark
        ? highlightBackgroundDark
        : highlightBackgroundLight;
  }

  /// Gets the appropriate highlight border color for the current theme.
  static Color getHighlightBorder(BuildContext context) {
    return Theme.of(context).brightness == Brightness.dark
        ? highlightBorderDark
        : highlightBorderLight;
  }

  /// Gets the appropriate highlight accent color for the current theme.
  static Color getHighlightAccent(BuildContext context) {
    return Theme.of(context).brightness == Brightness.dark
        ? highlightYellowOnDark
        : highlightYellowDark;
  }
}
