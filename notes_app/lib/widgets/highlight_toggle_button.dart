import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

/// A toggle button for marking/unmarking a note as highlighted.
///
/// Used in the note detail screen's app bar. Provides clear visual
/// feedback and accessibility labels for the current state.
class HighlightToggleButton extends StatelessWidget {
  /// Whether the note is currently highlighted.
  final bool isHighlighted;

  /// Callback when the toggle is pressed.
  final VoidCallback onToggle;

  /// Whether the button is currently processing a toggle action.
  final bool isLoading;

  const HighlightToggleButton({
    super.key,
    required this.isHighlighted,
    required this.onToggle,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final highlightColor = AppTheme.getHighlightAccent(context);
    
    return Semantics(
      button: true,
      label: isHighlighted
          ? 'Remove highlight from note'
          : 'Mark note as highlighted',
      child: Tooltip(
        message: isHighlighted
            ? 'Remove highlight'
            : 'Mark as highlighted',
        child: IconButton(
          onPressed: isLoading ? null : onToggle,
          icon: isLoading
              ? SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                )
              : Icon(
                  isHighlighted ? Icons.star : Icons.star_border,
                  color: isHighlighted ? highlightColor : null,
                  semanticLabel: isHighlighted
                      ? 'Highlighted'
                      : 'Not highlighted',
                ),
        ),
      ),
    );
  }
}
