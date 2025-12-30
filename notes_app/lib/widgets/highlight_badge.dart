import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

/// A badge widget that displays the highlighted status of a note.
///
/// Used in both the notes list and note detail view to provide
/// a consistent visual indicator. Includes both color and text
/// for accessibility (not relying on color alone).
class HighlightBadge extends StatelessWidget {
  /// Whether to show a compact version (for list items).
  final bool compact;

  const HighlightBadge({
    super.key,
    this.compact = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final highlightColor = AppTheme.getHighlightAccent(context);
    
    return Semantics(
      label: 'Highlighted note',
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: compact ? 8 : 12,
          vertical: compact ? 4 : 6,
        ),
        decoration: BoxDecoration(
          color: AppTheme.getHighlightBackground(context),
          borderRadius: BorderRadius.circular(compact ? 4 : 8),
          border: Border.all(
            color: highlightColor,
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.star,
              size: compact ? 14 : 18,
              color: highlightColor,
              semanticLabel: 'Highlight star icon',
            ),
            SizedBox(width: compact ? 4 : 6),
            Text(
              'Highlighted',
              style: TextStyle(
                fontSize: compact ? 12 : 14,
                fontWeight: FontWeight.w500,
                color: theme.brightness == Brightness.dark
                    ? Colors.white
                    : Colors.black87,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// A small dot indicator for highlighted notes in compact list views.
///
/// Provides a subtle yellow accent alongside the full badge when space
/// is constrained. Always used with [HighlightBadge] for accessibility.
class HighlightDot extends StatelessWidget {
  const HighlightDot({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(
        color: AppTheme.getHighlightAccent(context),
        shape: BoxShape.circle,
      ),
    );
  }
}
